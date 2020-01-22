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
        (datas.created_at) ? this.created_at = datas.created_at : this.created_at = date.format(new Date(), "YYYY-MM-DD hh:mm:ss");
        (datas.livraison) ? this.livraison = datas.livraison : this.livraison = date.format(new Date(), "YYYY-MM-DD hh:mm:ss");
        this.montant = datas.montant;
        (this.status) ? this.status = datas.status : this.status = 1
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

    static findByStatus(status){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM commande WHERE status = ? ORDER BY created_at ASC";
            db.query(sql, status, (error, result) => {
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
            const sql = "UPDATE commande SET ? WHERE id = ?";
            db.query(sql, [this, this.id], (error) => {
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
