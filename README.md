## MoodLight – Emotion-Based Smart Lighting

MoodLight is an emotion-based smart lighting system that adjusts ambient lighting based the sentiment detected in text. It utilizes an Arduino and NeoPixel LEDs to create dynamic lighting effects.

# Features

Emotion-Based Color Selection: Detects postive, negative, or neutral mood of text and changes LED colors based on user input.

Hardware Integration: Uses Arduino to control NeoPixel LED lights.

React Frontend: Interactive UI for text input.

Node.js Backend: Handles communication between frontend and Arduino and API calls.


# Technologies Used

Frontend: React.js

Backend: Node.js, Express

Hardware: Arduino, NeoPixel LED


# Setup Instructions

1. Hardware Setup

Connect the NeoPixel LED strip to the Arduino using 3 wires to connect GND, 5V, and Data In.

Ensure SPI is enabled on the BeagleBone.

Power the BeagleBone and NeoPixel LEDs accordingly.

2. Software Setup

Install Dependencies

npm install

Run the Backend Server

node server.js

Start the Frontend

cd client
npm start

How It Works

User Input: The user inputs text and the app analyzes the sentiment - it changes the light accordingly.

Backend Processing: The Node.js backend determines mood.

Lighting Effect: The LED strip changes colour based on mood.

# Future Enhancements

Implement voice emotion detection.
