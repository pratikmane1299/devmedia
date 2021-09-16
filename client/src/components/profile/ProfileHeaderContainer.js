import React from 'react'

function ProfileHeaderContainer({
  bannerUrl,
  children,
}) {
  return (
    <div
      className="bg-light"
      style={{ position: "relative", borderRadius: "16px", width: '100%' }}
    >
      <img
        alt="banner"
        src={bannerUrl || "https://source.unsplash.com/random"}
        className="banner-image"
      />
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  );
}

export default ProfileHeaderContainer;
