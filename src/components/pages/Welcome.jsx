import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div >
      <h1>Welcome to Vibefest</h1>
      <p >
        Vibefest is a unique and engaging social media platform designed exclusively for the festival community. With its integration of ChatGPT,
        the app provides personalized recommendations and to enhance the festival experience for users. Whether
        you're seeking information about upcoming festivals, connecting with fellow festival goers, or exploring new music
        genres.
      </p>
        <div >
        <h3>New Here?</h3>
        <form action="/register">
            <button>Register</button>
        </form>
        </div>        
        <div>
        <h3>Returning User?</h3>
        <form action="/login">
            <button>Log In</button>
        </form>
      </div>
      <div >
        <h2 >Key Features of Vibefest</h2>
        <ul >
          <li>Personalized festival recommendations from ChatGPT</li>
          <li>Interact with other users posts</li>
          <li>Get the details on upcoming festivals</li>
        </ul>
      </div>
    </div>
  )
}