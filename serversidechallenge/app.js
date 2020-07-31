var express = require("express");
var app = express();

const country = require('./countries.json');
const results = require('./searchResults.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(8006, () => {
    console.log("Server running on port 8000");
})

app.get("/countries", (req, res, next) => {
    res.json(country);
    })

app.get("/results", (req, res, next) => {
    res.json(results);
})