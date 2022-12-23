import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ APIURL, token, setOnline }) => {
  const [userData, setUserData] = useState([]);
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
      setUserData(result.data.posts);
    })
    .catch(console.error);
  };

  const logout = () => {
    setOnline(false);
    history.push('./');
  };

  return (
    <div className='profile-container'>
      {userData === null ? (
        <h1> You are not logged in!</h1>
      ) : (
        <>{userData.map ((data) => {
          return (
          <div>
            <h1>Profile</h1>
          <h3>Welcome {userData.username}!</h3>
          <p>Username: {userData._id}</p>
          <p>User ID: {userData.cohort}</p>
          <p>Posts: {userData.posts}</p>
          <p>Messages: {userData.messages}</p>
          <button onClick={logout}>Logout</button>
          </div>  
          )
        })}
          
        </>
      )}
    </div>
  );
};

export default Profile;