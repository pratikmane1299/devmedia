import React from 'react';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EducationCard from './EducationCard';

function EducationList({
  educations,
  isCurrentUser,
  onEducationDelete,
  onActionClicked
}) {
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
      {isCurrentUser && (
        // <Link to="/add-education" style={{marginLeft: 'auto'}} className="btn btn-success">
        //   <FontAwesomeIcon icon={faPlus} />
        // </Link>
        <button style={{marginLeft: 'auto'}} className="btn btn-success" onClick={() => onActionClicked('add-education')}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {educations.map((education) => (
        <EducationCard key={education._id} education={education} isCurrentUser={isCurrentUser} onEducationDelete={onEducationDelete} />
      ))}
    </div>
  );
}

export default EducationList
