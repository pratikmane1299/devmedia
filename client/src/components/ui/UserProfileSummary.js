import UserHorizontalCard from '../suggested-users/UserHorizontalCard';
import Website from './Website';

function UserProfileSummary({ currentUser }) {
  return (
    <div className="profile-summary-container bg-light border-light" style={{borderRadius: '8px'}}>
      <UserHorizontalCard user={currentUser.user} />
      <div className="user-details">
        <div style={{ display: "flex", paddingRight: "10px" }}>
          <span
            className="text-primary"
            style={{ fontWeight: 700, color: "#333" }}
          >
            {currentUser.meta.followers}
          </span>
          <span style={{ marginLeft: "6px" }}>followers</span>
        </div>
        <div
          style={{
            display: "flex",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <span
            className="text-primary"
            style={{ fontWeight: 700, color: "#333" }}
          >
            {currentUser.meta.following}
          </span>
          <span style={{ marginLeft: "6px" }}>following</span>
        </div>
      </div>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          wordBreak: "break-all",
          textAlign: "left",
        }}
      >
        {currentUser.bio}
      </div>
      {currentUser.website && <Website website={currentUser.website} />}
    </div>
  );
}

export default UserProfileSummary;
