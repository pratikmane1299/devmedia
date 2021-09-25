import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { setAlert } from '../../actions/alert';
import {
  loginAction,
  loginBegin,
  loginSuccess,
  loginFailure,
  fetchCurrentUserAction,
} from '../../actions/auth';

import { useScreenWidth } from '../../hooks/useScreenWidth';

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

  const screen = useScreenWidth();

  if (isAuthenticated) {
    return <Redirect to="/home" />
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
      await loginAction(loginForm);
    } catch (error) {
      loginFailure();
      console.log(error.response);
      if (error.response.status === 400) {
        error.response.data.errors.forEach((err) => {
          setAlert(err.msg, "danger");
        });
      }
    }
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateRows: "1fr auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: screen === "fullscreen" ? "1rem" : "30px",
            // borderBottom: "1px solid #ccc",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="text-primary"
          >
            <FontAwesomeIcon
              icon={faCode}
              style={{ height: "30px", width: "30px" }}
            />
            <span
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              DevMedia
            </span>
          </div>
          <div>
            <a
              href="https://github.com/pratikmane1299/devmedia"
              target="_blank"
              rel="noreferrer"
              className="text-dark"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              <FontAwesomeIcon icon={faGithub} />{" "}
              {screen !== "fullscreen" && screen !== "1-cols" && (
                <span>Github</span>
              )}
            </a>
          </div>
        </div>
        <div style={{ margin: "auto", padding: '1rem 3rem', borderRadius: '1rem' }} className="bg-light">
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
            <button type="submit" className="btn btn-primary" style={{width: '100%'}} value="Login">
              {loading ? "Please Wait..." : "Login"}
            </button>
          </form>
          <p className="my-1" style={{textAlign: 'center'}}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
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
