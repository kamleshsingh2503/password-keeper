const express = require("express");
const router = require("./router");
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods : GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
    next();
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
    });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("This is the home page");
})

app.use("/app", router);

app.listen(3000, () => {
    console.log("Server running on port 3001");
})