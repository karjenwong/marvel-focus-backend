const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const marvel = require("./routes/marvel");
const movie = require("./routes/movie");
const youtube = require("./routes/youtube");
const test = require("./routes/test");
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + "./../build"));
app.use("/marvel", marvel);
app.use("/movie", movie);
app.use("/youtube", youtube);
app.use("/test", test);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
