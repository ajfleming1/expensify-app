import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

const PrivateRoute = ({
  isAuthenicated,
  component: Component,
  path,
  ...rest
}: { isAuthenicated: boolean, path: string, component: any }) => (
    <Route {...rest} component={(props: JSX.IntrinsicAttributes) => (
      isAuthenicated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) :
        (
          <Redirect to="/" />
        )
    )} />
  )

const mapStateToProps = (state: {
  auth: {
    uid: string
  }
}) => ({
  isAuthenicated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);