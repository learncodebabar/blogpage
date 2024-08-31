import React, { useState, useEffect } from 'react';
import { updatePost, getPostById } from '../api/postapi';
import './blog.css';
import { useParams ,useNavigate} from 'react-router-dom';

export default function EditPost() {

  const navigate = useNavigate();

  const { id: postId } = useParams(); // Destructure id from useParams

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setFormData({
          title: response.data.title || '',
          subtitle: response.data.subtitle || '',
          content: response.data.content || '',
          category: response.data.category || '',
          image: null, // Image should not be set directly
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subtitle', formData.subtitle);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('category', formData.category);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const updatedPost = await updatePost(postId, formDataToSend);
      alert('Data updated')
      navigate('/')
     



    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mypost'>
      <h1>Update Your Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
