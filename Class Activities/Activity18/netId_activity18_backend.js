
/* 
Author: Miles Nichols
ISU Netid: milesn@iastate.edu
Date: November 11, 2024
*/

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var { MongoClient } = require("mongodb");

var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8080";
const host = "localhost";
const url = "mongodb://localhost:27017";
const dbName = "secoms3190";
let db;

// Connect to MongoDB before handling any requests
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log("Connected successfully to MongoDB");
        db = client.db(dbName);
        app.listen(port, () => {
            console.log(`App listening at http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });

// Route to get all movies
app.get("/listMovies", async (req, res) => {
    try {
        const results = await db.collection("movie").find({}).limit(100).toArray();
        console.log("Movies retrieved: ", results);  // Log the results
        res.status(200).send(results);
    } catch (err) {
        console.error("Error retrieving movies:", err);
        res.status(500).send("Error retrieving movies");
    }
});


// Route to get a movie by ID
app.get("/listMovies/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const result = await db.collection("movie").findOne({ movieId: movieId });
        if (!result) {
            res.status(404).send("Movie not found");
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving movie");
    }
});
