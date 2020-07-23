import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }: {startLogin: (dispatch: any) => any}) => (
  <div>
    <button onClick={startLogin}>Login</button>
  </div>
);

const mapDispatchToProps = (dispatch: any) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);