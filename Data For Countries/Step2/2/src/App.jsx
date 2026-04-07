import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
console.log("Search Term:", searchTerm)
 
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(() => setError('Failed to fetch countries'))
      .finally(() => setLoading(false))
  }, [])

  
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Countries Search</h1>

      
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      /> 

      {loading && <p>Loading countries...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredCountries.map(country => (
          <li
            key={country.cca3}
            style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>{country.name.common}</span>
            <button
              onClick={() => setSelectedCountry(country)}
              style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Show Details
            </button>
          </li>
        ))}
      </ul>

     
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
        </div>
      )}
    </div>
  )
}

export default App