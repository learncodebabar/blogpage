import axios from 'axios';

export const Baseurl = 'https://9n5xtf-5000.csb.app/';
const addurl = 'https://9n5xtf-5000.csb.app/api/posts/';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(`${addurl}add`, newPost);
// get all posts from the database
export const getAllPosts = () => axios.get(`${addurl}view`); 

// delete post from the database
export const deletePost = (id) => axios.delete(`${addurl}delete/${id}`);

export const getPostById = (id) => axios.get(`${addurl}view/${id}`);

// updatePost 
export const updatePost = (id, updatedPost) => axios.patch(`${addurl}update/${id}`, updatedPost);