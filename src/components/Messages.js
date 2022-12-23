import React, { useState } from 'react';

const Messages = ({ url, postId, token }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: `${title}`,
          },
        }),
      });
      const newData = await response.json();
      setTitle('')
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Send a message</h4>
      <label>
        <input
          className="addInput"
          type="text"
          placeholder="Message"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </label>

      <button>Send</button>
    </form>
  );
};

export default Messages;
