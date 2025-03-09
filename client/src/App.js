import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [mood, setMood] = useState('default');

  const detectMood = (text) => {
    const positiveWords = ['happy', 'joy', 'great', 'excellent', 'good', 'love', 'wonderful'];
    const negativeWords = ['sad', 'bad', 'angry', 'hate', 'terrible', 'awful', 'mad'];
    
    const words = text.toLowerCase().split(' ');
    
    if (words.some(word => positiveWords.includes(word))) {
      return 'positive';
    } else if (words.some(word => negativeWords.includes(word))) {
      return 'negative';
    }
    return 'neutral';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const detectedMood = detectMood(text);
    setMood(detectedMood);
    
    const response = await fetch('http://localhost:3000/api/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
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
            placeholder="Enter your mood or feeling"
          />
          <button type="submit">Submit</button>
        </form>
        {responseText && (
          <div className="response">
            <h2>Your Mood:</h2>
            <p>{responseText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
