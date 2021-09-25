import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { fetchUsersPostsAction, deletePostAction } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import PostItem from '../ui/PostItem';

function ProfilePosts({
  posts,
  currentUserId,
  isCurrentUser,
  className,
  activeTab,
  fetchUsersPostsAction,
  deletePostAction,
  setAlert,
}) {

  const { id: userId } = useParams();

  useEffect(() => {
    fetchUsersPostsAction(userId)
      .then(() => console.log('posts fetched'));
  }, [userId, activeTab, fetchUsersPostsAction])

  async function handleOnDelete(postId) {
    try {
      await deletePostAction(postId);
      setAlert('Post deleted successfully', 'success');
    } catch (error) {
      switch (error.response.status) {
        default:
          setAlert(error.response.statusText, 'danger');
          break;
      }
    }
  }

  return (
    <div className={className}>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div className="post-container" key={post._id}>
              <PostItem
                post={post}
                showDeleteBtn={true}
                isCurrentUser={isCurrentUser}
                userId={currentUserId}
                allowCommenting={false}
                onPostDelete={handleOnDelete}
              />
            </div>
          ))}
        </>
      ) : (
        <p>No posts found...</p>
      )}
    </div>
  );
}

function mapStateToProps(store) {
  return {
    posts: store.profile.posts,
    currentUserId: store.auth.user.user._id,
  };
}

export default connect(mapStateToProps, {
  fetchUsersPostsAction,
  deletePostAction,
  setAlert,
})(ProfilePosts);
