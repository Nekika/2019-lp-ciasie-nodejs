const uuid = require('uuid');
const date = require('date-and-time');

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "mysql.commande",
    user: "command_lbs",
    password: "command_lbs",
    database: "command_lbs"
});

class Client{
    constructor(datas){
        (datas.id) ? this.id = datas.id : this.id = uuid();
        this.mail = datas.mail;
        this.nom = datas.nom;
        this.created_at = (datas.created_at) ? datas.created_at : date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
        this.date_paiement = (datas.date_paiement) ? datas.date_paiement : date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
        this.montant = datas.montant ? datas.montant : 0 ;
        this.status = 0;
        this.livraison = datas.livraison.date + ' ' + datas.livraison.heure ? datas.livraison.date + ' ' + datas.livraison.heure : this.created_at = date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
    }

    static all(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM client";
            db.query(sql, (error, result) => {
                if (!error){
                    resolve(result)
                }
                else{
                    reject(error)
                }
            })
        })
    }

    static find(id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM client WHERE id = ?";
            db.query(sql, id, (error, result) => {
                if (!error){
                    resolve(result[0])
                }
                else{
                    reject(error)
                }
            })
        })
    }

    save(){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO client SET ?";
            db.query(sql, this, (error) => {
                if (!error){
                    resolve()
                }
                else{
                    reject(error)
                }
            })
        })
    }

    update(datas){
        for (let data in datas){
            if (this.hasOwnProperty(data)){
                this[data] = datas[data]
            }
        }
        return new Promise((resolve, reject) => {
            const sql = "UPDATE client SET nom_client = ?, mail_client = ?, passwd = ?, cumul_achats = ? WHERE id = ?";
            const values = [this.nom_client, this.mail_client, this.passwd, this.cumul_achats, this.id]
            db.query(sql, values, (error) => {
                if(!error){
                    resolve(this)
                }
                else{
                    reject(error)
                }
            })
        })
    }
}

module.exports = Client;
