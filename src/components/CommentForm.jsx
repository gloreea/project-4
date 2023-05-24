import React, { useState } from 'react'
import axios from 'axios'

export default function CreateCommentForm({ postId, currentUser}) {
  const [commentContent, setCommentContent] = useState('')

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('jwt')
      const commentData = {
        postId,
        userId: currentUser?.name,
        content: commentContent,
      }

      const response = await axios.post(`http://localhost:8000/api-v1/home/${postId.toString()}/comments`, commentData,
        {
          headers: {
            'Authorization': token,
          },
        }
      )
    //   onCommentCreated(response.data.comment)
      setCommentContent('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea
        rows={3}
        placeholder="Write a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

