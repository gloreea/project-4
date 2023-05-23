import React, { useState } from 'react'
import axios from 'axios'

export default function CreatePostForm({ currentUser, setPosts }) {
    const [content, setContent] = useState('')
    const [festival, setFestival] = useState('')

    const userId = currentUser?._id

    const handleContentChange = (e) => {
      setContent(e.target.value)
    }
    const handleFestivalChange = (e) => {
        setFestival(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const token = localStorage.getItem('jwt')
        console.log(token)
        const response = await axios.post('http://localhost:8000/api-v1/home', {
          userId: userId,
          content: content,
          festival: festival
        },
        {
        headers: {
            'Authorization': token
            }
        })
        setPosts((prevPosts) => [...prevPosts, response.data])
        setContent('')
        setFestival('')
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
        <div>
        
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={festival}
        onChange={handleFestivalChange}
        placeholder="Write about a festival"
        />
        <textarea value={content} onChange={handleContentChange} placeholder='share an experience...' />
        <button type="submit">Post</button>
        </form>
        </div>
    )
  }