const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const url = "mongodb+srv://muneebned844:(poi980)))@cluster0.v2h3cj2.mongodb.net/";

app.use(cors());
app.use(express.json());

const schema = mongoose.Schema({
    "_id": String,
    "email": String,
    "password": String
});

const model = mongoose.model("afterEidLogin", schema);

mongoose.connect(url);
const db = mongoose.connection;

db.on('open', () => {
    console.log("Connected Successfully")
});

app.listen(8000, () => {
    console.log("Server is listening at 8000");
});

let count = 100;

app.get("/", (req, res) => {
    if (req.query.nameField && req.query.passwordField) {
        model.create({
            "_id": count,
            "email": req.query.nameField,
            "password": req.query.passwordField
        });
        res.send("Record added Successfully");
        count++;
    } else {
        res.send("Email or Password is not correctly typed");
    }
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    let dataOfUsers = await model.find();

    for (let i = 0; i < dataOfUsers.length; i++) {
        console.log(dataOfUsers[i]["email"]);
        console.log(dataOfUsers[i]["password"]);

        if (dataOfUsers[i]["email"] === req.body.nameField && dataOfUsers[i]["password"] === req.body.passwordField) {
            // If login is successful, send the home.html file as response
            return res.sendFile(path.join(__dirname, 'home.html'));
        }
    }

    // If login fails, send an error response
    res.send("Invalid email or password");
});



app.get("/homeNew", (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});
