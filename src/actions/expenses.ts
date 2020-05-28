import { v4 as uuidv4 } from 'uuid';
import { AddExpenseAction, ADD_EXPENSE, 
         RemoveExpenseAction, REMOVE_EXPENSE, 
         EditExpenseAction, EDIT_EXPENSE, UpdateExpenseType } from '../@types/expenseTypes';

// Expense Actions
// ADD_EXPENSE
export const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 }): AddExpenseAction => (
  {
    type: ADD_EXPENSE,
    expense: {
      id: uuidv4(),
      description,
      note,
      amount,
      createdAt
    }
  }
);

// REMOVE_EXPENSE
export const removeExpense = ({ id }: { id: string }): RemoveExpenseAction => (
  {
    type: REMOVE_EXPENSE,
    id
  }
);

// EDIT_EXPENSE
export const editExpense = ({ id, updates }: { id: string, updates: UpdateExpenseType }): EditExpenseAction => (
  {
    type: EDIT_EXPENSE,
    id,
    updates
  }
);