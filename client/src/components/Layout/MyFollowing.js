import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useScreenWidth } from '../../hooks/useScreenWidth';

import { fetchMyFollowingAction } from '../../actions/profile';
import UserHorizontalCard from '../suggested-users/UserHorizontalCard';
import UserAvatar from '../ui/UserAvatar';

function MyFollowing({ following, currentUser, fetchMyFollowingAction }) {

  const screenWidth = useScreenWidth();
  const history = useHistory();

  useEffect(() => {
    fetchMyFollowingAction()
      .then(() => console.log('fetched following'));
  }, [fetchMyFollowingAction]);

  return (
    <div
      style={{
        width: "100%",
        // marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {screenWidth === "3-cols" && (
        <h4>You have {following.length} following</h4>
      )}
      <div style={{ overflowY: "auto", paddingBottom: "1rem" }}>
        {following.map((following) => (
          <div key={following._id} style={{ margin: "0.5rem 0" }}>
            {screenWidth === "3-cols" ? (
              <UserHorizontalCard user={following.user} />
            ) : (
              <UserAvatar
                size="md"
                src={following.user.avatar}
                username={following.user.name}
              />
            )}
          </div>
        ))}
        {following.length > 0 && (
          <button
            className={`${
              screenWidth === "3-cols" ? "show-more-btn" : "round-btn"
            }`}
            onClick={() =>
              history.push(`/profiles/${currentUser._id}/following`)
            }
          >
            {screenWidth === "3-cols" ? (
              "Show More"
            ) : (
              // <FontAwesomeIcon
              //   icon={faArrowRight}
              //   style={{ marginLeft: "0.5rem" }}
              // />
              <FontAwesomeIcon icon={faPlus} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    following: store.profile.myFollowing,
    currentUser: store.auth.user.user,
  };
}

export default connect(mapStateToProps, { fetchMyFollowingAction })(MyFollowing);
