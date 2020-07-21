const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res) {
    res.redirect('/opencv.html')
})

app.use(express.static(__dirname + '/static'))
app.use('/face.jpg', express.static(__dirname + '/face.jpg'))
app.use('/emoji.png', express.static(__dirname + '/emoji.png'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))