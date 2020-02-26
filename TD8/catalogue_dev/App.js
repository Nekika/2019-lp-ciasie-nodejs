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
        res.status(200).json(result);
    });
});


app.get("/categories/:id/sandwichs", (req, res) => {
    Categorie.find({ id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(500).send(http.error(500));
        }
        if (categorie.length !== 1) {
            return res.status(404).send(http.error(404));
        }
        const categorieName = categorie[0].nom;
        Sandwich.find({ categories: categorieName }, (err, sandwiches) => {
            if (err) {
                res.status(500).send(http.error(500));
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

//récupération de toutes les catégories
app.get("/categories/:id", (req, res) => {
    Categorie.find({id : req.params.id}, (err, result) => {
        if (err) {
            res.status(500).send(http.error(404));
        }
        if (result.length !== 1) {
            return res.status(404).send(http.error(404));
        }
        const categorie = {
            type: "ressource",
            date: new Date().toLocaleDateString(),
            categorie: result[0],
            links: {
                sandwichs: {
                    href: `${req.originalUrl}/sandwichs`,
                },
                self: {
                    href: `${req.originalUrl}/`,
                }
            }
        }
        res.status(200).json(categorie);
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
