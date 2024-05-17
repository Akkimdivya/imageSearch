import React, { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://api.unsplash.com/search/photos';

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = searchInput.current.value;

    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: { query },
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`,
          },
        });
        setImages(response.data.results);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    handleSearch({ preventDefault: () => {} });
  };

  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection('Mountain')}>Mountain</div>
        <div onClick={() => handleSelection('Flowers')}>Flowers</div>
        <div onClick={() => handleSelection('Beaches')}>Beaches</div>
        <div onClick={() => handleSelection('Cities')}>Cities</div>
      </div>
      <div className="results">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="image-gallery">
            {images.map((image) => (
              <div key={image.id} className="image-item">
                <img src={image.urls.small} alt={image.alt_description} />
                <div className="image-details">
                  <p>{image.alt_description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
