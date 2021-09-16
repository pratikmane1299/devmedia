import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';

import Website from '../ui/Website';
import UserAvatar from '../ui/UserAvatar';
import UserHorizontalCard from '../suggested-users/UserHorizontalCard';

function DeveloperCard({
  profile: {
    user: { _id, name, avatar },
    status,
    skills,
    company,
    location,
    website,
    isFollowedByViewer,
  },
  onFollowUser
}) {
  return (
    <div className="developer-card-container">
      <div className="developer-card-user-details-container">
        <UserHorizontalCard user={{ _id, name, avatar }} />
        <p style={{ marginTop: "0.5rem" }}>
          {status} {company && <span> at {company}</span>}
        </p>
        {location && (
          <div style={{ marginTop: "0.5rem" }}>
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
            <span style={{ marginLeft: "0.5rem" }}>{location}</span>
          </div>
        )}

        {website && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
            className="text-primary"
          >
            <FontAwesomeIcon icon={faGlobe} className="mr" />
            <Website website={website} />
          </div>
        )}
      </div>
      <div className="developer-card-follow-btn-container">
        <button
          type="button"
          className={`btn ${
            isFollowedByViewer ? "btn-primary" : "btn-primary-outline"
          }`}
          onClick={(e) => {
            e.preventDefault();
            onFollowUser(_id);
          }}
        >
          {isFollowedByViewer ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default DeveloperCard;
