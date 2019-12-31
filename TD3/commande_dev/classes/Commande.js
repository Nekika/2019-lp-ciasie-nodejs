const uuid = require('uuid');
const date = require('date-and-time');

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "mysql.commande",
    user: "command_lbs",
    password: "command_lbs",
    database: "command_lbs"
});

class Commande{
    constructor(mail_client, montant){
    this.id = uuid();                                                           // ID unique
        this.mail_client = mail_client;
        this.date_commande = date.format(new Date(), 'YYYY-MM-DD'); // Date courante
        this.montant = montant;
    }

    static all(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande";
            db.query(sql, (error, result) => {
                if (!error){
                    resolve(result)
                }
                else{
                    reject()
                }
            })
        })
    }

    static find(id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande WHERE id = ?";
            db.query(sql, id, (error, result) => {
                if (!error){
                    resolve(result[0])
                }
                else{
                    reject()
                }
            })
        })
    }
}

module.exports = Commande;
