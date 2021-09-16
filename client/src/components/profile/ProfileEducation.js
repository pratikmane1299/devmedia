import React from 'react';

import EducationList from '../ui/EducationList';

function ProfileEducation({
  educations,
  className,
  isCurrentUser,
  onEducationDelete,
  onActionClicked
}) {
  return (
    <div className={`${className}`}>
      <EducationList
        educations={educations}
        isCurrentUser={isCurrentUser}
        onEducationDelete={onEducationDelete}
        onActionClicked={onActionClicked}
      />
    </div>
  );
}

export default ProfileEducation;
