import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import formatDate from '../../utils/formatDate';
import { deletePostAction } from '../../actions/posts';
import { setAlert } from '../../actions/alert';

function PostItem({ auth, post, deletePostAction, setAlert }) {

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
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${post.user._id}`}>
          <img
            className="round-img"
            src={post.user.avatar}
            alt={post.user.name}
          />
          <h4>{post.user.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">Posted on {formatDate(post.date)}</p>
        {auth.isAuthenticated && auth.user._id === post.user._id && (
          <button type="button" className="btn btn-danger" onClick={(e)  => {
            e.preventDefault();
            handleOnDelete(post._id);
          }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return { auth: store.auth };
}

export default connect(mapStateToProps, { deletePostAction, setAlert })(PostItem);
