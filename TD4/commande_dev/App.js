"use strict";

const express = require("express");
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');

//const datas = require('./tools/Datas');

const Commande = require('./classes/Commande');

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

    Commande.all()
      .then(commandes => {
        commandes ? res.json(commandes) : res.status(404).send(http.error(404))
      })
      .catch(() =>{
        res.status(500).send(http.error(500))
      })
});

// Récupération d'une commande par son ID
app.get("/commandes/:id", (req, res) => {

    Commande.find(req.params.id)
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

  const commande = new Commande(req.body);
  commande.save()
      .then(() => {
          const loc = 'localhost:19080/commandes/' + commande.id;
          res.status(201).location(loc).json(commande)
      })
      .catch((error) => {
          console.log(error);
          res.status(500).send(http.error(500))
      })
});

/******
 *
 * Méthode PUT
 *
 ******/


app.put('/commandes/:id', (req, res) => {

  const putDatas = req.body;
  Commande.find(req.params.id)
      .then(datas => {
          const commande = new Commande(datas);
          return commande.update(putDatas)
      })
      .then((com) => {
          res.status(200).json(com)
      })
      .catch((error) => {
          console.log(error);
          res.status(500).send(http.error(500))
      })
});

/******
 *
 * Listening
 *
 ******/
app.listen(PORT);
