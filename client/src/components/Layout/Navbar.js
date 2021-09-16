import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons';

import { logoutAction } from '../../actions/auth';

import PopOverController from '../ui/PopOverController';
import UserAvatar from '../ui/UserAvatar';
import ProfileDropdown from '../ui/ProfileDropdown';

function Navbar({ auth: { loading, isAuthenticated, user }, logoutAction }) {
  const authLinks = (
    <ul>
      <li>
        <Link to="/developers">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        {/* <Link onClick={() => logoutAction()}>
          <FontAwesomeIcon icon={faSignOutAlt} />{" "}
          <span className="hide-sm">Logout</span>
        </Link> */}
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
            // <div style={{ width: "200px" }}>
            //   <div className="overlay-container">
            //     <div className="overlay-content">
            //       <div>
            //         <button className="overlay-item-btn">
            //           <FontAwesomeIcon
            //             icon={faUserAlt}
            //             style={{ color: "#000" }}
            //           />
            //           <span className="overlay-item-label">Your Profile</span>
            //         </button>
            //       </div>
            //     </div>
            //     <button
            //       className="overlay-action-btn"
            //       style={{
            //         paddingTop: 8,
            //         paddingBottom: 12,
            //       }}
            //     >
            //       Logout
            //     </button>
            //   </div>
            // </div>
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
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  if (loading) {

  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <FontAwesomeIcon icon={faCode} /> DevConnector
        </Link>
      </h1>
      {!loading && isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
  };
}

export default connect(mapStateToProps, { logoutAction })(Navbar);
