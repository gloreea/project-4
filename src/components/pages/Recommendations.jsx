import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Recommendations({currentUser}){
    const [preferences, setPreferences] = useState('')
    const [recommendation, setRecommendation] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [festivals, setFestivals] = useState([])
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
        setFestivals([])
      } catch (error) {
        console.log(error)
      }
    }
    const handleSearch = async (e) => {
      setSearchQuery(e.target.value)
    } 
    useEffect(() => {
      const fetchFestivals = async () => {
        try {
          const api_key = process.env.REACT_APP_TICKETMASTER_API_KEY;
          const response = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(
              searchQuery
            )},festival&classificationName=music&countryCode=US&apikey=${api_key}`
          )
          const data = response.data._embedded?.events
          if (data) {
            setFestivals(data)
          }
        } catch (error) {
          console.log(error)
        }
      };
  
      fetchFestivals();
    }, [searchQuery]);
  
    const openTicketmasterPage = (url) => {
      window.open(url, '_blank');
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
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search Festivals" />
          {festivals.map((festival) => (
            <div key={festival.id}>
              <h2>{festival.name}</h2>
              <p>Date: {festival.dates.start.localDate}</p>
              <p>Location: {festival._embedded.venues[0]?.name}</p>
              <img src={festival.images[0]?.url} alt={festival.name} />
              <button onClick={() => openTicketmasterPage(festival.url)}>More Info</button>
        </div>
            ))}
        </div>
      )}
    </div>
    )
}