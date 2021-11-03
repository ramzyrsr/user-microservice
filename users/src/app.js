require('dotenv').config();

const express = require('express');
const cors = require('cors');

const users = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", users);

app.all('*', (req, res) => 
    res.send("You've tried reaching a route that doesn't exist.")
);


module.exports = app;