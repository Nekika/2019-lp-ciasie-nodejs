const mongoose = require('mongoose');
const CategorieSchema = require('./schemas/CategorieSchema')(mongoose);
const SandwichSchema = require('./schemas/SandwichSchema')(mongoose);

const url = "mongodb://user:password@mongo.cat/catalogue";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    const Categorie = mongoose.model('Categorie', CategorieSchema);
    /*const tacos = new Categorie({
        id: 36,
        nom: "Tacos",
        description: "Délicieux tacos"
    });*/

    Categorie.find({})
        .then(categories => {
            console.log(categories)
        })
});
