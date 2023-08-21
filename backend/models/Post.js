const mongoose = require("mongoose");

// Définition du schéma du modèle de Publication
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 10,   // La longueur minimale de la description est de 10 caractères
        max: 150,  // La longueur maximale de la description est de 150 caractères
    },
    imageUrl: {
        type: String,
        required: true, // L'URL de l'image associée à la publication est requise
    },
    likes: {
        type: [String],
        default: []
    }
}, 
// Active l'ajout automatique des horodatages "createdAt" et "updatedAt"
{ timestamps: true });

module.exports = mongoose.model("Post", PostSchema);