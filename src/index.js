import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import {
  Posts,
  Profile,
  Login,
  Home,
  Register,
  NewPost,
  EditPost,
} from './components';


const App = () => {
  const APIURL =
    'https://strangers-things.herokuapp.com/api/2209-FTB-CT-WEB-PT';
  const [token, setToken] = useState('');
  const [online, setOnline] = useState(false);
  const [activePost, setActivePost] = useState();

  return (
    <BrowserRouter>
      <div className="container">
        <div className="navbar">
          <h1 className="home-title">Stranger's Things by ZM</h1>
          <div className="navlinks-container">
            <Link className="navlinks" to="/">
              Home
            </Link>
            <Link className="navlinks" to="/posts">
              Posts
            </Link>
            {online === true ? (
              <Link className="navlinks" to="/account">
                Profile
              </Link>
            ) : (
              <Link className="navlinks" to="/account/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="app">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Posts APIURL={APIURL} token={token} setActivePost={setActivePost} />
        </Route>
        <Route path="/new-post">
          <NewPost APIURL={APIURL} token={token} />
        </Route>
        <Route path="/edit-post">
          <EditPost APIURL={APIURL} token={token} activePost={activePost} />
        </Route>
        <Switch>
          <Route exact path="/account">
            <Profile
              APIURL={APIURL} token={token} online={online} setOnline={setOnline}
            />
          </Route>
          <Route path="/account/login">
            <Login APIURL={APIURL} setToken={setToken} setOnline={setOnline} />
          </Route>
          <Route path="/account/register">
            <Register APIURL={APIURL} setToken={setToken} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
// export default App;
