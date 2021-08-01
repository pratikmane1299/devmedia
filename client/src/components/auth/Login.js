import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { setAlert } from '../../actions/alert';
import {
  loginAction,
  loginBegin,
  loginSuccess,
  loginFailure,
  fetchCurrentUserAction,
} from '../../actions/auth';

const initialState = {
  email: '',
  password: '',
};

function Login({
  history,
  auth: { loading, isAuthenticated },
  setAlert,
  loginAction,
  loginBegin,
  loginSuccess,
  loginFailure,
  fetchCurrentUserAction,
}) {
  const [loginForm, setloginForm] = useState(initialState);

  const { email, password } = loginForm;

  if (isAuthenticated) {
    return <Redirect to="/posts" />
  }

  const handleOnChange = (e) => {
    setloginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleOnLogin = async (e) => {
    e.preventDefault();
    try {
      loginBegin();
      const res = await loginAction(loginForm);

      loginSuccess(res.token);
      await fetchCurrentUserAction();

    } catch (error) {
      loginFailure();
      error.response.data.errors.forEach((err) => {
        setAlert(err.msg, "danger");
      });
    }
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleOnLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" value="Login">
          {loading ? 'Please Wait...' : 'Login'}
        </button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
  }
}

export default connect(mapStateToProps, {
  setAlert,
  loginBegin,
  loginSuccess,
  loginFailure,
  loginAction,
  fetchCurrentUserAction,
})(Login);
