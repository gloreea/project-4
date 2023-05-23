import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Recommendations({currentUser}){
    const [preferences, setPreferences] = useState('')
    const [recommendation, setRecommendation] = useState('')

    const userId = currentUser?.name
   
    const handlePreferencesChange = (event) => {
    setPreferences(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
     try {
        const response = await axios.post('http://localhost:8000/api-v1/recommendations', {
          userId,
          preferences,
        })
        console.log(response.data.recommendations)
        setRecommendation(response.data.recommendations)
      } catch (error) {
        console.log(error)
      }
    }

    return(
        <div>
        <h2>Get Festival Recommendations: {userId}</h2>
            <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <input value={userId} disabled />
        </div>
        <div>
          <label>Preferences:</label>
          <input type="text" value={preferences} onChange={handlePreferencesChange} />
        </div>
        <button type="submit">Get Recommendations</button>
      </form>
      {recommendation && (
        <div>
          <h3>Recommendation:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
    )
}