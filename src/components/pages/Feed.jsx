import { useState, useEffect } from 'react'
import React from "react"
import CreatePostForm from '../PostForm'
import axios from 'axios'
import CreateCommentForm from '../CommentForm'
import { faComment, faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HomeFeedPage({ currentUser }) {
  const [posts, setPosts] = useState([])
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)
  const [editingPostId, setEditingPostId] = useState(null)
  const [editedContent, setEditedContent] = useState('')
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState('')
  const [showComments, setShowComments] = useState(false)
  // const [showCommentsPost, setShowCommentsPost] = useState([])
 

  useEffect(() => {
    // const token = localStorage.getItem('jwt')
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
      // newest posts are first and old posts at bottom
      const reversedPosts = response.data.posts.reverse()
      console.log(token)
      console.log(response.data)
      // setPosts(response.data.posts)
      setPosts(reversedPosts)
    } catch (error) {
      console.log(error)
    }
  }
  // show and hide comments functionality (bug where the state of all buttons change)
  const handleToggleComments = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        if (showComments) {
          // clear comments when hiding them
          return { ...post, comments: [] }
        }
        return post
      }
      return post
   
  })
  setPosts(updatedPosts)
    setShowComments(!showComments)
    if (!showComments) {
      // fetch comments only when showing comments
      await fetchComments(postId)
    }
    // fetchComments(postId)
    
  } 
  // showing the create comment form and hiding when comment button is clicked for a specific post(buggy a bit)
  const toggleCommentForm = (postId) => {
    setShowCommentForm(!showCommentForm)
    setSelectedPostId(postId)
  }
  // get all comments for a specific post and show all comments for that posts 
  const fetchComments = async (postId) => {
    try {
      const token = localStorage.getItem('jwt')
      const response = await axios.get(`http://localhost:8000/api-v1/home/${postId}/comments`, {
        headers: {
          Authorization: token,
        },
      })
      console.log(response.data.post, "hi")
      console.log(posts)
      console.log(postId)
      
      // comments from post 
      const comments = response.data.post.comments
      // update posts to contain comments now
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          console.log("string", post, comments)
          return {
            ...post,
            comments: comments,
          }
        }
        console.log("another", post)
        return post
      })
      console.log(response.data.post)
      console.log(updatedPosts)
      setPosts(updatedPosts)
    } catch (error) {
      console.log(error)
    }
  }
  // create a post and save it to post db and refresh feed page(await fetch posts not working correctly)
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
    // hidden edit post form that shows when edit is clicked, and allows you to update the post
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
    // delete button function for post 
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
    
    // const handleCreateComment = async (postId, commentContent) => {
    //     try {
         
    //       console.log('Comment Content:', commentContent)
    //       console.log('Current User Name:', currentUser?.name)
    //       const token = localStorage.getItem('jwt')
    //       const commentData = {
    //         content: commentContent
    //       }
    //       console.log(postId, "lol")
    //       await axios.post(
    //         `http://localhost:8000/api-v1/home/${postId._id}/comments`,commentData,
    //         {
    //           headers: {
    //             Authorization: token,
    //           },
    //         }
    //       )
    //       await fetchPosts()
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

  return (
    <div className="bg-gradient-to-b from-blue-200 to-purple-200 min-h-screen flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4">Home Feed</h1>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      onClick={() => setShowCreatePostForm(true)}>
      Create Post
    </button>
    {showCreatePostForm && (
      <CreatePostForm currentUser={currentUser} setPosts={handleCreatePost} />
     )}
     <div className="mt-8 w-1/3">
    {posts.map((post) => (
      <div key={post._id} className="bg-white p-8  shadow mb-4 h-100 rounded">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <div>
            <strong className="text-lg">{post.userId && post.userId.name && post.userId.name.toString()}</strong>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
      </div>
      {editingPostId === post._id ? (
        <div>
          <input
            type="text"
            value={editedContent}
            placeholder="edit post..."
            onChange={(e) => setEditedContent(e.target.value)}
            />
          <button onClick={() => handleEditPost(post._id, editedContent)}>Save</button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold mb-2">{post.festival}</h3>
          <p>{post.content}</p>
          <div className="flex items-center justify-between mt-4">
           </div>
            <div className="flex items-center justify-between  mt-10">
            <div>
            <button className="bg-white-500 hover:bg-red-200 text-white font-semibold py-2 px-4 rounded " >
            <FontAwesomeIcon icon={ faHeart }  style={{color: "#e60000",}} className="mr-2" /></button>
            </div>
            <div className="flex">
              <button
                className="bg-white-500 hover:bg-blue-400 text-white font-semibold py-3 px-7 rounded ml-3"
                onClick={() => toggleCommentForm(post._id)} >
                   <FontAwesomeIcon icon={faComment} style={{color:"#333c4d"}}className="ml-5" />
              </button>
            </div>
              <button
                className="text-blue-500 hover:text-blue-600 font-semibold"
                onClick={() => handleToggleComments(post._id)}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </button>
            </div>
            {showCommentForm && selectedPostId === post._id && (
              <CreateCommentForm postId={post._id} currentUser={currentUser} />
              )}
          {currentUser && currentUser._id === post.userId._id && (
            <div className="mt-4">
              <button
                className="bg-green-300 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-sm mr-2"
                onClick={() => setEditingPostId(post._id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-sm"
                onClick={() => handleDeletePost(post._id)}>
                Delete
              </button>
            </div>
          )}
          {post.comments && post.comments.length > 0 && showComments && (
            <div className="mt-4">
              {post.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-100 p-2 mt-2 rounded flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                  <div className="flex-grow">
                    <p>{comment.content}</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : ""} {/*  change format of created at */}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!post.comments || post.comments.length === 0 && (
            <p className="mt-4"></p>
            )}
        </>
      )}
    </div>
  ))}
  </div>
</div>

  
    )
  }

