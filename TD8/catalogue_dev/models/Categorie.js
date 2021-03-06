const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: { type: Number, index: true, unique: true, required: true },
    nom: { type: String, required: true },
    description: { type: String, text: true }
}, { collection: 'categorie'});

module.exports = mongoose.model("Categorie", schema);