import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

import BaseOverlay from './BaseOverlay';

function ProfileDropdownItem({
  icon,
  label,
  onClick
}) {
  return (
    <button className="overlay-item-btn" onClick={onClick}>
      {icon}
      <span className="overlay-item-label">{label}</span>
    </button>
  );
}

function ProfileDropdown({
  user,
  onCloseDropdown,
  onActionButtonClicked,
}) {
  return (
    <div style={{ width: "200px", display: "flex", whiteSpace: "nowrap" }}>
      <BaseOverlay
        actionButton="Logout"
        onActionButtonClicked={onActionButtonClicked}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to={`/profiles/${user.user._id}`}>
            <ProfileDropdownItem
              icon={<FontAwesomeIcon icon={faUser} />}
              label="Your Profile"
              onClick={onCloseDropdown}
            />
          </Link>
        </div>
      </BaseOverlay>
    </div>
  );
}

export default ProfileDropdown;
