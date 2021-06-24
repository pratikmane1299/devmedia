import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../Layout/Alert';

function Routes() {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </section>
  );
}

export default Routes;
