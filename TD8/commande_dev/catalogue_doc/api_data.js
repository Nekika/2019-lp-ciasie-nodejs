define({ "api": [
  {
    "type": "post",
    "url": "/clients/:id/auth",
    "title": "Authentification d'un client",
    "name": "AuthClient",
    "group": "Clients",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "basic",
            "optional": false,
            "field": "email:password",
            "description": "<p>email et mot de passe de l'utlisateur encodés en base64</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>id du client au authentifier</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Token d'identification du client</p>"
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
            "field": "401",
            "description": "<p>Aucunes données d'authentification dans le header, les données ne correspondent pas au client</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Clients"
  },
  {
    "type": "get",
    "url": "/clients/:id",
    "title": "Profil d'un client",
    "name": "GetClient",
    "group": "Clients",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "bearer",
            "optional": false,
            "field": "token",
            "description": "<p>token d'authentification du client</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>id du client</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "client",
            "description": "<p>Profil du client (id, nom_client, mail_client, cumul_achats)</p>"
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
            "field": "401",
            "description": "<p>Aucun token d'authentification dans le header, le token ne corresponde pas au client</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Clients"
  },
  {
    "type": "get",
    "url": "/commandes/:id",
    "title": "Commande par son id",
    "name": "GetCommandeById",
    "group": "Commandes",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "bearer",
            "optional": false,
            "field": "token",
            "description": "<p>token de vérification de la commande (alternative au passage tu token dans la query string)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>id de la commande</p>"
          }
        ],
        "QUERY": [
          {
            "group": "QUERY",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token de vérification de la commande (alternative au passage du token dans le header Autorization)</p>"
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
            "field": "Commande",
            "description": "<p>Informations de la commande et ses items</p>"
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
            "field": "401",
            "description": "<p>Aucun token n'a été fourni</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Le token est incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>L'id ne correspond pas à une commande</p>"
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
            "description": "<p>Liste des commandes</p>"
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
            "description": "<p>Aucunes commandes récupérées</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Commandes"
  },
  {
    "type": "post",
    "url": "/commandes/",
    "title": "Création d'une commande",
    "name": "PostCommande",
    "group": "Commandes",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "bearer",
            "optional": false,
            "field": "token",
            "description": "<p>token de connexion du client (optionel)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "BODY": [
          {
            "group": "BODY",
            "type": "UUID",
            "optional": false,
            "field": "client_id",
            "description": "<p>id du client (uniquement si token client)</p>"
          },
          {
            "group": "BODY",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>nom et prenom du client</p>"
          },
          {
            "group": "BODY",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>email du client</p>"
          },
          {
            "group": "BODY",
            "type": "Object",
            "optional": false,
            "field": "livraison",
            "description": "<p>date de livraison { &quot;date&quot;: &quot;YYYY-MM-DD&quot;, &quot;heure&quot;: &quot;HH:MN:SS&quot;}</p>"
          },
          {
            "group": "BODY",
            "type": "Number",
            "optional": false,
            "field": "montant",
            "description": "<p>montant de la commande</p>"
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
            "field": "Commande",
            "description": "<p>Informations de la nouvelle commande, notamment son token de verification</p>"
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
            "field": "401",
            "description": "<p>Le token fourni ne correspond pas au client</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Commandes"
  },
  {
    "type": "put",
    "url": "/commandes/:id",
    "title": "Mise à jour d'une commande",
    "name": "PutCommande",
    "group": "Commandes",
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>id de la commande à modifier</p>"
          }
        ],
        "BODY": [
          {
            "group": "BODY",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>nom et prenom du client</p>"
          },
          {
            "group": "BODY",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>email du client</p>"
          },
          {
            "group": "BODY",
            "type": "Object",
            "optional": false,
            "field": "livraison",
            "description": "<p>date de livraison { &quot;date&quot;: &quot;YYYY-MM-DD&quot;, &quot;heure&quot;: &quot;HH:MN:SS&quot;}</p>"
          },
          {
            "group": "BODY",
            "type": "Number",
            "optional": false,
            "field": "montant",
            "description": "<p>montant de la commande</p>"
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
            "field": "Commande",
            "description": "<p>Informations de la nouvelle commande</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Commandes"
  }
] });
