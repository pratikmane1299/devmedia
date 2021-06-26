import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { setAlert } from '../../actions/alert';
import {
  registerAction,
  registerBegin,
  registerSuccess,
  registerFailure,
  fetchCurrentUserAction
} from '../../actions/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Register({
  history,
  auth: { loading, isAuthenticated },
  setAlert,
  registerAction,
  registerBegin,
  registerSuccess,
  registerFailure,
  fetchCurrentUserAction,
}) {
  const [formData, setformData] = useState(initialState);

  const { name, email, password, confirmPassword } = formData;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords don't match", 'danger');
    } else {
      try {
        registerBegin();
        const res = await registerAction(formData);
        registerSuccess(res.token);
        await fetchCurrentUserAction();
        history.push('/dashboard');
      } catch(error) {
        registerFailure();
        error.response.data.errors.forEach((err) => {
          setAlert(err.msg, 'danger' );
        });
      }
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Create Your Account
      </p>
      <form className="form" onSubmit={handleOnRegister}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "Please Wait..." : "Register"}
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
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
  registerAction,
  registerBegin,
  registerSuccess,
  registerFailure,
  fetchCurrentUserAction,
})(Register);
