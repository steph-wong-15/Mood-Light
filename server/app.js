const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initializes serial communication with the correct port
let port;
if (process.env.NODE_ENV !== "production") {
    
    const { SerialPort } = require('serialport');
    const { ReadlineParser } = require('@serialport/parser-readline');

    port = new SerialPort({
        path: "COM3",
        baudRate: 115200,
        autoOpen: false,
    });

    port.open((err) => {
        if (err) {
            console.error("Error opening serial port:", err.message);
            return;
        }
        console.log("Serial port opened successfully.");
        const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
        parser.on("data", (data) => console.log("Received data:", data));
        port.on("error", (err) => console.error("Serial port error:", err.message));
    });
}

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

    if (port && process.env.NODE_ENV !== "production") {
        port.write(String(result.score));
    }
    
    res.json({ message: mood });
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
