import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { startSetExpenses } from "./actions/expenses";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "react-dates/lib/css/_datepicker.css";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./firebase/firebase";

const store = configureStore();
const tsx =
  <Provider store={store}>
    <AppRouter />
  </Provider>


ReactDOM.render(<p>Loading...</p>, document.getElementById("appRoot"));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(tsx, document.getElementById("appRoot"));
});