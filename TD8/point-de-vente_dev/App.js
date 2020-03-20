"use strict";

const express = require('express');
const parser = require('body-parser');

const http = require('./tools/HTTPCodes');

const Collection = require('./classes/Collection');
const Commande = require('./classes/Commande');
const Item = require('./classes/Item');

const PORT = 8080;

const app = express();
app.use(parser.json());


/* ----------------- Routing  ----------------- */

/******
*
* Méthode GET
*
******/

/**
 * Racine - Accés non autorisé
 * URL de test : http://localhost:19280/
 */
app.get("/", (req, res) => {
    res.status(403).send(http.error(403));
});

/**
 * Liste des commandes
 * Possibilité de pagination avec les argument page et size
 * URL de test : http://localhost:19280/commandes?page=1&?size=2
 * 
 * @api {get} /commandes Liste des commandes
 * @apiName GetCommandes
 * @apiGroup Commandes
 * 
 * @apiSuccess {Commandes} Commandes Listes des commandes
 */
app.get("/commandes", (req, res) => {
    if (req.query.statut){
            if(size > 100) size = 100;
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

/**
 * Détails d'une commande
 * URL de test : http://localhost:19280/commandes/cdf6302b-940b-4348-b913-3cb2052bf042
 * 
 * @api {get} /commandes/:id Commandes par son ID
 * @apiName GetCommandeById
 * @apiGroup Commandes
 * 
 * @apiParam (URI) {UUID} id Id de la commande
 * 
 * @apiSuccess {Commande} commande Informations de la commande (id, livraison, nom, mail, montants, items)
 * @apiError 404 L'id ne correspond à aucune commande
 */
app.get('/commandes/:id', (req, res) => {
    const id = req.params.id;
    Commande.find(id)
    .then((result) => {
        if(!result) {
            return res.status(404).send(http.error(404));
        }
        // mise en page du retour
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
                items: []
            }
        };
        Item.findByCommande(id).then((result) => {
            if(!result) {
                return res.status(404).send(http.error(404));
            }
            result.forEach((item) => {
                const toadd = {
                    uri: item.uri,
                    libelle: item.libelle,
                    tarif: item.tarif,
                    quantite: item.quantite,
                }
                output.command.items.push(toadd)
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

/**
 * Renvoie une erreur 'Bad request' car la route n'a pas été définie
 */
app.all('*', (req, res) => {
    res.status(400).send(http.error(400))
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send(http.error(500))
});

app.listen(PORT);
