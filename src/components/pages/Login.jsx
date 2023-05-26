import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	const navigate = useNavigate()

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		navigate("/profile")
	}

	return (
        <div className="bg-gradient-to-b from-purple-200 to-blue-200 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-6">Login to Your Account:</h1>
          <p className="text-red-500 mb-4">{msg}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-lg font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-lg font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
	)
}