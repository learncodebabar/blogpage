import React, { useState } from 'react';
import { createPost } from '../api/postapi'; // Ensure the path is correct
import './blog.css';

export default function NewPost() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        category: 'html',
        image: null, // Add an image field
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value, // Handle file input
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const postData = new FormData(); // Create a FormData object
        Object.keys(formData).forEach((key) => {
            postData.append(key, formData[key]); // Append form data
        });

        try {
            await createPost(postData); // Send form data to the backend
            alert('Post created successfully!');
            // Optionally reset the form
            setFormData({
                title: '',
                subtitle: '',
                content: '',
                category: 'html',
                image: null,
            });
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post');
        }
    };

    return (
        <div className='mypost'>
            
             <h1>Create New Post</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
  
                    <input
                        type="text"
                        name='title'
                        placeholder='Enter Title'
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name='subtitle'
                        placeholder='Enter Subtitle'
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
 
                    <textarea
                        placeholder='Enter Content'
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
  
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JAVASCRIPT</option>
                    </select>
          
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        
                        onChange={handleChange}
                    />
                

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
