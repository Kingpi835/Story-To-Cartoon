import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartoon, setCartoon] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/convert', { story });
      setCartoon(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to convert story. Please try again.');
      setCartoon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎬 Story to Cartoon</h1>
          <p>Turn your stories into amazing cartoons!</p>
        </header>

        <form className="form" onSubmit={handleConvert}>
          <div className="form-group">
            <label htmlFor="story">Enter Your Story:</label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write or paste your story here... The more detailed, the better!"
              rows="8"
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-convert"
            disabled={loading || !story.trim()}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Converting...
              </>
            ) : (
              '✨ Convert to Cartoon'
            )}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {cartoon && (
          <div className="cartoon-result">
            <h2>Your Cartoon Story</h2>
            <div className="comic-strip">
              {cartoon.images.map((image, index) => (
                <div key={index} className="comic-panel">
                  <img src={image} alt={`Scene ${index + 1}`} />
                  <p className="scene-text">{cartoon.scenes[index]}</p>
                </div>
              ))}
            </div>
            <button 
              className="btn-reset"
              onClick={() => {
                setStory('');
                setCartoon(null);
              }}
            >
              Create Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
