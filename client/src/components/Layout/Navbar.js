import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import { logoutAction } from '../../actions/auth';

function Navbar({ auth: { loading, isAuthenticated }, logoutAction }) {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="dashboard">
          <FontAwesomeIcon icon={faUser} />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={() => logoutAction()}>
          <FontAwesomeIcon icon={faSignOutAlt} />{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <FontAwesomeIcon icon={faCode} /> DevConnector
        </Link>
      </h1>
      {!loading && isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
  };
}

export default connect(mapStateToProps, { logoutAction })(Navbar);
