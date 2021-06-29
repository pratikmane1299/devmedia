import React from 'react';
import { connect } from 'react-redux';

import { deleteExperienceAction } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import formatDate from '../../utils/formatDate';

export const Experience = ({ experience, deleteExperienceAction, setAlert }) => {

  async function handleOnExperienceDelete(id) {
    try {
      await deleteExperienceAction(id);
      setAlert('Experience deleted', 'success');
    } catch (error) {
      switch (error.response.status) {
        case 500:
        default:
          setAlert(error.response.statusText, 'danger');
          break;
      }
    }
  }

  const experiences = experience.map((ex) => (
    <tr key={ex._id}>
      <td>{ex.company}</td>
      <td className="hide-sm">{ex.title}</td>
      <td>
        {formatDate(ex.from)} - {ex.to ? formatDate(ex.to) : 'Now'}
      </td>
      <td>
        <button className="btn btn-danger" onClick={(e) => {
          e.preventDefault();
          handleOnExperienceDelete(ex._id);
        }}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="my-2">
        Experience Details
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
}

export default connect(null, { deleteExperienceAction, setAlert })(Experience);
