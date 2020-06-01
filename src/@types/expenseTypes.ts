// ExepenseItemType
export type ExepenseItemType = {
  id: string;
  description: string;
  note: string;
  amount: number;
  createdAt: number;
};

// UpdateExpenseType
export type UpdateExpenseType = {
  description?: string;
  amount?: number;
  note?: string;
  createdAt?: number;
};

// Actions
// Action Types
export type ExpenseActionTypes = AddExpenseAction | RemoveExpenseAction | EditExpenseAction;

// ADD_EXPENSE
export const ADD_EXPENSE = "ADD_EXPENSE";
export type AddExpenseAction = {
  type: typeof ADD_EXPENSE;
  expense: ExepenseItemType;
};

// REMOVE_EXPENSE
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";
export type RemoveExpenseAction = {
  type: typeof REMOVE_EXPENSE;
  id: string;
};

// EDIT_EXPENSE
export const EDIT_EXPENSE = "EDIT_EXPENSE";
export type EditExpenseAction = {
  type: typeof EDIT_EXPENSE;
  id: string;
  updates: UpdateExpenseType;
};