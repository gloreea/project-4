import React from 'react'
import { useState, useEffect } from 'react'

export default function Festivals(){
    const [festivals, setFestivals] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        const fetchFestivals = async () => {
        console.log(process.env.API_KEY) 
            try {
            const api_key = process.env.REACT_APP_TICKETMASTER_API_KEY
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(search)},festival&classificationName=music&countryCode=US&apikey=${api_key}`)
            const data = await response.json()
            const festivalsData = data._embedded?.events
            if (festivalsData) {
              setFestivals(festivalsData)
            }
          } catch (error) {
            console.log(error)
          }
        }
    
    fetchFestivals()
    }, [search])
    const handleSearch = (event) => {
        setSearch(event.target.value)
      }
      const openTicketmasterPage = (url) => {
        window.open(url, '_blank')
      }
    return (
        <div>
            <h1>Upcoming Festivals</h1>
            <input type="text" placeholder="Search Festivals" onChange={handleSearch} />
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
    )
}