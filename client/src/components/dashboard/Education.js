import React from 'react';
import { connect } from 'react-redux';

import { deleteEducationAction } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import formatDate from '../../utils/formatDate';

export const Education = ({ education, deleteEducationAction, setAlert }) => {

  async function handleOnEducationDelete(id) {
    try {
      await deleteEducationAction(id);
      setAlert('Education deleted', 'success');
    } catch (error) {
      switch (error.response.status) {
        case 500:
        default:
          setAlert(error.response.statusText, 'danger');
          break;
      }
    }
  }

  const educations = education.map((ed) => (
    <tr key={ed._id}>
      <td>{ed.school}</td>
      <td className="hide-sm">{ed.degree}</td>
      <td>
        {formatDate(ed.from)} - {ed.to ? formatDate(ed.to) : 'Now'}
      </td>
      <td>
        <button className="btn btn-danger" onClick={(e) => {
          e.preventDefault();
          handleOnEducationDelete(ed._id);
        }}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="my-2">
        Education Details
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
}

export default connect(null, { deleteEducationAction, setAlert })(Education);
