import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import {
    addExpense,
    removeExpense,
    editExpense,
    startAddExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from "../../actions/expenses";
import {
    REMOVE_EXPENSE,
    EDIT_EXPENSE,
    ADD_EXPENSE,
    Expense,
    FirebaseExpenseType,
    SET_EXPENSES
} from "../../@types/expenseTypes";
import expenses from "../fixtures/expenses";

const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData: FirebaseExpenseType = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test("should set up remove expense action object", () => {
    const action = removeExpense({ id: "123abc" });
    expect(action).toEqual({
        type: REMOVE_EXPENSE,
        id: "123abc"
    });
});

test("should set up edit expense action object", () => {
    const action = editExpense({
        id: "abc123",
        updates: { note: "New Note Value" }
    });

    expect(action).toEqual({
        type: EDIT_EXPENSE,
        id: "abc123",
        updates: { note: "New Note Value" }
    });
});

test("should set up add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: ADD_EXPENSE,
        expense: expenses[2]
    });
});

test("should add expense to database and store", (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData: Expense = {
        description: "Mouse",
        amount: 3000,
        note: "This one is better",
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
        }).then((snapshot: { val: () => any; }) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test("should add expense with defaults database and store", (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData: Expense = {};
    const expenseDefaults = {
        amount: 0,
        description: "",
        createdAt: 0,
        note: "",
    };

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
        }).then((snapshot: { val: () => any; }) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});

test("should set up set expenese action object with data", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual(
        {
            type: SET_EXPENSES,
            expenses: expenses
        });
});

test("should fetch expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: SET_EXPENSES,
            expenses
        });

        done();
    });
});

test("should remove expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const expense = {
        id: expenses[0].id
    };

    store.dispatch(startRemoveExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: REMOVE_EXPENSE,
            id: expense.id
        });

        return database.ref(`users/${uid}/expenses/${expense.id}`).once("value");
    }).then((snapshot: { val: () => any; }) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test("should update expense in firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const expense = {
        id: expenses[1].id
    };

    const updates: Expense = {
        amount: 10000,
        createdAt: 10,
        description: "Updates",
        note: "Update note"
    };

    store.dispatch(startEditExpense({ id: expense.id, updates })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: EDIT_EXPENSE,
            id: expense.id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${expense.id}`).once("value");
    }).then((snapshot: { val: () => any; }) => {
        expect(snapshot.val()).toEqual(updates);
        done();
    });
});