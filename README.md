# MoodLight – Emotion-Based Smart Lighting

MoodLight is an emotion-based smart lighting system that adjusts ambient lighting based the sentiment detected in text. It utilizes an Arduino and NeoPixel LEDs to create dynamic lighting effects.

https://mood-light.onrender.com/

## Features

Emotion-Based Color Selection: Detects postive, negative, or neutral mood of text and changes LED colors based on user input.

Hardware Integration: Uses Arduino to control NeoPixel LED lights.

React Frontend: Interactive UI for text input.

Node.js Backend: Handles communication between frontend and Arduino and API calls.


## Technologies Used

Frontend: React.js

Backend: Node.js, Express

Hardware: Arduino, NeoPixel LED


## Setup Instructions

### Hardware Setup
1. **Connect NeoPixel LEDs**: Connect the NeoPixel LED strip to the Arduino using three wires:
   - **GND** → Ground
   - **5V** → Power
   - **Data In** → Control Signal

### Software Setup

1. Install Dependencies

```sh
npm install
```

2. Run the Backend Server

```sh
node server.js
```

3. Start the Frontend
   
```sh
cd client
npm start
```

## How It Works

User Input: The user inputs text and the app analyzes the sentiment - it changes the light accordingly.

Backend Processing: The Node.js backend determines mood.

Lighting Effect: The LED strip changes colour based on mood.

## Future Enhancements

Implement voice emotion detection.
