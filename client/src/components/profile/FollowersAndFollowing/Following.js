import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

import { fetchUserFollowingAction, followUserInFollowingAction } from '../../../actions/profile';

import Spinner from '../../Layout/Spinner';
import DeveloperCard from '../../developers/DeveloperCard';

const Following = ({
  loading,
  following,
  fetchUserFollowingAction,
  followUserInFollowingAction,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchUserFollowingAction(id);
  }, []);

  function handleOnFollowUser(id) {
    followUserInFollowingAction(id);
    // console.log(id);
  }

  if (loading) return <Spinner />;

  return (
    <div className="profiles">
      {following.length > 0 ? (
        following.map((profile) => (
          <DeveloperCard
            key={profile._id}
            profile={profile}
            onFollowUser={handleOnFollowUser}
          />
        ))
      ) : (
        <h4>No Following Found...</h4>
      )}
    </div>
  );
};

function mapStateToProps(store) {
  return {
    following: store.profile.following,
    loading: store.profile.loading,
  };
}

export default connect(mapStateToProps, {
  fetchUserFollowingAction,
  followUserInFollowingAction,
})(Following);
