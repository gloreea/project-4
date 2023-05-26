import React from 'react'

import { useState } from 'react'

export default function Welcome() {
    const [darkMode] = useState(false)
    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode)
    // }
    // const pageStyles = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
    const sectionStyles = darkMode
    ? ' bg-gray-700 bg-opacity-75 text-white p-4 rounded mb-8'
    : ' bg-gray-700 bg-opacity-75 text-white p-4 rounded mb-8'
    const blurbStyles = darkMode
    ? 'bg-gray-700 bg-opacity-75 text-white p-4 rounded mb-8'
    : 'bg-gray-700 bg-opacity-90 text-white p-4 rounded mb-8'
  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(https://media.tenor.com/bKKE2DiwkaEAAAAC/on-shoulders-festival.gif)' }} >
    <div className="container mx-auto">
      <h1 className="text-7xl font-bold mb-8"> VIBEFEST</h1>
      <p className={`${blurbStyles} text-lg text-center max-w-xl mx-auto h-100`}>
        Vibefest is a unique and engaging social media platform designed exclusively for the festival community. With its integration of ChatGPT,
        the app provides personalized recommendations to enhance the festival experience for users. Whether
        you're seeking information about upcoming festivals, connecting with fellow festival-goers, or exploring new music genres.
      </p>
      <div className="flex justify-center space-x-8 mb-8">
        <div className={sectionStyles}>
          <h3 className="text-xl font-semibold">New Here?</h3>
          <form action="/register">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>
      <div className={`${sectionStyles} mb-8`}>
        <h2 className="text-2xl font-semibold">Key Features of Vibefest</h2>
        <ul className="list-disc list-inside max-w-xl">
          <li>Personalized festival recommendations from ChatGPT</li>
          <li>Interact with other users' posts</li>
          <li>Get the details on upcoming festivals</li>
        </ul>
      </div>
        <div className={sectionStyles}>
          <h3 className="text-xl font-semibold">Returning User?</h3>
          <form action="/login">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          onClick={toggleDarkMode}
        >
          {/* {darkMode ? 'Light Mode' : 'Dark Mode'} */}
        {/* </button> */} 
      </div>
    </div>
  </div>
)
}
