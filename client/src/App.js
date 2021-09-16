import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Routes from './components/routing/Routes';
import PrivateRoute from './components/routing/PrivateRoute';
import { HomePage } from './Pages/Home';
import Profile from './components/profile/Profile';
import Developers from './components/developers/Developers';
import { fetchCurrentUserAction } from './actions/auth';

import './App.css';

function App({ isAuthenticated, fetchCurrentUserAction }) {
  useEffect(() => {
    if (isAuthenticated) fetchCurrentUserAction();
  }, [fetchCurrentUserAction, isAuthenticated]);

  return (
    <Router>
      <>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/posts" component={HomePage} />
          <PrivateRoute path="/profiles/:id" component={Profile} />
          <PrivateRoute exact path="/developers" component={Developers} />
          <Route component={Routes} />
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
