import { createStore, combineReducers, applyMiddleware  } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducers from "../reducers/filters";
import { composeWithDevTools } from 'redux-devtools-extension';
// Combine Reducers
export default () => {
  const store = createStore(
    combineReducers(
      {
        expenses: expensesReducer,
        filters: filtersReducers
      }),
      
      composeWithDevTools()
  );

  return store;
};