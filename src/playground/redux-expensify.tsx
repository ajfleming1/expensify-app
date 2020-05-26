import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';
// Types
type ExpenseActionTypes = AddExpenseAction | RemoveExpenseAction;
type ExepenseItemType = {
  id: string,
  description: string,
  note: string,
  amount: number,
  createdAt: number
};
type FiltersStateType = {
  text: string,
  sortBy: "amount" | "date",
  startDate: Date,
  endDate: Date
};

// Action Types
const ADD_EXPENSE = "ADD_EXPENSE";
const REMOVE_EXPENSE = "REMOVE_EXPENSE";
type AddExpenseAction = {
  type: typeof ADD_EXPENSE,
  expense: ExepenseItemType
};

type RemoveExpenseAction = {
  type: typeof REMOVE_EXPENSE,
  id: string
};

// Default States
const expensesDefaultState = [] as ExepenseItemType[];
const filtersDefaultState: FiltersStateType =
{
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

// Actions
// ADD_EXPENSE
const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 }): AddExpenseAction => (
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
const removeExpense = ({ id }: { id: string }): RemoveExpenseAction => (
  {
    type: REMOVE_EXPENSE,
    id
  }
);

// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer
const expensesReducer = (state: ExepenseItemType[] = expensesDefaultState, action: ExpenseActionTypes): ExepenseItemType[] => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case REMOVE_EXPENSE:
      return state.filter(({ id }) => id !== action.id)
    default: return state;
  }
};

// Filters Reducer
const filtersReducers = (state: FiltersStateType = filtersDefaultState, action: any): FiltersStateType => {
  switch (action.type) {
    default: return state;
  }
};

// Combine Reducers
const store = createStore(
  combineReducers(
    {
      expenses: expensesReducer,
      filters: filtersReducers
    })
);

// Mutate store
store.subscribe(() => {
  console.log(store.getState())
});

const expenseOne = store.dispatch(addExpense({
  description: "Rent",
  amount: 100
}));

const expenseTwo = store.dispatch(addExpense({
  description: "Coffee",
  amount: 300
}));

console.log(expenseOne);
store.dispatch(removeExpense({
  id: expenseOne.expense.id
}));

// const demoState = {
//   expenses: [{
//     id: "abcd",
//     description: "January Rent",
//     note: "This was the final payment for that address",
//     amount: 54500,
//     createdAt: 0
//   }],
//   filters: {
//     text: "rent",
//     sortBy: "amount" as "amount" | "date",
//     startDate: undefined as Date,
//     endDate: undefined as Date
//   }
// };