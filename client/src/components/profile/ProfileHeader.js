import React from 'react';
import { Link } from 'react-router-dom';

import ProfileHeaderContainer from './ProfileHeaderContainer';
import UserAvatar from '../ui/UserAvatar';

function ProfileHeader({
  bannerUrl,
  avatarUrl,
  displayName,
  username,
  isCurrentUser,
  isFollowedByViewer
}) {
  return (
    <ProfileHeaderContainer
      bannerUrl={bannerUrl}
    >
      <div className="profile-header">
        <UserAvatar src={avatarUrl} username={username} className="user-avatar" />
        {isCurrentUser ?  (
          <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
        ): (
          <button className={`btn ${
            isFollowedByViewer ? "btn-primary" : "btn-primary-outline"
          }`}>
            {isFollowedByViewer ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem'}}>
        <span
          className="text-primary"
          style={{
            fontWeight: 700,
            overflow: "hidden",
            wordBreak: "break-all",
          }}
        >
          {displayName}
        </span>
        <span className="text-dark">@{username}</span>
      </div>
    </ProfileHeaderContainer>
  );
}

export default ProfileHeader;
