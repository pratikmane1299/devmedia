import React from 'react';
import { Link } from 'react-router-dom';

import { useScreenWidth } from '../../../hooks/useScreenWidth';

import PopOverController from '../../ui/PopOverController';
import UserAvatar from '../../ui/UserAvatar';
import ProfileDropdown from '../../ui/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';

function RightHeader({
  loading,
  isAuthenticated,
  user,
  logoutAction,
}) {

  const screen = useScreenWidth();

  const authLinks = (
    <>
      <Link to="/home">
        {screen === 'fullscreen' || screen === '1-cols' ? (
          <FontAwesomeIcon icon={faHome} style={{width: '30px',height: '30px'}} />
        ) : (
          'Home'
        )}
      </Link>
      <Link to="/developers">
        {screen === 'fullscreen' || screen === '1-cols' ? (
          <FontAwesomeIcon icon={faUsers} style={{width: '30px',height: '30px'}} />
        ) : (
          'Developers'
        )}
      </Link>
      <PopOverController
        zIndex={20}
        className="popover-position"
        innerClassName="popver-content"
        overlay={(close) => (
          <ProfileDropdown
            user={user}
            onCloseDropdown={close}
            onActionButtonClicked={() => logoutAction()}
          />
        )}
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: screen === '1-cols' ? 'flex-end' : 'space-between',
        width: screen !=='1-cols' ? '100%' : 'auto',
        marginLeft: screen ==='1-cols' ? '1rem' : '',
        gap: '30px',
      }}
    >
      {!loading && isAuthenticated ? authLinks : guestLinks}
    </div>
  );
}

export default RightHeader;
