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

  const apiKey = import.meta.env.VITE_WEATHER_API

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(() => setErrorCountries('Failed to fetch countries'))
      .finally(() => setLoadingCountries(false))
  }, [])

  
  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      const capitalCity = selectedCountry.capital[0]

      setLoadingWeather(true)
      setErrorWeather(null)
      setWeather(null)

      axios.get('https://api.openweathermap.org/data/2.5/weather?q={capitalCity}&appid={apiKey}&units=metric', {
        params: {
          q: capitalCity,
          appid: apiKey,
          units: 'metric'
        }
      })
      .then(response => {
        setWeather(response.data)
      })
      .catch(() => {
        setErrorWeather('Failed to fetch weather')
      })
      .finally(() => {
        setLoadingWeather(false)
      })
    }
  }, [selectedCountry, apiKey])

  
  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  
  const filteredCountries = countries.filter(country =>
    country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase().trim())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Countries Search</h1>

      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setSelectedCountry(null)
        }}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />

  
      {loadingCountries && <p>Loading countries...</p>}
      {errorCountries && <p style={{ color: 'red' }}>{errorCountries}</p>}

      
      {!loadingCountries && !errorCountries && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredCountries.map(country => (
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
          ))}
        </ul>
      )}

      
      {selectedCountry && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
          <h2>{selectedCountry.name.common}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {selectedCountry.region}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>

          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: '150px', marginTop: '10px' }}
          />

          
          {loadingWeather && <p>Loading weather...</p>}
          {errorWeather && <p style={{ color: 'red' }}>{errorWeather}</p>}

          {weather && !loadingWeather && !errorWeather && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px'
            }}>
              <h3>Weather in {weather.name}</h3>
              <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
              <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
              <p><strong>Weather:</strong> {weather.weather[0].description}</p>
              <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
              <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App