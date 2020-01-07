const Commande = require('./Commande');

class Collection {
    constructor(commandes){
        this.type = "collection";
        this.count = commandes.length;
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

    static filteredByPage(page){
        const start = (page - 1) * 10 + 1; // Le numéro de ligne de départ
        const size = 10; // Nombre de commandes à afficher
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
                return new Collection(commandes)
            })
            .catch((error) =>{
                return error
            })
    }
}

module.exports = Collection;
