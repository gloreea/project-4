import { useState, useEffect } from 'react'
import React from "react"
import CreatePostForm from '../PostForm'
import axios from 'axios'

export default function HomeFeedPage({ currentUser }) {
  const [posts, setPosts] = useState([])
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)
  const [editingPostId, setEditingPostId] = useState(null)
  const [editedContent, setEditedContent] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
        const token = localStorage.getItem('jwt')
        const response = await axios.get('http://localhost:8000/api-v1/home', {
          headers: {
            'Authorization': token
          }
        })
    console.log(token)
      console.log(response.data)
      setPosts(response.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreatePost = async () => {
    try {
        const token = localStorage.getItem('jwt')
        const postData = {
          userId: currentUser?.name,
            festival: 'festival',
            content: 'content',
          }
        await axios.post('http://localhost:8000/api-v1/home',postData, {
          headers: {
            'Authorization': token
          }
        })
        console.log(token)
        await fetchPosts()
        setShowCreatePostForm(false)
      } catch (error) {
        console.log(error)
      }
    }

    const handleEditPost = async (postId, content) => {
        try {
            console.log(content)
            const token = localStorage.getItem('jwt')
            await axios.put(`http://localhost:8000/api-v1/home/${postId.toString()}`, {content},{
                headers: {
                  'Authorization': token,
                },
            })
            await fetchPosts()
            setEditingPostId(null)
            setEditedContent('')
            console.log(postId)
        } catch (error) {
          console.log(error)
        }
    }
    const handleDeletePost = async (postId) => {
        try {
            const token = localStorage.getItem('jwt')
            await axios.delete(`http://localhost:8000/api-v1/home/${postId}`, {
              headers: {
                'Authorization': token
              }
            })
          await fetchPosts()
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
      <h1>Home Feed</h1>
      <button onClick={() => setShowCreatePostForm(true)}>Create Post</button>
      {showCreatePostForm && (
        <CreatePostForm currentUser={currentUser} setPosts={handleCreatePost} />
      )}
      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: '20px' }}>
          {editingPostId === post._id ? (
          <div>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={() => handleEditPost(post._id, editedContent)}>Save</button>
        </div>
      ) : (
          <>
            <div>
              <strong>User:</strong> {post.userId && post.userId.name && post.userId.name.toString()}
            </div>
            <div>
                <strong>Festival:</strong> {post.festival}
            </div>
            <div>
                <strong>Content:</strong> {post.content}
            </div>
            <div>
                <button>Like</button>
                <button>Comment</button>
            </div>
          </>
      )}
          {currentUser && currentUser._id === post.userId._id &&  (
          <div>
            <button onClick={() => setEditingPostId(post._id)}>Edit</button>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          </div>
        )}
        </div>
      ))}
    </div>
  )
}