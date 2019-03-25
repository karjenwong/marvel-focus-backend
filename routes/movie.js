const express = require('express')
const router = express.Router()
const axios = require('axios')
require('dotenv').config()
const api_key = "?api_key="+process.env.MOVIEDBKEY

let movieId =299537     //movie id is 299537 for captain marvel

router.get('/', (req, res) => { 
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}${api_key}`)
        .then(response => {
            res.json(response.data)
        })

})
router.get('/character', (req, res) => {

    // get a list of the characters
    
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits${api_key}`)
        .then(response => {
            const characterList = response.data.cast.map(item => {
                return {
                    "character": item.character,
                    'actor': item.name,
                    'actor_img': "https://image.tmdb.org/t/p/w200"+item.profile_path
                  }
            })
            res.json(characterList.slice(0,10))
        })

})

module.exports = router