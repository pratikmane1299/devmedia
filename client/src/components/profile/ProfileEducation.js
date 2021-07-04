import React from 'react';

import formatDate from '../../utils/formatDate';

function ProfileEducation({
  education: {
    school,
    degree,
    fieldofstufy,
    current,
    to,
    from,
    description,
  },
}) {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstufy}
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

export default ProfileEducation;
