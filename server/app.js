const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.post('/api/upload', async (req, res) => {
    const { base64Image, imageName } = req.body;
    if (!base64Image || !imageName) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    console.log(`Received image: ${imageName}, Size: ${base64Image.length} bytes`);
    const ai = new GoogleGenAI({});

    const contents = [
        {
            inlineData: {
                mimeType: "image/png",
                data: base64Image,
            },
        },
        {
            text: `
You are an expert in Digital Signal Processing.

The image above contains a mathematical expression representing a signal x(t) or x[n].

Your task:
1. Determine if the image contains a valid signal equation.
2. If it is valid, evaluate whether the signal exhibits the following properties:
   - Linearity
   - Time Invariance
   - Causality
   - Stability
   -Invertibility
   - Periodicity
   - Energy Signal
   - Power Signal
3. Output only TRUE or FALSE for each property.
4. If the image does not contain a valid signal or mathematical expression, output:
   "INVALID SIGNAL"
5. Format your response strictly as a JSON array as shown belowa and dont include "json" text and backticks in output:,

The output must be in  (and nothing else):

[
  {Valid Image: true/false},
  {Linearity: true/false},
  {TimeInvariance: true/false},
 { Invertibility:true/false},
  {Causality: true/false},
  {Stability: true/false},
  {Periodicity: true/false},
 {EnergySignal: true/false},
  {PowerSignal: true/false}
        ]

If invalid, respond only with:
[{
  "Valid Image": false
        }]
`,
        },
    ];



    async function main() {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents,
        });
        console.log("AI Response:", response.text);

        res.status(200).json({ message: 'Image received successfully', response: response.text });
    }

    await main();

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});