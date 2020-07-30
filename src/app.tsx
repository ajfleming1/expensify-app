import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { login, logout } from "./actions/auth";
import { startSetExpenses } from "./actions/expenses";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "react-dates/lib/css/_datepicker.css";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase";

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(tsx, document.getElementById("appRoot"));
    hasRendered = true;
  }
};

const store = configureStore();
const tsx =
  <Provider store={store}>
    <AppRouter />
  </Provider>


ReactDOM.render(<p>Loading...</p>, document.getElementById("appRoot"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if(history.location.pathname == "/") {
        history.push("/dashboard");
      }
    });
  }
  else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});