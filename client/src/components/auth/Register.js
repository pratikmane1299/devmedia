import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { setAlert } from '../../actions/alert';
import {
  registerAction,
  registerBegin,
  registerSuccess,
  registerFailure,
  fetchCurrentUserAction
} from '../../actions/auth';
import { useScreenWidth } from '../../hooks/useScreenWidth';

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
  const screen = useScreenWidth();

  if (isAuthenticated) {
    return <Redirect to="/home" />
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
        await registerAction(formData);
      } catch(error) {
        console.log(error.response);
        registerFailure();
        if (error.response.status === 400) {
          error.response.data.errors.forEach((err) => {
            setAlert(err.msg, "danger");
          });
        }
      }
    }
  };

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
        <div
          style={{ margin: "auto", padding: "1rem 3rem", borderRadius: "1rem" }}
          className="bg-light"
        >
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
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
              {loading ? "Please Wait..." : "Register"}
            </button>
          </form>
          <p className="my-1" style={{textAlign: 'center'}}>
            Already have an account? <Link to="/login">Sign In</Link>
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
  registerAction,
  registerBegin,
  registerSuccess,
  registerFailure,
  fetchCurrentUserAction,
})(Register);
