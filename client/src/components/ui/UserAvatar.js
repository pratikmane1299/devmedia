import React, { useState } from 'react';

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xs: "20px",
  xxs: "30px",
};

function UserAvatar({
  src,
  username,
  size="default",
  className = '',
}) {
  const [isError, setError] = useState(false);

  return (
    <div
      className={`user-avatar-wrapper ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <img
        alt={username}
        src={
          isError
            ? `https://ui-avatars.com/api/&rounded=true&background=
            B23439&bold=true&color=FFFFFF&name=${username}`
            : src
        }
        className="user-img"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default UserAvatar;
