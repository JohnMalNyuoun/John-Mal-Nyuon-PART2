import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [errorCountries, setErrorCountries] = useState(null)

  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [errorWeather, setErrorWeather] = useState(null)

  // Map weather codes to weather icons
  const getWeatherIcon = (code) => {
    const iconMap = {
      0: '☀️', // Clear sky
      1: '🌤️', // Mainly clear
      2: '⛅', // Partly cloudy
      3: '☁️', // Overcast
      45: '🌫️', // Foggy
      48: '🌫️', // Foggy
      51: '🌧️', // Drizzle
      53: '🌧️', // Drizzle
      55: '🌧️', // Drizzle
      61: '🌧️', // Rain
      63: '🌧️', // Rain
      65: '⛈️', // Heavy rain
      71: '🌨️', // Snow
      73: '🌨️', // Snow
      75: '🌨️', // Snow
      77: '🌨️', // Snow
      80: '🌦️', // Rain showers
      81: '⛈️', // Rain showers
      82: '⛈️', // Rain showers
      85: '❄️', // Snow showers
      86: '❄️', // Snow showers
      95: '⛈️', // Thunderstorm
      96: '⛈️', // Thunderstorm
      99: '⛈️' // Thunderstorm
    }
    return iconMap[code] || '🌡️'
  }

  // 1. Fetch all countries on component mount
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(() => {
        setErrorCountries('Failed to fetch countries')
      })
      .finally(() => {
        setLoadingCountries(false)
      })
  }, [])

  // 2. Fetch weather when a country is selected
  useEffect(() => {
    if (selectedCountry && selectedCountry.capital && selectedCountry.capital.length > 0) {
      const capitalCity = selectedCountry.capital[0]

      setLoadingWeather(true)
      setErrorWeather(null)
      setWeather(null)

      // First, get coordinates for the city using geocoding API
      axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: capitalCity,
          count: 1,
          language: 'en',
          format: 'json'
        }
      })
      .then(geoResponse => {
        if (geoResponse.data.results && geoResponse.data.results.length > 0) {
          const { latitude, longitude } = geoResponse.data.results[0]

          // Now get weather using coordinates
          return axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
              latitude,
              longitude,
              current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
              temperature_unit: 'celsius'
            }
          })
        } else {
          throw new Error('City not found')
        }
      })
      .then(weatherResponse => {
        setWeather({
          name: capitalCity,
          ...weatherResponse.data.current
        })
      })
      .catch((error) => {
        console.error('Weather API Error:', error)
      })
      .finally(() => {
        setLoadingWeather(false)
      })
    }
  }, [selectedCountry])

  // Handle searching
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setSelectedCountry(null) // Reset selection when user types a new search
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  // Filter logic
  const filteredCountries = countries.filter(country =>
    country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase().trim())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>World Explorer & Weather</h1>

      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px' }}
      />

      {loadingCountries && <p>Loading country list...</p>}
      {errorCountries && <p style={{ color: 'red' }}>{errorCountries}</p>}

      {!loadingCountries && !errorCountries && searchTerm && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredCountries.length > 10 ? (
            <p>Too many matches, please specify your search.</p>
          ) : (
            filteredCountries.map(country => (
              <li
                key={country.cca3}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{country.name.common}</span>
                <button
                  onClick={() => handleCountrySelect(country)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Show Details
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Detailed Country View */}
      {selectedCountry && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <button onClick={() => setSelectedCountry(null)}>Back to list</button>

          <h2>{selectedCountry.name.common}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {selectedCountry.region}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>

          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: '150px', marginTop: '10px', border: '1px solid #eee' }}
          />

          {loadingWeather && <p>Loading weather...</p>}

          {weather && !loadingWeather && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px'
            }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '32px' }}>{getWeatherIcon(weather.weather_code)}</span>
                Weather in {weather.name}
              </h3>
              <p><strong>Temperature:</strong> {weather.temperature_2m}°C</p>
              <p><strong>Humidity:</strong> {weather.relative_humidity_2m}%</p>
              <p><strong>Wind Speed:</strong> {weather.wind_speed_10m} km/h</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App