const Commande = require('./Commande');

class Collection {
    constructor(count, size, commandes){
        this.type = "collection";
        this.count = count;
        this.size = size;
        this.commandes = commandes;
    }

    static all(){
        return Commande.all()
            .then(datas => {
                let commandes = [];
                datas.forEach(c => {
                    commandes.push({
                        commande: new Commande(c),
                        links: {
                            self: {
                                href: "/commandes/" + c.id
                            }
                        }
                    })
                });
                const count = commandes.length;
                const size = commandes.length
                return new Collection(count, size, commandes)
            })
            .catch((error) =>{
               return error
            })
    }

    static filteredByStatus(status){
        return Commande.findByStatus(status)
            .then(datas => {
                let commandes = [];
                datas.forEach(c => {
                    commandes.push({
                        commande: new Commande(c),
                        links: {
                            self: {
                                href: "/commandes/" + c.id
                            }
                        }
                    })
                });
                const count = commandes.length;
                const size = commandes.length
                return new Collection(count, size, commandes)
            })
            .catch(() =>{
                return null
            })
    }

    static filteredByPage(page, size){
        const start = (page - 1) * size; // Le numéro de ligne de départ
        const promises = [Commande.countAll(), Commande.findByPage(start, size)];
        // On attend de récupérer le nombre total de commandes et les commandes ciblées par Page et Size
        return Promise.all(promises)
            .then(datas => {
                const count = datas[0];
                const datasCommandes = datas[1];
                let commandes = [];
                datasCommandes.forEach(c => {
                    commandes.push({
                        commande: new Commande(c),
                        links: {
                            self: {
                                href: "/commandes/" + c.id
                            }
                        }
                    })
                });
                return new Collection(count.count, size, commandes)

            })
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = Collection;
