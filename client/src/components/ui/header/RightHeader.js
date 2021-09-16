import React from 'react';
import { Link } from 'react-router-dom';

import { logoutAction } from '../../../actions/auth';

import PopOverController from '../../ui/PopOverController';
import UserAvatar from '../../ui/UserAvatar';
import ProfileDropdown from '../../ui/ProfileDropdown';

function RightHeader({
  loading,
  isAuthenticated,
  user,
  logoutAction,
}) {

  const authLinks = (
    <>
      <Link to="/developers">Developers</Link>
      <Link to="/posts">Posts</Link>
      <PopOverController
        zIndex={20}
        className="popover-position"
        innerClassName="popver-content"
        overlay={
          (close) => (
            <ProfileDropdown
              user={user}
              onCloseDropdown={close}
              onActionButtonClicked={() => logoutAction()}
            />
          )
        }
      >
        {loading ? (
          <span>...</span>
        ) : (
          user && (
            <UserAvatar
              size="sm"
              username={user.user.username}
              src={user.user.avatar}
            />
          )
        )}
      </PopOverController>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );


  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
      {!loading && isAuthenticated ? authLinks : guestLinks}
    </div>
  );
}

export default RightHeader;
