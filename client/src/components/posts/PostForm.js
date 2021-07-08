import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addNewPostAction } from '../../actions/posts';
import { setAlert } from '../../actions/alert';

function PostForm({ addNewPostAction, setAlert }) {

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false)

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {

      setLoading(true);
      await addNewPostAction({ text: text.trim() });

      setLoading(false);
      setText('');
      setAlert('Post created successfully', 'success');
    } catch(error) {
      setText('');
      switch (error.response.status) {
        case 400:
          error.response.data.errors.forEach((err) => {
            setAlert(err.msg, 'danger' );
          });
          break;
      
        default:
          setAlert(error.response.statusText, 'danger');
          break;
      }
    }
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={handleOnSubmit}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-dark my-1">
          {loading ? '...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default connect(null, { addNewPostAction, setAlert })(PostForm);
