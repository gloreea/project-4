import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Profile({ currentUser, handleLogout }) {
  const [userPosts, setUserPosts] = useState([])
  const [editingPostId, setEditingPostId] = useState(null)
  const navigate = useNavigate()
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    const fetchUserPosts = async () => {
      let posts = []
      try {
        const token = localStorage.getItem('jwt')
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/home`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        console.log(token)
        if (currentUser && currentUser._id) {
          posts = response.data.posts.filter(
            (post) => post.userId._id === currentUser._id.toString()
          );
        }
      } catch (error) {
        console.log(error)
      }
      setUserPosts(posts)
    };

    fetchUserPosts()
  }, [currentUser])

//   const handleLogoutAndNavigate = () => {
//     handleLogout()
//     navigate('/login')
//   }
  const handleEditToggle = (postId) => {
    if (editingPostId === postId) {
      // If already editing, cancel editing
      setEditingPostId(null)
      setEditedContent('')
    } else {
      // Start editing
      const post = userPosts.find((p) => p._id === postId)
      setEditingPostId(postId)
      setEditedContent(post.content)
    }
  };
  const handleEditPost = async (postId, content) => {
    try {
        console.log(content)
        const token = localStorage.getItem('jwt')
        await axios.put(
          `http://localhost:8000/api-v1/home/${postId}`,
          { content },
          {
            headers: {
              Authorization: token,
            },
          }
        )
    
        // Update the userPosts array with the edited post
        const updatedPosts = userPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, content }
          }
          return post
        })
        // await fetchUserPosts()
        setUserPosts(updatedPosts)
        setEditingPostId(null)
        setEditedContent('')
      } catch (error) {
        console.log(error)
      }
    // Handle edit functionality
  }

  const handleDeletePost = async (postId ) => {
    try {
        const token = localStorage.getItem('jwt');
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/home/${postId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        const updatedPosts = userPosts.filter((post) => post._id !== postId);
        setUserPosts(updatedPosts)
      } catch (error) {
        console.log(error)
      }
    // Handle delete functionality
  }

  return (
    <div className="bg-gradient-to-b from-blue-200 to-purple-200 min-h-screen">
    <div className="container mx-auto py-8">
    <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Hello,  {currentUser?.name}</h1>
    {/* <button
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        onClick={handleLogoutAndNavigate}>
    
    </button> */}
    </div>

    <div className="space-y-6"> 
    <h2 className="text-2xl font-semibold">Your Posts:</h2>
    {userPosts.map((post) => (
    <div key={post._id} className="border bg-gray-100 border-gray-300 rounded-lg p-4">
      {editingPostId === post._id ? (
        <div className="flex items-center mb-2">
          <textarea
            className="flex-grow text-gray-800 p-2 rounded focus:outline-none"
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded ml-4 hover:bg-blue-600"
            onClick={() => handleEditPost(post._id, editedContent)}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300" />
              <p className="ml-2 text-gray-800 font-semibold">{post.userId.name}</p>
            </div>
            <div className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-lg">{post.festival}</p>
            <p className="text-gray-800">{post.content}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => handleEditToggle(post._id)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDeletePost(post._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
        ))}
        </div>
    </div>
    </div>
    )
}