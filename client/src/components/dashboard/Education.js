import React from 'react';

import formatDate from '../../utils/formatDate';

export const Education = ({ education }) => {

  const educations = education.map((ed) => (
    <tr key={ed._id}>
      <td>{ed.school}</td>
      <td className="hide-sm">{ed.degree}</td>
      <td>
        {formatDate(ed.from)} - {ed.to ? formatDate(ed.to) : 'Now'}
      </td>
      <td>
        <button className="btn btn-danger">
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

export default Education;
