"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const http = require('./tools/HTTPCodes');

const Categorie = require('./models/Categorie');
const Sandwich = require('./models/Sandwich');
//const datas = require('./tools/Datas');

// Constantes
const PORT = 8080;

// App
const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());


//connexion à la bdd mongo
mongoose.connect("mongodb://mongo.cat:dbcat/catalogue", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* ----------------- Routing  ----------------- */

//récupération de toutes les catégories
app.get("/categories", (req, res) => {
    Categorie.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        console.log(result);
        res.status(200).json(result);
    });
});


app.get("/categories/:id/sandwichs", (req, res) => {
    Categorie.find({ id: req.params.id }, (err, categorie) => {
        if (err) {
            res.status(500).send(err);
        }
        const categorieName = categorie[0].nom;
        Sandwich.find({ categories: categorieName }, (err, sandwiches) => {
            if (err) {
                res.status(500).send(err);
            }
            const collection = {
                type: "collection",
                count: sandwiches.length,
                sandwiches: [],
            };
            sandwiches.forEach((sandwich)=>{
                collection.sandwiches.push({
                    sandwich: sandwich
                });
            })
            res.status(200).json(collection);
        });
    });
});


/******
 *
 * Méthode GET
 *
 ******/

// Root
app.get("/", (req, res) => {
    res.status(403).send(http.error(403))
});



app.all('*', (req, res) => {
    res.status(400).send(http.error(400))
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send(http.error(500))
});

/******
 *
 * Listening
 *
 ******/
app.listen(PORT);
