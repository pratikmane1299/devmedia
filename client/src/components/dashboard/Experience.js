import React from 'react';

import formatDate from '../../utils/formatDate';

export const Experience = ({ experience }) => {

  console.log(experience);

  const experiences = experience.map((ex) => (
    <tr key={ex._id}>
      <td>{ex.company}</td>
      <td className="hide-sm">{ex.title}</td>
      <td>
        {formatDate(ex.from)} - {ex.to ? formatDate(ex.to) : 'Now'}
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

export default Experience;
