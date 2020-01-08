"use strict";

const express = require('express');
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');

const Collection = require('./classes/Collection');

const PORT = 8080;

const app = express();
app.use(parser.json());

// Middlewares
app.use("/:request", function (req, res, next) {
    const queries = Object.keys(req.query);
    if (req.params.request !== "commandes"){
        res.status(400).send(http.error(400))
    }
    else if(queries.length === 0){
        next()
    }
    else if(queries.length === 1 && (queries[0] === 'statut' || queries[0] === 'page')){
        next( )
    }
    else if(queries.length === 2 && queries.includes('size') && queries.includes('page')){
        next()
    }
    else{
        res.status(400).send(http.error(400))
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

app.listen(PORT);
