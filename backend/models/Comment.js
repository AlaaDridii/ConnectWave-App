// Importe mongoose pour interagir avec la base de données
const mongoose = require('mongoose')

// Définition du schéma du modèle de Commentaire
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true   // Le texte du commentaire est requis
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    }
}, 
{timestamps: true})  //Active l'ajout automatique des horodatages "createdAt" et "updatedAt"

// Exporte le modèle de Commentaire basé sur le schéma défini
module.exports = mongoose.model('Comment', CommentSchema)


//Ce code définit un modèle de données pour les commentaires en utilisant le module mongoose. Chaque commentaire possède
//un texte obligatoire, l'ID du post auquel il est associé, l'ID de l'utilisateur qui l'a créé, et la liste des "likes"
//sous forme d'IDs d'utilisateurs. Les horodatages de création et de mise à jour (createdAt et updatedAt) sont 
//automatiquement ajoutés aux documents grâce à l'option timestamps: true. Ce modèle peut être utilisé pour interagir
//avec la collection de commentaires dans la base de données MongoDB.