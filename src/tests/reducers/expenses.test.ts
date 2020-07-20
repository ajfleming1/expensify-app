import expensesReducer from "../../reducers/expenses";
import { RemoveExpenseAction, REMOVE_EXPENSE, AddExpenseAction, ADD_EXPENSE, Expense, EditExpenseAction, EDIT_EXPENSE, SetExpenseAction, SET_EXPENSES } from "../../@types/expenseTypes";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
    const state = expensesReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
});

test("should remove expense by id", () => {
    const action: RemoveExpenseAction = {
        type: REMOVE_EXPENSE,
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
    const action: RemoveExpenseAction = {
        type: REMOVE_EXPENSE,
        id: "-1"
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});


test("should add an expense", () => {
    const newExpense: Expense = {
        amount: 10,
        createdAt: 10,
        description: "Lost my dime",
        id: "10",
        note: "RIP DIME"
    };

    const action: AddExpenseAction = {
        type: ADD_EXPENSE,
        expense: newExpense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toContain(newExpense);
});

test("should edit an expense", () => {
    var updates: Expense = {
        amount: expenses[0].amount + 1,
        createdAt: expenses[0].createdAt + 1,
        description: "New Description",
        note: "New Note"
    };

    const action: EditExpenseAction = {
        type: EDIT_EXPENSE,
        id: "1",
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[0]).toEqual({ ...updates, id: "1" });
})

test("shoud not edit an expense when id is not found", () => {
    var updates: Expense = {
        amount: expenses[0].amount + 1,
        createdAt: expenses[0].createdAt + 1,
        description: "New Description",
        note: "New Note"
    };

    const action: EditExpenseAction = {
        type: EDIT_EXPENSE,
        id: "-1",
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should set expenses", () => {  
    const action: SetExpenseAction = {
        type: SET_EXPENSES,
        expenses: [expenses[1]]
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});