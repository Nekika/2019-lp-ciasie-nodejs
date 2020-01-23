"use strict";

const express = require("express");
const mysql = require("mysql");
const parser = require('body-parser');
const date = require('date-and-time');

const db = mysql.createConnection({
  host: "mysql.commande",
  user: "command_lbs",
  password: "command_lbs",
  database: "command_lbs"
});

// Constantes
const PORT = 8080;

const buildBody = (type, code, message) => {
  body.type = type;
  body.code = code;
  body.message = message;
};

const buildError = (code) => {
  let message = null;
  switch (code) {
    case 400:
      message = "L'URI indiquée n'est pas connue de l'API";
      break;
    case 403:
      message = "Accès non authorisé";
      break;
    case 404:
      message = "Ressource non disponible";
      break;
    case 405:
      message = "Méthode non authorisée";
      break;
    case 500:
      message = "Erreur interne au serveur";
      break;

  }
  buildBody("Error", code, message);
};

// Variables
let body = {
  type: null,
  code: null,
  message: null
};

// App
const app = express();
app.use(parser.json());




/* ----------------- Routing  ----------------- */



/******
 *
 * Méthodes GET
 *
 ******/

// Root
app.get("/", (req, res) => {
  buildError(403);
  res.status(403).send(body)
});

// Récupération de toutes les commandes
app.get("/commandes", (req, res) => {
    const sql = "SELECT * FROM commandes";
    db.query(sql, (error, result) => {
      if (!error){
        res.json(result)
      }
      else{
        buildError(500);
        res.status(500).send(body)
      }
    })
});

// Récupération d'une commande par son ID
app.get("/commandes/:id", (req, res) => {
    const sql = "SELECT * FROM commandes WHERE id = ?";
    db.query(sql, req.params.id, (error, result) => {
      if (!error){
        const command = result[0];
        if (!command){
          buildError(404);
          res.status(404).send(body);
        }
        res.send(command)
      }
      buildError(500);
      res.status(500).send(body)
    })
});


/******
 *
 * Méthodes POST
 *
 ******/

app.post('/commandes', (req, res) => {
    const data = req.body;
    data.date_commande = date.format(new Date(), 'YYYY-MM-DD');
    data.id = "zinzin-123";
    const query = "INSERT INTO commandes VALUES (?, ?, ?, ?)";
    const queryValues = [
        data.id,
        data.mail_client,
        data.date_commande,
        data.montant
    ];
    db.query(query, queryValues, function (error, result) {
      if (!error){
        buildBody("sucess", 201, "La donnée a été insérée avec succès");
        res.status(201).send(body);
      }
      else{
        res.status(9999).send('oupsi')
      }
    })
});


app.all('*', (req, res) => {
  res.status(400).json({
      "type": "error",
      "error": 400,
      "message": "l'uri n'existe pas"
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  if(error) {
    return res.status(500).json({
      "type": "error",
      "error": 500,
      "message": "Erreur interne"
    });
  }
});


app.all('*', (req, res) => {
  res.status(400).send(http.error(400))
});

app.use((error, req, res, next) => {
  res.status(500).send(http.error(500))
});

/******
 *
 * Listening
 *
 ******/
app.listen(PORT);
