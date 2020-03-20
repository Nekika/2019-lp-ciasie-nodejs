define({ "api": [
  {
    "type": "get",
    "url": "/commandes/:id",
    "title": "Commandes par son ID",
    "name": "GetCommandeById",
    "group": "Commandes",
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la commande</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Commande",
            "optional": false,
            "field": "commande",
            "description": "<p>Informations de la commande (id, livraison, nom, mail, montants, items)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>L'id ne correspond à aucune commande</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Commandes"
  },
  {
    "type": "get",
    "url": "/commandes",
    "title": "Liste des commandes",
    "name": "GetCommandes",
    "group": "Commandes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Commandes",
            "optional": false,
            "field": "Commandes",
            "description": "<p>Listes des commandes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Commandes"
  }
] });
