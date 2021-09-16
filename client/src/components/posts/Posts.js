import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { fetchAllPostsAction, likeUnLikeAction, addCommentAction} from '../../actions/posts';
import { setAlert } from '../../actions/alert';

import Spinner from '../Layout/Spinner';
// import PostItem from './PostItem';
import PostForm from './PostForm';
import UserProfileSummary from '../ui/UserProfileSummary';
import SuggestedUsers from '../suggested-users/SuggestedUsers';
import MainLayout from '../Layout/MainLayout';
import { MiddlePanel } from '../Layout/GridPanels';
import PostItem from '../ui/PostItem';
import PostComment from '../ui/PostComment';
import MyFollowing from '../Layout/MyFollowing';

export const Posts = ({
  posts,
  currentUser,
  loading,
  fetchAllPostsAction,
  likeUnLikeAction,
  addCommentAction,
}) => {
  useEffect(() => {
    fetchAllPostsAction();
  }, [fetchAllPostsAction]);

  function generateComments(comments) {
    return comments.map((comment) => (
      <PostComment key={comment._id} comment={comment} />
    ));
  }

  function handleOnPostLiked(postId) {
    likeUnLikeAction(postId);
  }

  async function handleOnComment({ postId, comment }) {
    console.log(postId, comment);
    try {

      await addCommentAction(postId, { text: comment });
      setAlert('Comment added successfully', 'success');

    } catch (error) {
      switch (error.response.status) {
        case 400:
          error.response.data.errors.forEach(err => {
            setAlert(err.msg, 'danger');  
          });
          break;
        default:
          setAlert(error.response.statusText, 'danger');
          break;
      }
    }
  }

  return (
    <MainLayout
      leftPanel={<MyFollowing />}
      rightPanel={
        <div style={{ padding: "1rem" }}>
          <UserProfileSummary currentUser={currentUser} />
          <SuggestedUsers />
        </div>
      }
    >
      <MiddlePanel
        stickyChildren={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
              <FontAwesomeIcon icon={faUser} /> Welcome to the community.
            </p>
            <PostForm />
          </div>
        }
      >
        {posts.loading ? (
          <Spinner />
        ) : (
          <div className="posts">
            {posts.posts.length > 0 ? (
              posts.posts.map((post) => (
                <div key={post._id} className="post-container">
                  {/* <PostItem post={post} /> */}
                  <PostItem
                    post={post}
                    isCurrentUser={true}
                    userId={currentUser.user._id}
                    allowCommenting={true}
                    onPostLiked={handleOnPostLiked}
                    onComment={handleOnComment}
                  />
                  <div className="post-comments">
                    {generateComments(post.comments)}
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        )}
      </MiddlePanel>
    </MainLayout>
  );
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
    currentUser: store.auth.user,
    loading: store.auth.loading,
  }
}

export default connect(mapStateToProps, {
  fetchAllPostsAction,
  likeUnLikeAction,
  addCommentAction,
})(Posts);
