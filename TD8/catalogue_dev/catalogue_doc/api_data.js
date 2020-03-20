define({ "api": [
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "Catégorie par son ID",
    "name": "GetCategorieById",
    "group": "Categories",
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
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
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SandwichsNotFound",
            "description": "<p>L'id ne correspond à aucune catégorie</p>"
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
    "title": "Sandwichs d'une catégorie",
    "name": "GetCategorieSandwichs",
    "group": "Categories",
    "parameter": {
      "fields": {
        "URI": [
          {
            "group": "URI",
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
            "description": "<p>L'id ne correspond à aucune catégorie</p>"
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
    "url": "/categories",
    "title": "Toutes les catégories",
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
            "description": "<p>Liste des categories</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/App.js",
    "groupTitle": "Categories"
  }
] });
