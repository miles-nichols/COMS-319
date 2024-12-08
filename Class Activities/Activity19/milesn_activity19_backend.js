/*
Miles Nichols
milesn@iastate.edu
11/18/2024
*/

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/robots", async (req, res) => {
    await client.connect();
    const query = {};
    const results = await db
        .collection("robots")
        .find(query)
        .limit(100)
        .toArray();
    res.status(200);
    res.send(results);
});

app.get("/robot/:id", async (req, res) => {
    const robotId = Number(req.params.id);
    await client.connect();
    const query = { id: robotId };
    const results = await db.collection("robots").findOne(query);
    if (!results)
        res.send("Not Found").status(404);
    else
        res.send(results).status(200);
});

app.post("/robot", async (req, res) => {
    try {
        await client.connect();
        const newDocument = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        };
        const existingDoc = await db.collection("robots").findOne({ id: newDocument.id });
        if (existingDoc) {
            return res.status(409).send({ error: "Conflict: A robot with this ID already exists." });
        }
        const results = await db.collection("robots").insertOne(newDocument);
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete("/robot/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        const query = { id: id };
        const robotToDelete = await db.collection("robots").findOne(query);
        if (!robotToDelete) {
            res.status(404).send({ message: "Robot not found" });
            return;
        }
        const results = await db.collection("robots").deleteOne(query);
        if (results.deletedCount === 1) {
            res.status(200).send({ message: "Robot deleted successfully", robot: robotToDelete });
        } else {
            res.status(500).send({ message: "Failed to delete the robot" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.put("/robot/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        const query = { id: id };
        const updateData = {
            $set: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
            },
        };
        const results = await db.collection("robots").updateOne(query, updateData);
        if (results.matchedCount === 0) {
            res.status(404).send({ message: "Robot not found" });
            return;
        }
        const updatedRobot = await db.collection("robots").findOne(query);
        res.status(200).send({ message: "Robot updated successfully", robot: updatedRobot });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
