import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = ({ APIURL, setToken, setOnline }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    
    const response = await fetch(`${APIURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log('token:', result.data.token);
        setToken(result.data.token);
        setOnline(true);
        history.push('/posts');
      })
      .catch(console.error);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link className="create-account" to="/account/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
