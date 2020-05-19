const dotenv = require('dotenv');
dotenv.config();

var path = require("path");

const mockAPIResponse = require("./mockAPI.js");

// Aylien API
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
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
app.get("/", function (request, response) {
  response.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (request, response) {
  response.send(mockAPIResponse);
});

// Setting up the POST Route (Client sending data to Server)
app.post("/sendText", function (request, response) {
  // https://docs.aylien.com/textapi/sdks/#node-js-sdk
  //   textapi.sentiment({
  //     'text': 'John is a very good football player!'
  //   }, function (error, response) {
  //     if (error === null) {
  //       console.log(response);
  //     } else {
  //       console.log("Hello! Sentiment")
  //     }
  //   });
  // }

  textapi.sentiment({ url: request.body.url }, function (error, results) {
    if (error) {
      console.log("Error: Aylien request not successful");
      console.log()
      results.send();
      return;
    }
    console.log("Success: You got the Aylien results");
    results.send();
  })
});