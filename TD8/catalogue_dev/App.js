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

/**
 * récupération de toutes les catégories
 * URL de test: localhost:19180/categories
 */
app.get("/categories", (req, res) => {
    Categorie.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(result);
    });
});

/**
 * récupération pour récuperer les sandwichs d'une catégorie selon son id
 * URL de test: localhost:19180/categories/2/sandwichs
 */
app.get("/categories/:id/sandwichs", (req, res) => {
    // On recuperer la catégorie avec l'id correspondant
    Categorie.find({ id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(500).send(http.error(500));
        }
        if (categorie.length !== 1) {
            return res.status(404).send(http.error(404));
        }

        //Nom de la catergorie utilisé pour la selection des sandwich
        const categorieName = categorie[0].nom;

        // On recupère le sandwich selon le nom de la catégorie
        Sandwich.find({ categories: categorieName }, (err, sandwiches) => {
            if (err) {
                res.status(500).send(http.error(500));
            }
            // mise en page de la réponse
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

/**
 * récupération d'une catégorie selon son id
 * URL de test: localhost:19180/categories/2
 */
app.get("/categories/:id", (req, res) => {
    // On recuperer la catégorie avec l'id correspondant
    Categorie.find({id : req.params.id}, (err, result) => {
        if (err) {
            res.status(500).send(http.error(404));
        }
        if (result.length !== 1) {
            return res.status(404).send(http.error(404));
        }
        // mise en page de la réponse
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


// Renvoie une erreur "Bad Request" car la route n'a pas été trouvé
app.all('*', (req, res) => {
    res.status(400).send(http.error(400))
});

// Renvoie une erreur 500 si une erreur est throw
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
