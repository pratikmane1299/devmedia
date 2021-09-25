import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import formatDate from '../../utils/formatDate';

function ExperienceCard({
  experience: {
    _id,
    company,
    title,
    location,
    current,
    to,
    from,
    description,
  },
  className,
  isCurrentUser,
  onExperienceDelete,
}) {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',borderRadius: '1rem'}}  className="bg-light p-1 my">
      <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
      </div>
      {isCurrentUser && (
        <button className="btn btn-danger" onClick={() => onExperienceDelete(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}

export default ExperienceCard;
