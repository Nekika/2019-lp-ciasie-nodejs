"use strict";

const express = require("express");
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');
const datas = require('./tools/Datas');

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
  const commande = commande(req.body.mail_client, req.body.montant);

  const sql = "INSERT INTO commande(id, mail_client, date_commande, montant) VALUES (?, ?, ?, ?)";
  const values = datas.values(commande);
  db.query(sql, values, function (error, result) {
    if (!error){
      const uri = `http://localhost:19080/commandes/${commande.id}`;
      const response = http.success(201);
      response.location = uri;
      res.location(uri).status(201).send(commande);
    }
    else{
      console.log(error);
      res.send('oupsi')
    }
  })
});

/******
 *
 * Méthode PUT
 *
 ******/


app.put('/commandes/:id', (req, res) => {
  let sql = "SELECT * FROM commande WHERE id = ?";
  db.query(sql, req.params.id, (error, result) => {
    if (!error){
      let commande = result[0];
      if (commande){
        const keys = datas.keys(req.body);
        const values = datas.values(req.body);
      }
      else{
        res.status(404).send(http.error(404))
      }
    }
    else{
      res.status(500).send(http.error(500))
    }
  });
});

/******
 *
 * Listening
 *
 ******/
app.listen(PORT);
