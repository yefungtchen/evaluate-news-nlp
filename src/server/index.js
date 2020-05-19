// const dotenv = require('dotenv');
// dotenv.config();
// console.log("API Keys")
// console.log(`Your API id is ${process.env.API_ID}`);
// console.log(`Your API key is ${process.env.API_KEY}`);
var path = require("path");

const mockAPIResponse = require("./mockAPI.js");

// Aylien API
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
  application_id: "", // works hardcoded
  application_key: "" // works hardcoded
});

// Requires Express to run server and routes
const express = require("express");
const app = express();

/** Initialize the main project folder
 *   This line of code connects our server-side code (the code in the server/index.js file)
 *   to our client-side code (the browser code written in the files housed in the dist folder).
 **/
app.use(express.static("dist"));
// Configuring that express use cors
const cors = require("cors");
app.use(cors());

/** Middleware
 *   "body-parser extract the entire body portion of an incoming request stream and exposes it on req.body."
 *   (Source: https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express)
 **/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(__dirname);

// Setting up the GET route (Client takes data from Server)
app.get("/", function (req, res) {
  console.log("Yo Bitch");
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// Setting up the POST Route (Client sending data to Server)
app.post("/sendText", function (req, res) {
  // https://docs.aylien.com/textapi/sdks/#node-js-sdk
    textapi.sentiment({
      'url': req.body.url
    }, function (error, response) {
      if (error === null) {
        console.log("Success: You got the Aylien results");
        res.send();
        console.log(res);
      } else {
        console.log("Error: Aylien request not successful");
        console.log(error);
        return;
      }
    });
});