const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/text', (req, res) => {

    const { text } = req.body;
    const textReceived = text
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
    res.json({ message: mood });
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
