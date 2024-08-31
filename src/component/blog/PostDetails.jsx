import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Baseurl, getPostById } from '../api/postapi';
import './blog.css';
export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="post-details-container">
      {post && (
        <>
          <h1>{post.title}</h1>
          <h2>{post.subtitle}</h2>
          <p>{post.content}</p>
          <p><strong>Category:</strong> {post.category}</p>
          
          {post.image && (
            <img src={`${Baseurl}${post.image}`} alt={post.title} />
          )}
        </>
      )}
    </div>
  );
}
