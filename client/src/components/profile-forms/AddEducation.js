import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addEducationAction } from '../../actions/profile';
import { setAlert  }from '../../actions/alert';

const initialState = {
  school: '',
  degree: '',
  fieldofstudy: '',
  current: false,
  from: '',
  to: '',
  description: '',
};

function AddEducation({ history, loading, setAlert, addEducationAction }) {

  const [education, setEducation] = useState(initialState);

  const [disableToDate, toggleDisableToDate] = useState(false);
  
  const { school, degree, fieldofstudy, current, from, to, description } = education;

  function handleOnChange(e) {
    setEducation(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await addEducationAction(education);
      setAlert('Education added successfully', 'success');

      setEducation(initialState);
      
      history.push('/dashboard');
    } catch(error) {
      error.response.data.errors.forEach((err) => {
        setAlert(err.msg, 'danger');
      });
    }
  }

  return (
    <div>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => {
                setEducation((prev) => ({
                  ...prev,
                  current: !prev.current,
                }));

                toggleDisableToDate(!disableToDate);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            disabled={disableToDate ? "disabled" : ""}
            value={to}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-1">
          {loading ? "Please Wait..." : "Submit"}
        </button>
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    loading: store.profile.loading,
  }
}

export default connect(mapStateToProps, { setAlert, addEducationAction })(withRouter(AddEducation));
