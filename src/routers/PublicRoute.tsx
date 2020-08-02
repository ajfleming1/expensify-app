import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({
  isAuthenicated,
  component: Component,
  path,
  ...rest
}: { isAuthenicated: boolean, path: string, component: any, exact: boolean }) => (
    <Route {...rest} component={(props: JSX.IntrinsicAttributes) => (
      isAuthenicated ? (
        <Redirect to="/Dashboard" />
      ) : (
          <div>
            <Component {...props} />
          </div>
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

export default connect(mapStateToProps)(PublicRoute);