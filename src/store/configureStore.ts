import { createStore, combineReducers, applyMiddleware  } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducers from "../reducers/filters";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

// Combine Reducers
export default () => {
  const store = createStore(
    combineReducers(
      {
        expenses: expensesReducer,
        filters: filtersReducers
      }),
      
      composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};