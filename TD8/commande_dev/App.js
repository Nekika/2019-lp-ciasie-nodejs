"use strict";

const express = require("express");
const parser = require('body-parser');
const crypto = require("crypto");
const http = require('./tools/HTTPCodes');
const cors = require('cors');

const Item = require('./classes/Item');
const Commande = require('./classes/Commande');

// Tools
const Data = require('./tools/Data');

// Constantes
const app = express()
const PORT = 3000;

// Middleware
app.use(parser.json());
app.use(cors());


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
app.get('/commandes/:id', (req, res) => {
    let token = req.query.token ? req.query.token : req.headers.authorization;
    if (!token) return res.status(401).send(http.error(401));
    const id = req.params.id;
    Commande.find(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send(http.error(404));
            }
            if(result.token !== token) return res.status(403).send(http.error(403));
            const output = {
                type: "resources",
                links: {
                    self: `/commandes/${id}`,
                    items: `/commandes/${id}/items`
                },
                command: {
                    id: id,
                    created_at: result.created_at,
                    livraison: result.livraison,
                    nom: result.nom,
                    mail: result.mail,
                    montant: result.montant,
                    token: result.token,
                    items: []
                }
            };
            Item.findByCommande(id).then((result) => {
                if (!result) {
                    return res.status(404).send(http.error(404));
                }
                result.forEach((item) => {
                    const toAdd = {
                        uri: item.uri,
                        libelle: item.libelle,
                        tarif: item.tarif,
                        quantite: item.quantite,
                    }
                    output.command.items.push(toAdd)
                })
                return res.json(output);

            }).catch((error) => {
                throw new Error(error);
            });
        })
        .catch((error) => {
            throw new Error(error);
        });
});

/******
 *
 * Méthode POST
 *
 ******/

app.post('/commandes', (req, res) => {
  if (!Data.isValid(data))  {
      res.send('data invalid')
  } else {
      const commande = new Commande(req.body);
      const hash = crypto.randomBytes(16).toString('hex');
      commande.token = hash;

      commande.save()
          .then(() => {
              const loc = 'localhost:19080/commandes/' + commande.id;
              const doc = {
                  'commande': {
                      nom: commande.nom,
                      mail: commande.mail,
                      livraison: {
                          date: commande.livraison.split(' ')[0],
                          heure: commande.livraison.split(' ')[1],
                      },
                      id: commande.id,
                      token: commande.token,
                      montant: commande.montant,
                  }
              };
              res.status(201).location(loc).json(doc)
          })
          .catch((error) => {
              console.log(error);
              res.status(500).send(http.error(500))
          })
  }
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
