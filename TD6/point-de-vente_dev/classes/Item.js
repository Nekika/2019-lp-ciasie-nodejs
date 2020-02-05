const uuid = require('uuid');
const date = require('date-and-time');

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "mysql.commande",
    user: "command_lbs",
    password: "command_lbs",
    database: "command_lbs"
});

class Item{
    constructor(datas){
        (datas.id) ? this.id = datas.id : this.id = uuid();
        this.uri = datas.uri;
        this.libelle = datas.libelle;
        this.tarif = datas.tarif;
        this.quantite = datas.quantite;
        this.command_id = datas.command_id;
    }

    static all(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM item";
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
            const sql = "SELECT * FROM item WHERE id = ?";
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

    static findByCommande(statut){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM item WHERE command_id = ?";
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
     * Récupère les items dans un intervalle
     * @param start - Le numéro de la ligne de départ
     * @param size - Le nombre de lignes à récupérer
     * @return Promise
     */
    static findByPage(start, size){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM item LIMIT ?, ?";
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
            const sql = "INSERT INTO item SET ?";
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
            const sql = "UPDATE item SET uri = ?, libelle = ?, tarif = ?, quantite = ? WHERE command_id = ?";
            const values = [this.uri, this.libelle, this.tarif, this.quantite, this.command_id]
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

module.exports = Item;
