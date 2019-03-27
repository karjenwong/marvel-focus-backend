const axios = require("axios");
const md5 = require("md5");

require("dotenv").config();

//Marvel Api stuff
const base_url = "http://gateway.marvel.com/v1/public/";
const privatekey = process.env.MARVELPRIVKEY3;
const publickey = process.env.MARVELPUBKEY3;
const timestamp = +new Date();
const hash =
  "&ts=" +
  timestamp +
  "&apikey=" +
  publickey +
  "&hash=" +
  md5(timestamp + privatekey + publickey);
const parameter = "characters";

//Callback Functions
const axiosOneCall = (q, callBack) => {
  axios
    .get(base_url + parameter + "?nameStartsWith=" + q + hash)
    .then(response => {
      if (
        response.data.data.total === 0 ||
        response.data.data.results[0].thumbnail.path.slice(-19) ===
          "image_not_available"
      ) {
        callBack("image not available");
      } else
        callBack({
          name: response.data.data.results[0].name,
          description: response.data.data.results[0].description,
          thumbnail: response.data.data.results[0].thumbnail.path,
          url: response.data.data.results[0].urls[0].url
        });
    })
    .catch(err => callBack(err));
};

const axiosMultiCall = (queryArray, callBack) => {
  const promises = [];
  const responses = [];

  for (let i = 0; i < queryArray.length; i++) {
    promises.push(
      axios.get(
        base_url + parameter + "?nameStartsWith=" + queryArray[i].trim() + hash
      )
    );
  }

  axios
    .all(promises)
    .then(
      axios.spread((...calls) => {
        for (let i = 0; i < calls.length; i++) {
          responses.push(calls[i].data.data.results);
        }
        let filterResponse = responses
          .filter(item => item.length !== 0)
          .filter(item => {
            return item[0].thumbnail.path.slice(-19) !== "image_not_available";
          });
        callBack({
          name: filterResponse[0][0].name,
          description: filterResponse[0][0].description,
          thumbnail: filterResponse[0][0].thumbnail.path,
          url: filterResponse[0][0].urls[0].url
        });
      })
    )
    .catch(err => console.log(err));
};

const searchResults = (q, callBack) => {
  axios
    .get(base_url + parameter + "?nameStartsWith=" + q + hash)
    .then(response => {
      callBack(response.data);
    })
    .catch(err => callBack(err));
};

module.exports = { axiosOneCall, axiosMultiCall, searchResults };
