import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'

export default function Festivals(){
    const [festivals, setFestivals] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        const fetchFestivals = async () => {
        console.log(process.env.API_KEY) 
            try {
                // search through events US
            const api_key = process.env.REACT_APP_TICKETMASTER_API_KEY
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(search)},festival&classificationName=music&countryCode=US&apikey=${api_key}`)
            // results from fetch url
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

    // use user input to search 
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
      // open ticket link for festival in another tab
    const openTicketmasterPage = (url) => {
        window.open(url, '_blank')
    }
    return (
            <div className="bg-gray-100 bg-gradient-to-b from-blue-200 to-purple-200 min-h-screen py-8">
            <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Upcoming Festivals</h1>
            <div className="mb-4">
                <input type="text" placeholder="Search Festivals" onChange={handleSearch} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {festivals.map((festival) => (
                <div key={festival.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={festival.images[0]?.url} alt={festival.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{festival.name}</h2>
                    <p className="text-gray-600 mb-2">Date: {festival.dates.start.localDate}</p>
                    <p className="text-gray-600 mb-2">Location: {festival._embedded.venues[0]?.name}</p>
                    <p>Tickets:</p>
                    <button onClick={() => openTicketmasterPage(festival.url)} className="bg-white-500 hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded ">
                        <FontAwesomeIcon icon={faTicket} size="2xl"  style={{color: "#005eff",}}/>
                          
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}
