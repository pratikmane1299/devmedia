import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConnectdevelop} from '@fortawesome/free-brands-svg-icons';

import { fetchProfilesAction } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import ProfileItem from './ProfileItem';

export const Profiles = ({ loading, profiles, fetchProfilesAction }) => {

  useEffect(() => {
    fetchProfilesAction()
      .then(() => console.log('Profiles fetched'));
  }, [fetchProfilesAction])

  return (
    <div>
      {loading ? ( <Spinner />) : (
        <div>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faConnectdevelop} />{' '}
            Browse and connect with developers.
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : <h4>No Profiles Found...</h4>}
          </div>
        </div>
      )}
    </div>
  )
};

function mapStateToProps(store) {
  return {
    loading: store.profile.loading,
    profiles: store.profile.profiles,
  };
}

export default connect(mapStateToProps, { fetchProfilesAction })(Profiles)
