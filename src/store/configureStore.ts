import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducers from "../reducers/filters";

// Combine Reducers
export default () => {
  const store = createStore(
    combineReducers(
      {
        expenses: expensesReducer,
        filters: filtersReducers
      })
  );

  return store;
};