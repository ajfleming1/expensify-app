import {
  Expense,
  AddExpenseAction,
  EditExpenseAction,
  RemoveExpenseAction,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  REMOVE_EXPENSE,
  SET_EXPENSES
} from '../@types/expenseTypes';
import database from "../firebase/firebase";

// Component calls action generator
// Generator returns a function
// Component dispatches the returned function
// Function runs (the function has the ability to dispatch other actions and do whatever it wants)

// Expense Actions
// ADD_EXPENSE
export const addExpense = (expense: Expense): AddExpenseAction => (
  {
    type: ADD_EXPENSE,
    expense
  }
);

// START_ADD_EXPENSE
export const startAddExpense = (expenseData: Expense): any => {
  return (dispatch: any) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense: Expense = {
      description,
      note,
      amount,
      createdAt
    };

    return database.ref("expenses")
      .push(expense)
      .then((ref) =>
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }))
      )
  }
};

// REMOVE_EXPENSE
export const removeExpense = ({ id }: { id: string }): RemoveExpenseAction => (
  {
    type: REMOVE_EXPENSE,
    id
  }
);

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({ id }: { id: string }): any => {
  return (dispatch: any) => {
    return database.ref(`expenses/${id}`).remove()
      .then(dispatch(removeExpense({ id })));
  }
};

// EDIT_EXPENSE
export const editExpense = ({ id, updates }: { id: string, updates: Expense }): EditExpenseAction => (
  {
    type: EDIT_EXPENSE,
    id,
    updates
  }
);

// START_EDIT_EXPENSE
export const startEditExpense = ({ id, updates }: { id: string, updates: Expense }): any => {
  // 1. Fetch expense data
  // 2. Call update with update object
  // 3. Dispatch editExpense
  return (dispatch: any) => {
    return database
      .ref(`expenses/${id}`)
      .update({ ...updates })
      .then(() => dispatch(editExpense({ id, updates })));
  };
};

// SET_EXPENSES
export const setExpenses = (expenses: Expense[]) => ({
  type: SET_EXPENSES,
  expenses
});

// START_SET_EXPENSES -- async action
export const startSetExpenses = (): any => {
  // 1. Fetch all expense data
  // 2. Parse all data into array (firebase.ts)
  // 3. Dispatch setExpenses
  return (dispatch: any) => {
    return database.ref("expenses")
      .once("value").then((snapshot) => {
        const expenses: Expense[] = [];
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setExpenses(expenses));
      });
  }
};