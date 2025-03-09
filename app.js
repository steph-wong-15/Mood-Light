const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const { SerialPort } = require('serialport'); 
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize serial communication with the correct port
const port = new SerialPort({
    path: "COM3",  
     baudRate: 115200
   });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
port.on("open", () => {
    console.log('serial port open');
  });parser.on('data', data =>{
    console.log('got word from arduino:', data);
  });

app.post('/api/text', (req, res) => {

    const { text } = req.body;
    const textReceived = text;
    console.log('Received Text: ', textReceived); 
    
    const sentiment = new Sentiment();
    const result = sentiment.analyze(textReceived);
    console.log(result.score); // { score: 3, comparative: 1, ... }

    var mood = "Unknown";

    if (result.score > 1) {
        mood = "Positive";
    }   
    else if (result.score < -1) {
        mood = "Negative";
    }
    else {
        mood = "Neutral";
    }

    port.write(String(result.score));
    res.json({ message: mood });
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
