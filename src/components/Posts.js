import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Messages from './Messages';

const Posts = ({ APIURL, token, setActivePost }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(`${APIURL}/POSTS`);
    const data = await res.json();
    const strangers = data.data;
    console.log(strangers.posts);
    setPosts(strangers.posts);
  };

  const deletePost = async (postIdToDelete) => {
    const res = await fetch(`${APIURL}/posts/${postIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setPosts([]);
      fetchPosts();
    }
    console.log('res', res);
  };

  const postMatches = (post, text) => {
    if (post?.title.toLowerCase().includes(text)) {
      return true;
    } else if (post?.description.toLowerCase().includes(text)) {
      return true;
    } else {
      return false;
    }
  }

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  return (
    <div className="posts-container">
      <h1>POSTS</h1>

      <label>Search for post:</label>
      <input
        type="text"
        placeholder="Search"
        className="search-form"
        onChange={(e) => {
          setSearchTerm(e.target.value);

        }}
      />

      <Link to="/new-post" className="new-post-link">
        Add new Post
      </Link>

      <div>
        {postsToDisplay?.map((post) => {
          return (
            <div className="posts" key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <p>Seller: {post.author.username}</p>
              <p>Location: {post.location}</p>
              <p>Will Deliver: {post.willDeliver ? 'True' : 'False'}</p>
              <div className="buttons-container">
                <button
                  onClick={() => deletePost(post._id)}
                  className="delete-post"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    history.push('/edit-post');
                    setActivePost(post);
                  }}
                  className="edit-post"
                >
                  Edit
                </button>
              </div>
              <div className="messages">
                <Messages url={APIURL} postId={post._id} token={token} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
