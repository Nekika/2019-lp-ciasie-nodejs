db.sandwich.insertMany([
    {
        "ref": "s19001",
        "nom": "le bucheron",
        "description": "un sandwich de bucheron : frites, fromage, saucisse, steack, lard grillés, mayo",
        "type_pain": "baguette",
        "image": {
            "titre": "bucheron_0",
            "type": "image/png",
            "def_x": 1650,
            "def_y": 600,
            "taille": 15468,
            "filename": "img_5a045cd771388.png"
        },
        "categories": [
            "traditionnel",
            "chaud"
        ],
        "prix": {
            "$numberDecimal": "6.00"
        }
    },
    {
        "ref": "s19002",
        "nom": "le jambon-beurre",
        "description": "le jambon-beurre traditionnel, avec des cornichons",
        "type_pain": "baguette",
        "image": {
            "titre": "jambon-beurre_0",
            "type": "image/jpeg",
            "def_x": 800,
            "def_y": 1080,
            "taille": 13500,
            "filename": "img_5a045cd796f93.jpeg"
        },
        "categories": [
            "bio",
            "traditionnel"
        ],
        "prix": {
            "$numberDecimal": "4.50"
        }
    },
    {
        "ref": "s19003",
        "nom": "les fajitas poulet",
        "description": "fajitas au poulet avec ses tortillas de mais, comme à Puebla",
        "type_pain": "tortillas",
        "image": {
            "titre": "fajitas poulet_0",
            "type": "image/png",
            "def_x": 2018,
            "def_y": 600,
            "taille": 18918,
            "filename": "img_5a045cd7a61c1.png"
        },
        "categories": [
            "chaud",
            "world"
        ],
        "prix": {
            "$numberDecimal": "6.50"
        }
    },
    {
        "ref": "s19004",
        "nom": "le forestier",
        "description": "le bon sandwich au gout de la forêt",
        "type_pain": "baguette campagne",
        "image": {
            "titre": "le forestier_0",
            "type": "image/png",
            "def_x": 1280,
            "def_y": 768,
            "taille": 15360,
            "filename": "img_5a045cd7b3f9b.png"
        },
        "categories": [
            "bio",
            "traditionnel"
        ],
        "prix": {
            "$numberDecimal": "5.75"
        }
    },
    {
        "ref": "s19005",
        "nom": "la mer",
        "description": "le sandwich au goût de la mer, saumon fumé ",
        "type_pain": "mie",
        "image": {
            "titre": "la mer_0",
            "type": "image/gif",
            "def_x": 600,
            "def_y": 600,
            "taille": 5625,
            "filename": "img_5a045cd7c44c0.gif"
        },
        "categories": [
            "bio",
            "traditionnel"
        ],
        "prix": {
            "$numberDecimal": "5.25"
        }
    },
    {
        "ref": "s19006",
        "nom": "le panini",
        "description": "le panini napolitain authentique : jambon de parme, chèvre, olives noires, tomates séchées",
        "type_pain": "panini",
        "image": {
            "titre": "le panini_0",
            "type": "image/jpeg",
            "def_x": 1650,
            "def_y": 960,
            "taille": 24750,
            "filename": "img_5a045cd7dc714.jpeg"
        },
        "categories": [
            "chaud",
            "world"
        ],
        "prix": {
            "$numberDecimal": "6.00"
        }
    },
    {
        "ref": "s19007",
        "nom": "le club sandwich",
        "description": "le club sandwich comme à Saratoga : pain toasté, filet de dinde, bacon, laitue, tomate",
        "type_pain": "mie",
        "image": {
            "titre": "club_1",
            "type": "image/png",
            "def_x": 800,
            "def_y": 600,
            "taille": 7500,
            "filename": "img_5a0465e7cd2c0.png"
        },
        "categories": [
            "traditionnel",
            "veggie"
        ],
        "prix": {
            "$numberDecimal": "6.00"
        }
    }
]);
