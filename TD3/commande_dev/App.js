"use strict";

const express = require("express");
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');
const datas = require('./tools/Datas');
const date = require('date-and-time');

const commande = require('./classes/Commande');

// Constantes
const PORT = 8080;

// App
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
  commande.all()
      .then(commandes => {
        commandes ? res.json(commandes) : res.status(404).send(http.error(404))
      })
      .catch(() =>{
        res.status(500).send(http.error(500))
      })
});

// Récupération d'une commande par son ID
app.get("/commandes/:id", (req, res) => {
  commande.find(req.params.id)
      .then(commande => {
        commande ? res.json(commande) : res.status(404).send(http.error(404))
      })
      .catch(() => {
        res.status(500).send(http.error(500))
      })
});


/******
 *
 * Méthode POST
 *
 ******/

app.post('/commandes', (req, res) => {
  const commande = new commande(req.body.mail_client, req.body.montant);
  commande.save()
      .then(() => {
        const loc = 'localhost:19080/commandes/' + commande.id;
        res.status(201).location(loc).json(commande)
      })
      .catch(() => {
        res.status(500).send(http.error(500))
      })
});

/******
 *
 * Méthode PUT
 *
 ******/


app.put('/commandes/:id', (req, res) => {
  commande.find(req.params.id)
      .then(data => {
        let com = new commande(req.body.mail_client, req.body.montant);
        com.id = data.id;
        return com.update()
      })
      .then((com) => {
        res.status(200).json(com)
      })
      .catch((error) => {
        console.log(error.message);
        res.status(error.code).send(http.error(error.code))
      })
});

/******
 *
 * Listening
 *
 ******/
app.listen(PORT);
