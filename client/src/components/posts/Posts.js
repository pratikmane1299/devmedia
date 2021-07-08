import React, { useEffect } from 'react';
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
              <PostItem key={post._id} post={post} />
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
