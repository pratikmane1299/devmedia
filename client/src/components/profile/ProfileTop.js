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

function ProfileTop({
  profile: { user, status, company, location, website, social },
}) {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGlobe} size="2x" />
          </a>
        )}

        {social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        )}

        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        )}

        {social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        )}

        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        )}

        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        )}
      </div>
    </div>
  );
}

export default ProfileTop;
