import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import UserAvatar from './UserAvatar';

function PostComment({
  comment,
}) {
  return (
    <div key={comment._id} className="comment-container">
      <div className="post-comment-bullet"></div>
      <div className="comment">
        <Link to={`/profiles/${comment.user._id}`}>
          <UserAvatar
            size="md"
            src={comment.user.avatar}
            username={comment.user.name}
          />
        </Link>
        <div className="comment-info">
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span
              className="text-primary"
              style={{
                fontWeight: 700,
                overflow: "hidden",
                wordBreak: "break-all",
              }}
            >
              {comment.user.name}
            </span>
            {comment.user.username && (
              <span className="text-dark">@{comment.user.username}</span>
            )}
            <div className="comment-text">{comment.text}</div>
          </div>
          <button
            className="btn btn-danger"
            // onClick={() => {
            //   onPostDelete(post._id);
            // }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {/* <div className="comment-actions">
            <p>{comment.text}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PostComment;
