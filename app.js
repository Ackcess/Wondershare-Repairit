const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {GoogleGenerativeAI} = require('@google/generative-ai')

// import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

 
app.post('/get', async (req, res) => {
    try {
        var mesg = req.body.msg;
        // console.log('Received message:', mesg);
        const input = mesg;
        const genAI = new GoogleGenerativeAI('AIzaSyB4HXF0ZqI5y6T526nq2s2Ld1f3zIUD2vs');
   
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001" });
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: "Hello" }],
            },
            {
              role: "model",
              parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
          ],
        });

        mesg += ' [ Note: answer the event going on is crdb chat bot launching day and answer only crdb bank related questions, if you are asked so] use less than 20 words, no emojis or picture';

        let result = await chat.sendMessage(mesg);
        const sendMsg = result?.response.text();

        res.json(sendMsg);
    } catch (error) {
        console.error(error);
        res.json({ error: 'Something went wrong' });
    }
});

 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
