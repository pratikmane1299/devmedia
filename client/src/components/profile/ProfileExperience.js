import React from 'react';

import formatDate from '../../utils/formatDate';

function ProfileExperience({
  experience: {
    company,
    title,
    location,
    current,
    to,
    from,
    description,
  },
}) {
  return (
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
  );
}

export default ProfileExperience;
