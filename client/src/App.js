import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Landing from './components/Layout/Landing';
import PrivateRoute from './components/routing/PrivateRoute';
import { HomePage } from './Pages/Home';
import { Search as SearchPage } from './Pages/Search';
import { FollowersFollowingPage } from './Pages/MyFollowing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import Developers from './components/developers/Developers';
import { fetchCurrentUserAction } from './actions/auth';

import './App.css';
import Alert from './components/Layout/Alert';

function App({ isAuthenticated, fetchCurrentUserAction }) {
  useEffect(() => {
    if (isAuthenticated) fetchCurrentUserAction();
  }, [fetchCurrentUserAction, isAuthenticated]);

  return (
    <Router>
      <>
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/profiles/:id" component={Profile} />
          <PrivateRoute path="/profiles/:id/following" component={FollowersFollowingPage} />
          <PrivateRoute path="/profiles/:id/followers" component={FollowersFollowingPage} />
          <PrivateRoute exact path="/developers" component={Developers} />
          <PrivateRoute exact path="/search" component={SearchPage} />
        </Switch>
      </>
    </Router>
  );
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, { fetchCurrentUserAction })(App);
