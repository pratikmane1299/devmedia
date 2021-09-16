import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart, faComments } from '@fortawesome/free-solid-svg-icons';

import formatDate from '../../utils/formatDate';
import UserHorizontalCard from '../suggested-users/UserHorizontalCard';

function PostItem({
  post,
  isCurrentUser,
  userId,
  showDeleteBtn = false,
  allowCommenting = false,
  onPostLiked,
  onComment,
  onPostDelete,
}) {
  const [comment, setComment] = useState('');
  const [showCommentInput , toggleShowCommentInput] = useState(false);

  function handleChangeInput(e) {
    setComment(e.target.value);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1rem",
      }}
      className="bg-light"
    >
      <div
        className="p-1"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: 0,
          borderBottom: "1px solid #ccc",
        }}
      >
        <UserHorizontalCard user={post.user} />
        {showDeleteBtn && isCurrentUser && (
          <button
            className="btn btn-danger"
            onClick={() => {
              onPostDelete(post._id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <div style={{ padding: "0 1rem" }}>
        <p className="my-1">{post.text}</p>
        <p className="post-date">Posted on {formatDate(post.date)}</p>
      </div>
      <div className="my-1">
        <button
          type="button"
          className="btn btn-light"
          disabled={!onPostLiked}
          onClick={(e) => {
            e.preventDefault();
            onPostLiked(post._id);
          }}
        >
          <FontAwesomeIcon
            className={post.likes.includes(userId) ? "post-liked" : ""}
            icon={faHeart}
          />
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>
        <button
          type="button"
          className="btn btn-light"
          disabled={!allowCommenting}
          onClick={(e) => {
            e.preventDefault();
            toggleShowCommentInput(!showCommentInput);
          }}
        >
          <FontAwesomeIcon icon={faComments} />{" "}
          {post.comments.length > 0 && <span>{post.comments.length}</span>}
        </button>
        {allowCommenting && showCommentInput && (
          <form
            className="post-comment-edit"
            onSubmit={(e) => {
              e.preventDefault();
              onComment({ postId: post._id, comment });
              setComment("");
            }}
          >
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
        )}
      </div>
    </div>
  );
}

export default PostItem;
