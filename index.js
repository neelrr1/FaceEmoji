const express = require('express')
const app = express()
const port = 3000

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

const fs = require('fs');
const imgBase64 = fs.readFileSync('./base64test.txt').toString()
// console.log(imgBase64)
    
// Creates a client
const client = new vision.ImageAnnotatorClient();
client.auth._getApplicationCredentialsFromFilePath("./auth.json")

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/faceDetect/:image', async (req, res) => {
    
    const request = {
        image: {
            content: imgBase64
        }
    }
    const [result] = await client.faceDetection(request);
    // console.log(result)
    const faces = result.faceAnnotations;
    
    const out = []
    faces.forEach(face => {
        out.push(face.boundingPoly)
    })

    res.send(out)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))