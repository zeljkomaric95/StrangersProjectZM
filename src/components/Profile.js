import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ APIURL, token, setOnline }) => {
  const [userData, setUserData] = useState();
  let history = useHistory();

  useEffect(() => {
    loggedInUser();
  }, []);

  const loggedInUser = async () => {
    const res = await fetch(`${APIURL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setUserData(result.data);
      })
      .catch(console.error);
  };

  const logout = () => {
    setOnline(false);
    history.push('./');
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div>
          <h1>Profile</h1>
          <h3>Welcome {userData.username}!</h3>
          <p>Username: {userData.username}</p>
          <p>User ID: {userData._id}</p>
          <div>
            <h4>Posts:</h4>
            {userData.posts.map((post, index) => (
              <div key={post._id} className="profile-post">
                <h4>Title: {post.title}</h4>
                <p>Description: {post.description}</p>
                <p>Price: {post.price}</p>
                <p>Location: {post.location}</p>
              </div>
            ))}
          </div>
          <div>
            <h4>Messages:</h4>
            {userData.messages.map((message, index) => (
              <div key={index} className="profile-message">
                <h4>Content: {message.content}</h4>
                <p>From User: {message.fromUser.username}</p>
                <p>On Post: {message.post.title}</p>
              </div>
            ))}
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h1> You are not logged in!</h1>
      )}
    </div>
  );
};

export default Profile;
