define({ "api": [
  {
    "type": "get",
    "url": "/categories",
    "title": "Récupération de toutes les catégories",
    "name": "GetCategories",
    "group": "Categories",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Categories",
            "optional": false,
            "field": "categories",
            "description": "<p>Liste des categories.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Categories"
  },
  {
    "type": "get",
    "url": "/categories/:id/sandwichs",
    "title": "Récupération ds sandwichs d'une catégorie selon son id",
    "name": "GetCategories",
    "group": "Categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la catégorie.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Sandwichs",
            "optional": false,
            "field": "sandwichs",
            "description": "<p>Données des sandwichs correspondant à la catégorie.</p>"
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
            "field": "SandwichsNotFound",
            "description": "<p>L'id de la catégorie n'est pas correct.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Categories"
  },
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "Récupération d'une catégorie selon son id",
    "name": "GetCategories",
    "group": "Categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la catégorie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Categorie",
            "optional": false,
            "field": "categorie",
            "description": "<p>Informations de la catégorie</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Categories"
  }
] });
