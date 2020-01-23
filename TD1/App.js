const parser = require('body-parser');
const express = require('express');
const app = express();

app.use(parser({extended: false}));

const commandes = {
    "type": "collection",
    "count": 3,
    "commandes": [
        {
            "id": "AuTR4-65ZTY",
            "mail_client": "jan.neymar@yaboo.fr",
            "date_commande": "2019-12-25",
            "montant": 25.95
        },
        {
            "id": "657GT-I8G443",
            "mail_client": "jan.neplin@gmal.fr",
            "date_commande": "2019-11-27",
            "montant": 42.95
        },
        {
            "id": "K9J67-4D6F5",
            "mail_client": "claude.francois@grorange.fr",
            "date_commande": "2019-12-07",
            "montant": 14.95
        },
    ]
};

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/commandes', function (req, res) {
    res.json(commandes.commandes)
});

app.get('/commandes/:id', function (req, res) {
    const id = req.params.id;
    const tab = commandes.commandes;
    let commande = null;
    tab.forEach(
        e => { if (e.id === id){
                    commande = e
                }
        }
    );
    console.log(commande);
    res.json(commande)
});

app.post('/zinzin', function (req, res) {
    const data = req.body;
    console.log(data);
    res.send('Done');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
