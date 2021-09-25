import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { fetchUserFollowersAction, followUserInFollowersAction } from '../../../actions/profile';

import Spinner from '../../Layout/Spinner';
import DeveloperCard from '../../developers/DeveloperCard';

export const Followers = ({
  loading,
  followers,
  fetchUserFollowersAction,
  followUserInFollowersAction,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchUserFollowersAction(id);
  }, []);

  function handleOnFollowUser(id) {
    // console.log(id);
    followUserInFollowersAction(id);
  }

  if (loading) return <Spinner />;

  return (
    <div className="profiles">
      {followers.length > 0 ? (
        followers.map((profile) => (
          <DeveloperCard
            key={profile._id}
            profile={profile}
            onFollowUser={handleOnFollowUser}
          />
        ))
      ) : (
        <h4>No Followers Found...</h4>
      )}
    </div>
  );
};

function mapStateToProps(store) {
  return { loading: store.profile.loading, followers: store.profile.followers };
}

export default connect(mapStateToProps, {
  fetchUserFollowersAction,
  followUserInFollowersAction,
})(Followers);
