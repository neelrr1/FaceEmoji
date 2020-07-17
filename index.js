const express = require('express')
const app = express()
const port = 3000

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

const fs = require('fs');
const img = fs.readFileSync('./face.jpg')
// console.log(imgBase64)
    
// Creates a client
const client = new vision.ImageAnnotatorClient();
client.auth._getApplicationCredentialsFromFilePath("./auth.json")

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/faceDetect', async (req, res) => {
    
    const [result] = await client.faceDetection(img);
    const faces = result.faceAnnotations;
    
    const out = []
    faces.forEach(face => {
        out.push(face.boundingPoly)
    })

    res.send(out)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))