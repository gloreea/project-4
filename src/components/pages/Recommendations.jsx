import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'

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
      <div className="bg-gradient-to-b from-blue-200 to-purple-200 min-h-screen">
        <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Get Festival Recommendations</h2>
            <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block">User:</label>
          <input value={userId} disabled className="bg-gray-200 px-4 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block">Preferences:</label>
          <input type="text" value={preferences} placeholder="enter genres..." onChange={handlePreferencesChange} className="w-1/3 bg-gray-200 px-4 py-2 rounded"/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Get Recommendations</button>
      </form>
      {recommendation && (
        <div>
          <h3 className="text-lg font-bold mb-2">Recommendation:</h3>
          <p className="text-gray-700 h-40">{recommendation}</p>
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search Festivals" className="w-1/3 bg-gray-200 px-4 py-2 rounded mt-9 mb-5" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {festivals.map((festival) => (
            <div key={festival.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{festival.name}</h2>
              <p className="mb-2">Date: {festival.dates.start.localDate}</p>
              <p className="mb-2">Location: {festival._embedded.venues[0]?.name}</p>
              <img src={festival.images[0]?.url} alt={festival.name} className="object-cover mb-2 w-2/3 h-64 mx-auto "/>
              <p>Get Tickets:</p>
              <button onClick={() => openTicketmasterPage(festival.url)} className=" hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded ">
              <FontAwesomeIcon icon={faTicket} size="2xl"  style={{color: "#005eff",}}/>
              </button>
        </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
    )
}