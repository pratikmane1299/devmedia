import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import formatDate from '../../utils/formatDate';

function EducationCard({
  education: {
    _id,
    school,
    degree,
    fieldofstufy,
    current,
    to,
    from,
    description,
  },
  isCurrentUser,
  onEducationDelete
}) {
  return (
    <div className="bg-light p-1 my" style={{display:'flex',justifyContent:'space-between',alignItems: 'center',borderRadius: '1rem'}}>
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
      {isCurrentUser && (
        <button className="btn btn-danger" onClick={() => onEducationDelete(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}

export default EducationCard;
