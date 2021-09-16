import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useScreenWidth } from '../../hooks/useScreenWidth';

import { fetchMyFollowingAction } from '../../actions/profile';
import UserHorizontalCard from '../suggested-users/UserHorizontalCard';
import UserAvatar from '../ui/UserAvatar';

function MyFollowing({ following, fetchMyFollowingAction }) {

  const screenWidth = useScreenWidth();

  useEffect(() => {
    fetchMyFollowingAction()
      .then(() => console.log('fetched following'));
  }, [fetchMyFollowingAction]);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: 'hidden',
      }}
    >
      {screenWidth === '3-cols' && <h4>My Following</h4>}
      <div style={{ overflowY: "auto", paddingBottom: "1rem" }}>
        {following.map((following) => (
          <div key={following._id} style={{ margin: "0.5rem 0" }}>
            {screenWidth === '3-cols' ? (
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
        <button className={`${screenWidth === '3-cols' ? 'show-more-btn' : 'round-btn'}`}>
          {screenWidth === '3-cols' ? (
            'Show More'
          // <FontAwesomeIcon
          //   icon={faArrowRight}
          //   style={{ marginLeft: "0.5rem" }}
          // />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    following: store.profile.myFollowing,
  };
}

export default connect(mapStateToProps, { fetchMyFollowingAction })(MyFollowing);
