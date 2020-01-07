"use strict";

const express = require('express');
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');

const Commande = require('./classes/Commande');
const Collection = require('./classes/Collection');

const PORT = 8080;

const app = express();
app.use(parser.json());

// Middlewares
app.use("/:request", function (req, res, next) {
    if (req.params.request !== "commandes"){
        res.status(400).send(http.error(400))
    }
    else{
        next()
    }
});

app.use("/:request/:id", function (req, res, next) {
    if (req.params.request !== "commandes"){
        res.status(400).send(http.error(400))
    }
    else{
        next()
    }
});


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

// Récupération de toutes les commandes
app.get("/commandes", (req, res) => {
    Commande.all()
        .then(datas => {
            let commandes = [];
            datas.forEach(commande => {
                commandes.push({
                    commande: {
                        id: commande.id,
                        mail_client: commande.mail_client,
                        date_commande: commande.date_commande,
                        date_livraison: commande.date_livraison,
                        statut: commande.statut
                    },
                    links: {
                        self: {href: "/commandes/" + commande.id}
                    }
                })
            });
            const collection = new Collection(commandes);
            res.json(collection)
        })
        .catch(() =>{
            res.status(500).send(http.error(500))
        })
});

app.listen(PORT);
