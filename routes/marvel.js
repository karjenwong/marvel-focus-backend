const express = require("express");
const router = express.Router();

const {
  axiosOneCall,
  axiosMultiCall,
  searchResults
} = require("./marvelFunctions");

router.post("/", (req, res) => {
  //transform data?
  const characterData = query => {
    if (query.includes("/")) {
      let checkformany = query.split("/");
      axiosMultiCall(checkformany, result => {
        res.json(result);
      });
    } else
      axiosOneCall(query, result => {
        res.json(result);
      });
  };

  characterData(req.body.character);
});

router.post("/search", (req, res) => {
  const characterData = query => {
    searchResults(query, result => {
      if (result.data.total !== 0) {
        res.json(result.data.results);
      } else {
        res.json({ response: "no results" });
      }
    });
  };

  characterData(req.body.character);
});

module.exports = router;
