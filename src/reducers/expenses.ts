import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE, ExpenseActionTypes, Expense, SET_EXPENSES } from "../@types/expenseTypes";

const expensesDefaultState = [] as Expense[];

// Expenses Reducer
export default (state: Expense[] = expensesDefaultState, action: ExpenseActionTypes): Expense[] => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      return state.filter(({ id }) => id !== action.id)
    case EDIT_EXPENSE:
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          }
        } else {
          return expense;
        }
      });
    case SET_EXPENSES:
      return action.expenses;
    default: return state;
  }
};