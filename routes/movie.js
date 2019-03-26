const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const api_key = "?api_key=" + process.env.MOVIEDBKEY;

//movie id is 299537 for captain marvel

router.post("/", (req, res) => {
  let query = req.body.movie;

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie${api_key}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    .then(response => {
      res.json({
        movieTitle: response.data.results[0].title,
        poster:
          "https://image.tmdb.org/t/p/original" +
          response.data.results[0].poster_path,
        dbId: response.data.results[0].id,
        overview: response.data.results[0].overview,
        release_date: response.data.results[0].release_date
      });
    });
});

//Get list of characters from movie
router.post("/character", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${req.body.movieId}/credits${api_key}`
    )
    .then(response => {
      const characterList = response.data.cast.map(item => {
        return {
          character: item.character,
          actor: item.name,
          actor_img: "https://image.tmdb.org/t/p/w200" + item.profile_path
        };
      });
      res.json(characterList.slice(0, 10));
    })
    .catch(err => console.log(err));
});

module.exports = router;
