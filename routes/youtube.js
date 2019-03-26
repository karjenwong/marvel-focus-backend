const express = require('express')
const router = express.Router()
const axios = require('axios')
require('dotenv').config()

router.post('/', (req, res) => {
    const base_url = "https://www.googleapis.com/youtube/v3/search"
    const api_key = "&key="+process.env.YOUTUBEKEY
    
    const channelName = "marvel entertainment"
    const channelSearchParameters = `?part=snippet&q=${channelName}&type=channel`

    const movieName = req.body.movie
    const movieSearchParameters = `?part=snippet&q=${movieName}+trailer&order=viewCount&type=video&videoDefinition=high&videoEmbeddable=true`

    axios.get(`${base_url}${channelSearchParameters}${api_key}`)
        .then(response => response.data.items[0].id.channelId)
        .then(channelId => {            
            axios.get(`${base_url}${movieSearchParameters}${api_key}`)
                .then(response => {
                    let trailerInfo = response.data.items.find(test => {
                        return test.snippet.channelId===channelId 
                    })
                    res.json(trailerInfo)
                })
        })
        .catch(error => console.log(error))

})

module.exports = router