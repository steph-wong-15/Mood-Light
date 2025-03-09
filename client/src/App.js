import React, { useState } from 'react';
import './App.css';

const API_URL = process.env.NODE_ENV === "production"
    ? "https://your-heroku-app-name.herokuapp.com"
    : "http://localhost:3000";

function App() {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [mood, setMood] = useState('default');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${API_URL}/api/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    const data = await response.json();
    setMood(data.message.toLowerCase()); // Assuming the API response contains a mood message like "Positive", "Negative", or "Neutral"
    setResponseText(data.message);
  };

  return (
    <div className={`App ${mood}`}>
      <div className="container">
        <h1>Mood Light</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a sentence or paragraph"
          />
          <button type="submit">Submit</button>
        </form>
        {responseText && (
          <div className="response">
            <h2>The Mood</h2>
            <p>{responseText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
