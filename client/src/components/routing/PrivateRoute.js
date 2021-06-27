import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Spinner from '../Layout/Spinner';

function PrivateRoute({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) {
  if (loading) {
    return <Route {...rest} render={() => <Spinner />} />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function mapStateToProps(store) {
  return { auth: store.auth };
}

export default connect(mapStateToProps)(PrivateRoute);
