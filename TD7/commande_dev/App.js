"use strict";

const express = require("express");
const parser = require('body-parser');
const crypto = require("crypto");
const http = require('./tools/HTTPCodes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

const Item = require('./classes/Item');
const Commande = require('./classes/Commande');
const Client = require('./classes/Client');
// Constantes
const PORT = 8080;

// App
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
          }
          res.status(201).location(loc).json(doc)
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

// Auth
app.post('/clients/:idClient/auth', (req, res) => {
  const privateKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');

  // const pwd = 'test' + privateKey;
  // const saltRounds = 8;
  // const hash = bcrypt.hashSync(pwd, saltRounds);


  const tokenBase64 = req.headers.authorization.split(' ')[1];
  if(!tokenBase64) {
    res.status(401).send(http.error(401));
    return;
  }
  const credentials = Buffer.from(tokenBase64, 'base64').toString('utf-8');
  const [login, password] = credentials.split(':');

  Client.find(req.params.idClient)
  .then((user) => {

    if(login !== user.mail_client) {
      res.status(401).send(http.error(401));
      return;
    }
    
    console.log(user);

    if(!user) {
      res.status(401).send(http.error(401));
      return;
    }

    
    bcrypt.compare(password + privateKey, user.passwd, (err, same) => {
      
      if(err) {
        throw err;
      }
      if(!same) {
        res.status(401).send(http.error(401));
        return;
      }
     

      const toSign = {
        id: user.id
      };
      const token = jwt.sign(toSign, privateKey, {algorithm: 'HS256'});
      res.send({token: token});
    });
  })
  .catch(() => {
    res.status(401).send(http.error(401));
    return;
  })
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
