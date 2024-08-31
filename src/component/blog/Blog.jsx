import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost, Baseurl } from '../api/postapi';
import { useNavigate } from 'react-router-dom';
import './blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
        console.log(response.data);
       


        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/editpost/${id}`); // Navigate to the edit page
  };

  const handleViewClick = (id) => {
    navigate(`/posts/${id}`); // Navigate to the post details page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  return (
    <div className="container">
      <h1>Blog</h1>
      <p>This is the blog page</p>
      <p>{posts.length} posts</p>
      {posts.map((post) => (
        <div key={post._id}>
          <div className="articles">
            <div className="postarea">
              <h2>{post.title}</h2>
              <h3>{post.subtitle}</h3>
              <p>{truncateContent(post.content, 70)}</p>
              <p><strong>Category:</strong> {post.category}</p>
              <button className="view" onClick={() => handleViewClick(post._id)}>View</button>
              <button className="edit" onClick={() => handleEditClick(post._id)}>Edit</button>
              <button className="del" onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
            <div className="postimage">
              <img src={`${Baseurl}${post.image}`} alt={post.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
