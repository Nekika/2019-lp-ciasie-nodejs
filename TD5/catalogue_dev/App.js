"use strict";
const db = require('./mongo/mongo');
const express = require('express');
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');

const Sandwich = require('./classes/Sandwich');

const PORT = 8080;

const app = express();
app.use(parser.json());


/* ----------------- Routing  ----------------- */

/******
*
* Méthode GET
*
******/

// Root
app.get("/", (req, res) => {
    res.status(403).send(http.error(403))
});

app.listen(PORT, ()=> {
    db.connect('mongodb://mongodb/mongo', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        console.log(data);
    });
});

app.get("/categorie/:id/sandwich", (req, res) => {
    res.send(Sandwich.findByCategorie(req.params.id))
})



// app.all('*', (req, res) => {
//     res.status(400).send(http.error(400))
// });

// app.use((error, req, res, next) => {
//     res.status(500).send(http.error(500))
// });
