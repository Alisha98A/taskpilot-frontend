import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default PrivateRoute;