import { ExepenseItemType, ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE, ExpenseActionTypes } from "../@types/expenseTypes";

const expensesDefaultState = [] as ExepenseItemType[];

// Expenses Reducer
export default (state: ExepenseItemType[] = expensesDefaultState, action: ExpenseActionTypes): ExepenseItemType[] => {
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
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default: return state;
  }
};