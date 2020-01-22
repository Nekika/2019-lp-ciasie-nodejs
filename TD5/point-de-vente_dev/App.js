"use strict";

const express = require('express');
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');

const Collection = require('./classes/Collection');

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

// Récupération de toutes les commandes
app.get("/commandes", (req, res) => {
    if (req.query.statut){
        Collection.filteredByStatut(req.query.statut).then(collection => { res.json(collection) })
    }
    else if (req.query.page){
        let size = req.query.size;
        if (typeof size === 'string'){
            size =  Number.parseInt(size, 10)
        }
        Collection.filteredByPage(req.query.page, size).then(collection => { res.json(collection) })
    }
    else{
        Collection.all().then(collection => { res.json(collection) })
    }
});

app.all('*', (req, res) => {
    res.status(400).send(http.error(400))
});

app.use((error, req, res, next) => {
    res.status(500).send(http.error(500))
});

app.listen(PORT);
