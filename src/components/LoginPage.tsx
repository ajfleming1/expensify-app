import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }: { startLogin: (dispatch: any) => any }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify App</h1>
      <p>Its time to get your expenses under control.</p>
      <button onClick={startLogin}>Login</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: any) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);