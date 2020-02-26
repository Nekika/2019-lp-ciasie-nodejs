const mongoose = require("mongoose");

const image = new mongoose.Schema({
    titre: { type: String },
    type: { type: String },
    def_x: { type: Number },
    def_y: { type: Number },
    taille: { type: Number },
    filename: { type: String },
});

const schema = new mongoose.Schema({
    ref: { type: String, index: true, unique: true, required: true },
    nom: { type: String, required: true },
    description: { type: String, text: true },
    type_pain: { type: String, text: true },
    image: { type: image },
    categorie: { type: String, text: true },
    prix: { type: Number },
}, { collection: 'sandwich'});

module.exports = mongoose.model("sandwich", schema);