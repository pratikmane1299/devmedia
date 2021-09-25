import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from '../ui/UserAvatar';

function UserHorizontalCard({ user }) {
  return (
    <Link to={`/profiles/${user._id}`}>
      <div style={{ display: "flex", width: "100%" }}>
        <UserAvatar
          src={user.avatar}
          username={user.username}
          size="md"
        />
        <div
          style={{
            marginLeft: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
          className="text-dark"
        >
          <span
            style={{
              fontWeight: 700,
              overflow: "hidden",
              wordBreak: "break-all",
            }}
          >
            {user.name}
          </span>
          {user.username && <span className="text-dark">@{user.username}</span>}
        </div>
      </div>
    </Link>
  );
}

export default UserHorizontalCard;
