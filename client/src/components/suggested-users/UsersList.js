import React from 'react';

import UserHorizontalCard from './UserHorizontalCard';

function UsersList({ users }) {
  return (
    <>
      {users.map(user => (
        <div key={user._id} style={{ margin: '0.5rem 0' }}>
          <UserHorizontalCard user={user} />
        </div>
      ))}
    </>
  );
}

export default UsersList;
