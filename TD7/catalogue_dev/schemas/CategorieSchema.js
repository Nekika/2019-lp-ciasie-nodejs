const structure = {
    id: {type: Number, index: true, unique: true, required: true},
    nom: {type: String, required: true},
    description: {type: String, text: true}
};

module.exports = function (mongoose) {
    return new mongoose.Schema(structure, {collection: 'categorie'});
};

