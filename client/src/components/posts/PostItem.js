import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faComments } from '@fortawesome/free-solid-svg-icons';

import formatDate from '../../utils/formatDate';
import { deletePostAction, likeUnLikeAction, addCommentAction } from '../../actions/posts';
import { setAlert } from '../../actions/alert';

import UserAvatar from '../ui/UserAvatar';

function PostItem({
  auth,
  post,
  deletePostAction,
  likeUnLikeAction,
  setAlert,
  addCommentAction,
}) {

  const [showCommentInput , toggleShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

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

  function handleLikeUnLike(postId) {
    likeUnLikeAction(postId);
  }

  function handleChangeInput(e) {
    setComment(e.target.value);
  }

  function handleStartCommenting(e) {
    e.preventDefault();
    toggleShowCommentInput((prev) => !prev);
  }

  function generatePostActions(post) {
    return (
      <>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => {
            e.preventDefault();
            handleLikeUnLike(post._id);
          }}
        >
          <FontAwesomeIcon
            className={post.likes.includes(auth.user.user._id) ? 'post-liked' : ''}
            icon={faHeart}
          />
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>
        <button type="button" className="btn btn-light" onClick={handleStartCommenting}>
          <FontAwesomeIcon
            icon={faComments}
          />{' '}
          {post.comments.length > 0 && <span>{post.comments.length}</span>}
        </button>
        {auth.isAuthenticated && auth.user._id === post.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              handleOnDelete(post._id);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </>
    );
  }

  function generateCommentInput(postId) {
    async function handleSubmit(e) {
      e.preventDefault();
      try {

        await addCommentAction(postId, { text: comment });
        setComment('');
        toggleShowCommentInput(false);
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

    if (showCommentInput) {
      return (
        <form className="post-comment-edit" onSubmit={handleSubmit}>
          <input
            className="post-comment-input-field"
            type="text"
            id="fname"
            name="fname"
            placeholder="write your comment"
            value={comment}
            onChange={handleChangeInput}
          />
        </form>
      );
    }
  }

  return (
    <div
      className="post bg-white p-1 my-1 border-light"
      style={{ borderRadius: "8px" }}
    >
      <div>
        <Link to={`/profiles/${post.user._id}`}>
          <UserAvatar
            size="lg"
            src={post.user.avatar}
            username={post.user.name}
          />
          <h4>{post.user.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">Posted on {formatDate(post.date)}</p>
        {generatePostActions(post)}
        {generateCommentInput(post._id)}
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return { auth: store.auth };
}

export default connect(mapStateToProps, {
  deletePostAction,
  likeUnLikeAction,
  setAlert,
  addCommentAction,
})(PostItem);
