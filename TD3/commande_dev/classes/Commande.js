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
                    reject({code: 404, message: error})
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
                    reject({code: 404, message: error})
                }
            })
        })
    }

    save(){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO commande(id, mail_client, date_commande, montant) VALUES(?, ?, ?, ?)";
            const values = Object.values(this);
            db.query(sql, values, (error) => {
                if (!error){
                    resolve()
                }
                else{
                    reject({code: 500, message: error})
                }
            })
        })
    }

    update(){
        return new Promise((resolve, reject) => {
            const sql = "UPDATE commande SET mail_client = ?, date_commande = ?, montant = ? WHERE id = ?";
            const values = [this.mail_client, this.date_commande, this.montant, this.id];
            db.query(sql, values, (error) => {
                if(!error){
                    resolve(this)
                }
                else{
                    reject({code: 500, message: error})
                }
            })
        })
    }
}

module.exports = Commande;
