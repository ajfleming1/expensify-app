import { createStore, combineReducers, applyMiddleware  } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import expensesReducer from "../reducers/expenses";
import filtersReducers from "../reducers/filters";
import { composeWithDevTools } from 'redux-devtools-extension';

// Combine Reducers
export default () => {
  const store = createStore(
    combineReducers(
      {
        expenses: expensesReducer,
        filters: filtersReducers,
        auth: authReducer
      }),
      
      composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};