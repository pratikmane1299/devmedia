import React from 'react';

import ProfileHeaderContainer from './ProfileHeaderContainer';
import UserAvatar from '../ui/UserAvatar';

function ProfileHeader({
  bannerUrl,
  avatarUrl,
  displayName,
  username,
  isCurrentUser,
  isFollowedByViewer,
  onEditProfileClicked,
  onFollowClicked,
}) {
  return (
    <ProfileHeaderContainer
      bannerUrl={bannerUrl}
    >
      <div className="profile-header">
        <UserAvatar src={avatarUrl} username={username} className="user-avatar" />
        {isCurrentUser ?  (
          <button className="btn btn-primary" onClick={onEditProfileClicked}>Edit Profile</button>
          // <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
        ): (
          <button type="button" className={`btn ${
            isFollowedByViewer ? "btn-primary" : "btn-primary-outline"
          }`} onClick={(e) => {
            e.preventDefault();
            onFollowClicked();
          }}>
            {isFollowedByViewer ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem'}}>
        <span
          className="text-dark"
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
