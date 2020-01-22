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
        (datas.created_at) ? this.created_at = datas.created_at : this.created_at = date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
        (datas.date_livraison) ? this.date_livraison = datas.date_livraison : this.date_livraison = date.format(new Date(), "YYYY-MM-DD HH:MM:SS");
        this.montant = datas.montant;
        this.statut = datas.statut;
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

    static findByStatut(statut){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande WHERE statut = ? ORDER BY created_at ASC";
            db.query(sql, statut, (error, result) => {
                if (!error){
                    resolve(result)
                }
                else{
                    reject(error)
                }
            })
        })

    }

    /**
     * Récupère les commandes dans un intervalle
     * @param start - Le numéro de la ligne de départ
     * @param size - Le nombre de lignes à récupérer
     * @return Promise
     */
    static findByPage(start, size){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande ORDER BY created_at ASC LIMIT ?, ?";
            db.query(sql, [start, size], (error, result) => {
                if (!error){
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
            const sql = "UPDATE commande SET mail = ?, date_livraison = ?, montant = ?, statut = ? WHERE id = ?";
            const values = [this.mail, this.date_livraison, this.montant, this.statut, this.id]
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
