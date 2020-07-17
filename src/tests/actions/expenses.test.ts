import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import { addExpense, removeExpense, editExpense, startAddExpense } from "../../actions/expenses";
import { REMOVE_EXPENSE, EDIT_EXPENSE, ADD_EXPENSE, Expense } from "../../@types/expenseTypes";
import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

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
    const store = createMockStore({});
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

            return database.ref(`expenses/${actions[0].expense.id}`).once("value");
        }).then((snapshot: { val: () => any; }) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test("should add expense with defaults database and store", (done) => {
    const store = createMockStore({});
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

            return database.ref(`expenses/${actions[0].expense.id}`).once("value");
        }).then((snapshot: { val: () => any; }) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});