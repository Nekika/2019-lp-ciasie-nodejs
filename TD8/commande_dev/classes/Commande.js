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
    constructor(datas){
        (datas.id) ? this.id = datas.id : this.id = uuid();
        this.mail = datas.mail;
        this.nom = datas.nom;
        this.client_id = this.client_id;
        this.created_at = (datas.created_at) ? datas.created_at : date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
        this.date_paiement = (datas.date_paiement) ? datas.date_paiement : date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
        this.montant = datas.montant ? datas.montant : 0 ;
        this.status = 0;
        this.livraison = datas.livraison ? datas.livraison.date + ' ' + datas.livraison.heure : date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
    }

    static all(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande ORDER BY created_at ASC";
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
            const sql = "SELECT * FROM commande WHERE id = ?";
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

    static findByStatut(status){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande WHERE status = ? ORDER BY date_commande ASC";
            db.query(sql, status, (error, result) => {
                if (!error){
                    console.log(result);
                    resolve(result)
                }
                else{
                    reject(error)
                }
            })
        })

    }

    save(){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO commande SET ?";
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
            const sql = "UPDATE commande SET mail = ?, livraison = ?, montant = ?, status = ?, client_id = ? WHERE id = ?";
            const values = [this.mail, this.livraison.date + ' ' + this.livraison.heure, this.montant, this.status, this.client_id, this.id]
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

module.exports = Commande;
