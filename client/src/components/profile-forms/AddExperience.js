import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addExperienceAction } from '../../actions/profile.js';
import { setAlert } from '../../actions/alert.js';

const initialState = {
  company: '',
  title: '',
  location: '',
  from: '',
  to: '',
  current: false,
  description: '',
};

function AddExperience({ history, loading, addExperienceAction, setAlert }) {

  const [experience, setExperience] = useState(initialState);

  const [disableToDate, toggleDisableToDate] = useState(false);

  const { company, title, location, from, to, current, description } = experience;

  function handleOnChange(e) {
    setExperience(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await addExperienceAction(experience);
      setAlert('Experience added successfully', 'success');

      setExperience(initialState);
      
      history.push('/dashboard');
    } catch(error) {
      error.response.data.errors.forEach((err) => {
        setAlert(err.msg, 'danger');
      });
    }
  }

  return (
    <div>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={handleOnChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} onChange={(e) => {
            setExperience(prev => ({
              ...prev,
              current: !prev.current,
            }));

            toggleDisableToDate(!disableToDate);
          }} /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={disableToDate ? 'disabled' : ''} value={to} onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-1">
          {loading ? 'Please Wait...' : 'Submit'}
        </button>
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </div>
  )
}

function mapStateToProps(store) {
  return {
    loading: store.profile.loading,
  };
}

export default connect(mapStateToProps, { addExperienceAction, setAlert })(withRouter(AddExperience));
