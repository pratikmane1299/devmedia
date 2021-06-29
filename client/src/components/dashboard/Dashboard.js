import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserMinus } from '@fortawesome/free-solid-svg-icons';

import { getMyProfileAction, deleteAccountAction } from '../../actions/profile';
import  { setAlert } from '../../actions/alert';

import Spinner from '../Layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

function Dashboard({
  profile,
  auth,
  getMyProfileAction,
  setAlert,
  deleteAccountAction,
}) {
  useEffect(() => {
    getMyProfileAction().catch((error) => {
      switch (error.response.status) {
        case 404:
          setAlert(error.response.data.msg, "primary");
          break;
        case 500:
        default:
          setAlert(error.response.statusText, "danger");
          break;
      }
    });
  }, [getMyProfileAction, setAlert]);

  if (profile.loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Welcome {auth.user && auth.user.name}
      </p>
      <>
        {profile.me !== null ? (
          <>
            <DashboardActions />
            <Experience experience={profile.me.experience} />
            <Education education={profile.me.education} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={async (e) => {
                e.preventDefault();
                if (window.confirm('Do you really want to delete ? This cannot be undone !!!')) {
                  try {
                    const res = await deleteAccountAction();
                    setAlert(res.msg, 'success');
                  } catch(error) {
                    switch (error.response.status) {
                      case 404:
                        setAlert(error.response.data.msg, 'primary');
                        break;
                      case 500:
                      default:
                        setAlert(error.response.statusText, 'danger');
                        break;
                    }
                  }
                }
              }}>
                <FontAwesomeIcon icon={faUserMinus} />{' '}
                Delete My Account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You have not yet setup a profile, Please add some info.</p>
            <Link to="create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </>
        )}
      </>
    </>
  );
}

function mapStateToProps(store) {
  return {
    profile: store.profile,
    auth: store.auth,
  };
}

export default connect(mapStateToProps, {
  getMyProfileAction,
  setAlert,
  deleteAccountAction,
})(Dashboard);
