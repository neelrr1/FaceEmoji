const express = require('express')
const app = express()
const port = 3000

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Local filesystem for testing
const fs = require('fs');
const img = fs.readFileSync('./face.jpg')
// console.log(imgBase64)

var multer  = require('multer')
var upload = multer({storage: multer.memoryStorage()})
    
// Creates a client
const client = new vision.ImageAnnotatorClient();
client.auth._getApplicationCredentialsFromFilePath("./auth.json")

app.use('/form', express.static(__dirname + '/index.html'));

app.post('/faceDetect', upload.single('image'), async (req, res) => {

    // TODO: File size limits and file validation?
    // TODO: Consider switching to DiskStorage instead - higher load capability?
    
    if (!req.file) {
        res.status(400).send('No files were uploaded.');
        console.log(req.body)
        return;
    }
        
    const [result] = await client.faceDetection(req.file.buffer);
    const faces = result.faceAnnotations;
    
    const out = []
    faces.forEach(face => {
        out.push(face.boundingPoly)
    })

    res.send(out)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))