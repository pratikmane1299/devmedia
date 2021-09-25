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
      {educations.length > 0 ? (
        <EducationList
          educations={educations}
          isCurrentUser={isCurrentUser}
          onEducationDelete={onEducationDelete}
          onActionClicked={onActionClicked}
        />
      ) : <p>No education details found...</p>}
    </div>
  );
}

export default ProfileEducation;
