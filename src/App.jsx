import { useState } from 'react'
import './App.css'
import Navbar from './component/navbar/navbar'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewPost from './component/blog/NewPost'
import Blog from './component/blog/Blog'
import PostDetails from './component/blog/PostDetails'
import EditPost from './component/blog/editPost'


function App() {
  

  return (
    <>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/write' element={<NewPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
