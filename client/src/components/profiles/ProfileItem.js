import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ProfileItem({
  profile: {
    user: { _id, name, avatar },
    status,
    skills,
    company,
    location,
  },
}) {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt={name} className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profiles/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <FontAwesomeIcon icon={faCheck} />{' '}
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileItem;
