import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    console.log('Response:', data);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Mood Light</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;