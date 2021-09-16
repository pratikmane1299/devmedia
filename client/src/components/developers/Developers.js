import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConnectdevelop} from '@fortawesome/free-brands-svg-icons';

import { fetchDevelopersAction, followUserAction } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import DeveloperCard from './DeveloperCard';
import UserProfileSummary from '../ui/UserProfileSummary';
import SuggestedUsers from '../suggested-users/SuggestedUsers';
import MainLayout from '../Layout/MainLayout';
import MyFollowing from '../Layout/MyFollowing';
import { MiddlePanel } from '../Layout/GridPanels';

const Developers = ({ loading, profiles, currentUser, isLoadingUser, fetchDevelopersAction, followUserAction, }) => {

  useEffect(() => {
    fetchDevelopersAction()
      .then(() => console.log('Profiles fetched'));
  }, [fetchDevelopersAction])

  function handleOnFollowUser(id) {
    followUserAction(id);
  }

  // if (loading) return <Spinner />

  return (
    // <div className="developers-grid">
    // <div style={{ overflowY: 'auto', padding: '1rem' }}>
    //   <h1 className="large text-primary">Developers</h1>
    //   <p className="lead">
    //     <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect with
    //     developers.
    //   </p>
    //   <div className="profiles">
    //     {profiles.length > 0 ? (
    //       profiles.map((profile) => (
    //         <DeveloperCard
    //           key={profile._id}
    //           profile={profile}
    //           onFollowUser={handleOnFollowUser}
    //         />
    //       ))
    //     ) : (
    //       <h4>No Profiles Found...</h4>
    //     )}
    //   </div>
    // </div>
    // <div style={{ padding: '1rem' }}>
    //     <UserProfileSummary currentUser={currentUser} />
    //   </div>
    // </div>
    <MainLayout
      leftPanel={<MyFollowing />}
      rightPanel={
        <div style={{ padding: "1rem" }}>
          <UserProfileSummary currentUser={currentUser} />
          <SuggestedUsers />
        </div>
      }
    >
      <MiddlePanel
        stickyChildren={
          <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect
              with developers.
            </p>
          </>
        }
      >
        {loading ? (
          <Spinner />
        ) : (
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <DeveloperCard
                  key={profile._id}
                  profile={profile}
                  onFollowUser={handleOnFollowUser}
                />
              ))
            ) : (
              <h4>No Profiles Found...</h4>
            )}
          </div>
        )}
      </MiddlePanel>
    </MainLayout>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.profile.loading,
    profiles: store.profile.profiles,
    currentUser: store.auth.user,
    isLoadingUser: store.auth.loading,
  };
}

export default connect(mapStateToProps, {
  fetchDevelopersAction,
  followUserAction,
})(Developers);
