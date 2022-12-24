import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const EditPost = ({ APIURL, token, activePost }) => {
  const [title, setTitle] = useState(activePost.title);
  const [description, setDescription] = useState(activePost.description);
  const [price, setPrice] = useState(activePost.price);
  const [location, setLocation] = useState(activePost.location);
  const [willDeliver, setWillDeliver] = useState(activePost.willDeliver);
  const history = useHistory();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleWillDeliver = (e) => {
    setWillDeliver(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${APIURL}/posts/${activePost._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          location: location,
          willDeliver: willDeliver,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        history.push('/posts');
      })
      .catch(console.error);
  };

  return (
    <div className="add-posts-container">
      <h1>NEW POST</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={handlePrice}
          />
        </div>
        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleLocation}
          />
        </div>
        <div className="form-field">
          <label htmlFor="willDeliver">Will Deliver</label>
          <input
            type="checkbox"
            name="willDeliver"
            defaultChecked={willDeliver}
            value={willDeliver}
            onChange={handleWillDeliver}
          />
        </div>
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
};

export default EditPost;
