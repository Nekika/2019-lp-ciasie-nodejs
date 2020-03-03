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
        this.nom_client = datas.nom_client;
        this.mail_client = datas.mail_client;
        this.passwd = datas.passwd;
        this.cumul_achats = datas.cumul_achats;
        this.created_at = (datas.created_at) ? datas.created_at : date.format(new Date(), "YYYY-MM-DD HH:MM:SS");        this.cumul_achats = datas.cumul_achats ? datas.cumul_achats : 0 ;
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
