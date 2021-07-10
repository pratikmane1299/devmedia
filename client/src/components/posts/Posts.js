import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { fetchAllPostsAction } from '../../actions/posts';
import Spinner from '../Layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

export const Posts = ({ posts, fetchAllPostsAction }) => {

  useEffect(() => {
    fetchAllPostsAction();
  }, [fetchAllPostsAction]);

  function generateComments(comments) {
    return comments.map((comment) => (
      <div className="comment-container">
        <div className="post-comment-bullet"></div>
        <div className="comment">
          <div className="comment-user-info">
            <Link to={`/profiles/${comment.user._id}`}>
              <img
                className="round-img"
                src={comment.user.avatar}
                alt={comment.user.name}
              />
              <h4>{comment.user.name}</h4>
            </Link>
          </div>
          <div className="comment-description">
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {posts.loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faUser} /> Welcome to the community.
          </p>
          <PostForm />
          <div className="posts">
            {posts.posts.map((post) => (
              <div className="post-container">
                <PostItem key={post._id} post={post} />
                <div className="post-comments">{generateComments(post.comments)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(store) {
  return {
    posts: store.posts,
  }
}

export default connect(mapStateToProps, { fetchAllPostsAction })(Posts);
