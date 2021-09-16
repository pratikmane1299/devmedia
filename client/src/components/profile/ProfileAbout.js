import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import Website from '../ui/Website';

function ProfileAbout({
  bio,
  followers,
  following,
  skills,
  social,
  username,
  website,
  className
}) {
  return (
    <div className={`bg-light p-1 ${className}`} style={{borderRadius: '1rem'}}>
      <h2 className="text-primary" style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          paddingBottom: '1rem'
        }}>About {username}
      </h2>
      <div style={{display: 'flex',marginBottom: '1rem'}}>
        <div style={{ display: "flex", paddingRight: "10px" }}>
          <span
            className="text-primary"
            style={{ fontWeight: 700, color: "#333" }}
          >
            {followers}
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
            {following}
          </span>
          <span style={{ marginLeft: "6px" }}>following</span>
        </div>
      </div>
      {bio && (
        <div className="profile-bio">{bio}</div>
      )}
      {website && website !== '' && (
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}} className="text-primary">
          <FontAwesomeIcon icon={faGlobe} className="mr" />
          <Website website={website} />
        </div>
      )}
      {skills.length > 0 && (
        <div style={{marginBottom: '1rem'}}>
          <h4 className="text-primary">Skills</h4>
          <span className="skills">{skills.join(', ')}</span>
        </div>
      )}
      <div className="my-1">
        {social?.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="mr">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        )}

        {social?.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="mr">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        )}

        {social?.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="mr">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        )}

        {social?.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="mr">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        )}

        {social?.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="mr">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        )}
      </div>
    </div>
  );
}

export default ProfileAbout;
