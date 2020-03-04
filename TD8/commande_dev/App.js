"use strict";

const express = require("express");
const parser = require('body-parser');
const crypto = require("crypto");
const http = require('./tools/HTTPCodes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const cors = require('cors');

const Item = require('./classes/Item');
const Commande = require('./classes/Commande');
const Client = require('./classes/Client');
// Constantes
const PORT = 8080;

// App
const app = express();
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

/**
 * Récupération de toutes les commandes
 * URL de test : localhost:19080/commandes
 */
app.get("/commandes", (req, res) => {
  Commande.all()
    .then(commandes => {
      commandes ? res.json(commandes) : res.status(404).send(http.error(404))
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(http.error(500))
    })
});

/**
 * Récupération d'une commande
 * URL de test : localhost:19080/commandes/cdf6302b-940b-4348-b913-3cb2052bf042
 * token : 543fc479e422715feb9562809cdd9ca54528426fae2ec0ff2382a32b937555c3
 */
app.get('/commandes/:id', (req, res) => {
  // recurpere l'autorization token soit dans l'url soit dans le header
  let token = req.query.token ? req.query.token : req.headers.authorization;
  if (!token) return res.status(401).send(http.error(401));

  // recuepere la commande correspondant à l'id
  const id = req.params.id;
  Commande.find(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send(http.error(404));
      }

      // Si le token fourni ne correspond pas a la commande on renvoit "forbidden"
      if (result.token !== token) return res.status(403).send(http.error(403));
      // mise en page de la réponse
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
      
      // Recupère tous les items de la commande
      Item.findByCommande(id).then((result) => {
        if (!result) {
          return res.status(404).send(http.error(404));
        }
        result.forEach((item) => {
          // ajoute les items dans l'output
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

/**
 * Permet de créer une commande
 * URL de test : localhost:19080/commandes
 * {
 *  "nom": "Andrée Ledoux",
 *  "mail": "Andrée.Ledoux@club-internet.fr",
 *  "livraison": {
 *  "date": "2021-12-7",
 *  "heure": "12:30:00"
 * },
 * "id": "e3786989-e0d2-4cfb-a72f-455ca4a16beb",
 * "montant": 10
 * }
 * token (optionnel): voir la route post/clients/:idClient/auth pour le générer
 */
app.post('/commandes', (req, res) => {
  // recupére les informations fourni par l'utilisateur
  const commande = new Commande(req.body);

  //genere un token pour la commande
  const hash = crypto.randomBytes(16).toString('hex');
  commande.token = hash;

  const client_id = req.body.client_id;
  const auth_token = req.headers.authorization.split(' ')[1];
  const privateKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');

  //construction du resultat
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

  // Si le user veut créer une commande fidélisé
  // On recupère l'id du client et le token de verification (creer lors de l'authentification)
  if (client_id && auth_token) {
    // On verfifie le token
    const decoded = jwt.verify(auth_token, privateKey);
    if (!decoded || !decoded.id || Number(decoded.id) !== Number(client_id)) {
      return res.status(401).send(http.error(401, 'Invalid auth token'));
    }

    //On recupere le client
    Client.find(client_id)
      .then((client) => {
        // On verfie que le client correpsond au token
        if (client) {
          //on  associe la commande au client
          commande.client_id = client_id;
          doc.commande.client_id = client_id;

          //on met a jour le montant cumule du client
          client.cumul_achats += commande.montant;
          (new Client(client)).update(client);
        }

        //On enregistre la commande
        commande.save()
          .then(() => {
            res.status(201).json(doc);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send(http.error(500))
          });
        console.log('9');
      })
      .catch(err => {
        throw err;
      });
  } else {
    //On enregistre la commande sans l'associer à un client
    commande.save()
    .then(() => {
      res.status(201).json(doc);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(http.error(500))
    });
    console.log('10');
  }
});

/******
 *
 * Méthode PUT
 *
 ******/

/**
 * Met à jour les données d'une commande
 * URL de test : localhost:19080/commandes/cdf6302b-940b-4348-b913-3cb2052bf042	
 * body :
 * {
 * "nom": "Mirador",              (c'est ici qu'on effectue un changement)
 * "mail": "Dubois@free.fr",
 * "livraison": {
 * "date": "2019-11-08",
 * "heure": "16:56:15"
 * },
 * "id": "e3786989-e0d2-4cfb-a72f-455ca4a16beb",
 * "token":
 * "543fc479e422715feb9562809cdd9ca54528426fae2ec0ff2382a32b937555c3",
 * "montant": 40.25
 * }
 *
 */
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



/**
 * Permet l'authentification d'un client
 * Renvoie un token de securité contenant l'id du client
 * 
 * Avant d'executer, mettre à jour le mot de passe de l'utilisateur 59
 * hash de 'test' + privateKey = $2b$08$OIkCl6.2qQMz7TpbFVoS/O6b8O7ERe95wZbAW7qXjH5QsurPEJDvm
 *
 * URL de test : localhost:19080/clients/59/auth
 * Authorization
 *  Username: Andrée.Ledoux@club-internet.fr
 *  Password: test
 * 
 */
app.post('/clients/:idClient/auth', (req, res) => {
  // Clé secrète utiliser dans bcrypt et jwt
  const privateKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');

  /* Pour generer un mot de passe */
  // const pwd = 'test' + privateKey;
  // const saltRounds = 8;
  // const hash = bcrypt.hashSync(pwd, saltRounds);
  // console.log(hash);
  // prendre le hash

  // recupère les infos de connexion en base 64
  const tokenBase64 = req.headers.authorization.split(' ')[1];
  if (!tokenBase64) {
    console.log("1");
    res.status(401).send(http.error(401));
    return;
  }

  // conversion de base64 à texte
  const credentials = Buffer.from(tokenBase64, 'base64').toString('utf-8');
  const [login, password] = credentials.split(':');

  // Cherche le client correspondant à l'id dans l'url
  Client.find(req.params.idClient)
    .then((user) => {
      if (!user) {
        console.log("2");
        res.status(401).send(http.error(401));
        return;
      }

      //verfie l'email avec l'utilisateur trouv"
      if (login !== user.mail_client) {
        console.log("3");
        res.status(401).send(http.error(401));
        return;
      }

      //verifie le mot de passe entré
      bcrypt.compare(password + privateKey, user.passwd, (err, same) => {
        console.log('4')
        if (err) {
          throw err;
        }
        if (!same) {
          console.log('!=')
          res.status(401).send(http.error(401));
          return;
        }

        //information à signer dans le token
        const toSign = {
          id: user.id
        };
        
        //création et envoie du token
        const token = jwt.sign(toSign, privateKey, { algorithm: 'HS256' });
        res.send({ token: token });
      });
    })
    .catch((err) => {
      throw err;
    })
});

/**
 * Montre le profil d'un client s'il est connecté
 * 
 * URL de test : localhost:19080/clients/59
 * token : voir la route post/clients/:idClient/auth pour le générer
 */
app.get('/clients/:id', (req, res) => {
  //recupere la cle privee pour bcrypt et jwt
  const privateKey = fs.readFileSync('./jwt_secret.txt', 'utf-8');

  //recupere le token de verification (fourni lors de l'authentification)
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(401).send(http.error(401, "No authorization token"));
    return;
  }

  //recupere l'id du client dna sl'url
  const idClient = req.params.id;

  //verifify le token
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      throw err;
    }

    // Si l'id dans le token ne correspond pas on renvoie 401
    if (!decoded || !decoded.id || Number(idClient) !== Number(decoded.id)) {
      res.status(401).send(http.error(401, 'Invalid token'));
      return;
    }

    //Si ca correspond, on recupere le client associé
    Client.find(idClient)
      .then((user) => {
        if (!user) {
          res.status(404).send(http.error(404));
          return;
        }

        //envoie des infos du client
        return res.json({
          user: {
            id: user.id,
            nom_client: user.nom_client,
            mail_client: user.mail_client,
            cumul_achats: user.cumul_achats,
          }
        });
      })
      .catch((err) => {
        throw err;
      });
  });
});

// Renvoie une erreur "Bad Request" car la route n'a pas été trouvé
app.all('*', (req, res) => {
  res.status(400).send(http.error(400))
});

// Renvoie une erreur 500 si une erreur est throwed
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
