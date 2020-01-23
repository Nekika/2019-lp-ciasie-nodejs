const db = require('../mongo/mongo');

class Sandwich{
    constructor(ref,nom,description,type_pain,image,categories,prix){
        this.ref = ref;
        this.nom = nom;
        this.description = description;
        this.type_pain = type_pain;
        this.image = image;
        this.categories = categories;
        this.prix = prix;
    }

    static findByCategorie(id){
        console.log(db.get('categories'))
            return db.get('categories').find().toArray((result)=>  {
                result.json(result)
            })   
    }
}
module.exports = Sandwich;