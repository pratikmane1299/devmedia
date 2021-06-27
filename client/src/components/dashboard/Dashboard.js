import React, {useEffect } from 'react';
import { connect } from 'react-redux';

import { getMyProfileAction } from '../../actions/profile';
import  { setAlert } from '../../actions/alert';

function Dashboard({ me, getMyProfileAction, setAlert }) {

  useEffect(() => {
    getMyProfileAction()
      .catch(error => {
        switch (error.response.status) {
          case 404:
            setAlert(error.response.data.msg, 'primary');
            break;
          case 500:
          default:
            setAlert(error.response.statusText, 'danger');
            break;
        }
      });
  }, [getMyProfileAction, setAlert]);

  return <div>Dashboard Page</div>;
}

function mapStateToProps(store) {
  return {
    me: store.profile.me,
  };
}

export default connect(mapStateToProps, { getMyProfileAction, setAlert })(Dashboard);
