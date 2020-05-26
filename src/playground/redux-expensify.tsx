import { createStore, combineReducers } from "redux";
const expensesReducerDefaultState = [] as ExepensesStateType;
type ExepensesStateType = typeof demoState.expenses;
type FiltersStateType = typeof demoState.filters;
const demoState = {
  expenses: [{
    id: "abcd",
    description: "January Rent",
    note: "This was the final payment for that address",
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: "rent",
    sortBy: "amount" as "amount" | "date",
    startDate: undefined as Date,
    endDate: undefined as Date
  }
};

const expensesDefaultState: FiltersStateType =
{
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducer = (state: ExepensesStateType = expensesReducerDefaultState, action: any): ExepensesStateType => {
  switch (action.type) {
    default: return state;
  }
};

const filtersReducers = (state: FiltersStateType = expensesDefaultState, action: any): FiltersStateType => {
  switch (action.type) {
    default: return state;
  }
};

const store = createStore(
  combineReducers(
    {
      expenses: expensesReducer,
      filters: filtersReducers
    })
);

console.log(store.getState());