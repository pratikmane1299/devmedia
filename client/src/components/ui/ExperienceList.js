import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ExperienceCard from './ExperienceCard';

function ExperienceList({
  experiences,
  isCurrentUser,
  onExperienceDelete,
  onActionClicked,
}) {
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
      {isCurrentUser && (
        <button style={{marginLeft: 'auto'}} className="btn btn-success" onClick={() => onActionClicked('add-experience')}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {experiences.map((exp) => (
        <ExperienceCard key={exp._id} experience={exp} isCurrentUser={isCurrentUser} onExperienceDelete={onExperienceDelete} />
      ))}
    </div>
  );
}

export default ExperienceList;
