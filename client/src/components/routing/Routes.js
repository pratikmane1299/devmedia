import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfileFrom';
import EditProfile from '../profile-forms/EditProfile';
import Alert from '../Layout/Alert';

function Routes() {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      </Switch>
    </section>
  );
}

export default Routes;
