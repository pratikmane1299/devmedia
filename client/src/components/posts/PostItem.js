import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

function PostItem({ post }) {
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
      </div>
    </div>
  );
}

export default PostItem;
