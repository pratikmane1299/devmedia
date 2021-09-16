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
      <ExperienceList
        experiences={experiences}
        isCurrentUser={isCurrentUser}
        onExperienceDelete={onExperienceDelete}
        onActionClicked={onActionClicked}
      />
    </div>
  );
}

export default ProfileExperience;
