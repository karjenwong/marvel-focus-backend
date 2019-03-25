const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
const bodyParser = require('body-parser')
const marvel = require('./routes/marvel')
const movie = require('./routes/movie')
const youtube = require('./routes/youtube')
app.use(bodyParser.json())
app.use(cors())


app.use('/marvel', marvel)
app.use('/movie', movie)
app.use('/youtube', youtube)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})