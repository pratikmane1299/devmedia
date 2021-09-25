import React from 'react';

import ExperienceList from '../ui/ExperienceList';

function ProfileExperience({
  experiences,
  className,
  isCurrentUser,
  onExperienceDelete,
  onActionClicked
}) {
  return (
    <div className={`${className}`}>
      {experiences.length > 0 ? (
        <ExperienceList
          experiences={experiences}
          isCurrentUser={isCurrentUser}
          onExperienceDelete={onExperienceDelete}
          onActionClicked={onActionClicked}
        />
      ) : <p>No experience details found...</p>}
    </div>
  );
}

export default ProfileExperience;
