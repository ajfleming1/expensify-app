// Higher order component (HOC) - A component (HOC) that renders another component.
// Used for code reuse.
// Render highjacking
// Prop manipulation
// Abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = (props: { info: string }) => (
  <div>
    <h1>Info</h1>
    <p>This is the info: {props.info}</p>
  </div>
);

type InfoComponentType = typeof Info;

const withAdminWarning = (WrappedComponent: InfoComponentType) => {
  return (props: { isAdmin: boolean, info: string }) => (
    <div>
      {props.isAdmin && <p>This is is private info. Please don't share.</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = (WrappedComponent: InfoComponentType) => {
  return (props: { isAuthenticated: boolean, info: string }) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see the info</p>}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById("appRoot"));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById("appRoot"));