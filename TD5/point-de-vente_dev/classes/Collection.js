const Commande = require('./Commande');

class Collection {
    constructor(commandes, size = 10){
        this.type = "collection";
        this.count = commandes.length;
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
                return new Collection(commandes)
            })
            .catch(() =>{
               return null
            })
    }

    static filteredByStatut(statut){
        return Commande.findByStatut(statut)
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
                return new Collection(commandes)
            })
            .catch(() =>{
                return null
            })
    }

    static filteredByPage(page, size = 10){
        const start = (page - 1) * 10; // Le numéro de ligne de départ
        return Commande.findByPage(start, size)
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
                return new Collection(commandes, size)
            })
            .catch((error) =>{
                return error
            })
    }
}

module.exports = Collection;
