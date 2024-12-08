var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8081;
const host = "localhost";

app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});

// Root route ("/") returns HTML
app.get("/", (req, res) => {
    res.status(200).send("<h1 style='color:Green;background-color:black;'>Hello World From Node</h1>");
});

// Name route ("/name") returns plain text
app.get("/name", (req, res) => {
    res.status(200).send("My name is Miles");
});

// List robots route ("/listRobots") returns JSON data
app.get("/listRobots", (req, res) => {
    fs.readFile(__dirname + "/robots.json", "utf8", (err, data) => {
        if (err) {
            res.status(404).send("File not found");
        } else {
            res.status(200).send(data);
        }
    });
});

// Person route ("/person") returns JSON object
app.get("/person", (req, res) => {
    const person = {
        name: "alex",
        email: "alex@mail.com",
        job: "software dev"
    };
    res.status(200).send(person);
});
