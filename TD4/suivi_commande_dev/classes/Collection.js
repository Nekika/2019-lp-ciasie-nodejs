const mysql = require("mysql");
const db = mysql.createConnection({
    host: "mysql.commande",
    user: "command_lbs",
    password: "command_lbs",
    database: "command_lbs"
});

class Collection {
    constructor(commandes){
        this.type = "collection";
        this.count = commandes.length;
        this.commandes = commandes;
    }
}

module.exports = Collection;
