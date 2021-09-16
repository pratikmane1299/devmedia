import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchDevelopersAction } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import UsersList from './UsersList';

function SuggestedUsers({ users, loading, currentUser, fetchDevelopersAction }) {
  useEffect(() => {
    fetchDevelopersAction();
  }, [fetchDevelopersAction]);

  if (loading) return <Spinner />;

  if (!loading && users.length === 0) {
    return <p>No users found.</p>
  }

  function getFiveUnfollowedUsers() {
    return users
      .filter(
        (user) =>
          !user.isFollowedByViewer && user.user._id !== currentUser.user._id
      )
      .slice(0, 5).map(user => user.user); 
  }

  return (
    <div style={{ marginTop: "1rem", width: "100%", borderRadius: '8px' }} className="border-light">
      <div
        style={{
          padding: "8px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid #ccc'
        }}
        className="bg-light"
      >
        <h4>Users you may know</h4>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px 16px",
        }}
      >
        <UsersList users={getFiveUnfollowedUsers()} />
      </div>
      <div
        style={{
          padding: "8px 16px",
          fontWeight: "bold",
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          borderTop: '1px solid #ccc'
        }}
        className="bg-light"
      >
        <Link to="/developers" className="text-dark">Find more developers...</Link>
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    users: store.profile.profiles,
    loading: store.profile.loading,
    currentUser: store.auth.user,
  };
}

export default connect(mapStateToProps, { fetchDevelopersAction })(SuggestedUsers);
