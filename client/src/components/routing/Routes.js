import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfileFrom';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Developers from '../developers/Developers';
import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';

import { HomePage } from '../../Pages/Home';

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
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        {/* <PrivateRoute exact path="/developers" component={Developers} />
        <PrivateRoute path="/profiles/:id" component={Profile} /> */}
        {/* <PrivateRoute exact path="/posts" component={HomePage} /> */}
      </Switch>
    </section>
  );
}

export default Routes;
