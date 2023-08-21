// Importe Comment depuis le répertoire "models"
const Comment = require("../models/Comment");

// Récupère les commentaires associés à un post spécifique
const getCommentsFromPost = async(req, res) => {
    try {
        // Recherche les commentaires avec le postId correspondant à celui fourni dans les paramètres de la requête
        const comments = await Comment.find({postId: req.params.postId})
        // Renvoie une réponse avec les commentaires trouvés et un code de statut 200 (OK)
        return res.status(200).json(comments)
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le message d'erreur et un code d'erreur 500 (erreur serveur)
        return res.status(500).json(error.message)
    }
}

// Crée un nouveau commentaire pour un post
const createComment = async(req, res) => {
        try {
           // Crée un nouveau commentaire en utilisant les données de la requête et l'ID de l'utilisateur à partir de la 
           //requête authentifiée
           const createdComment = await Comment.create({...req.body, userId: req.user.id})

           // Renvoie une réponse avec le commentaire créé et un code de statut 201 (Créé)
           return res.status(201).json(createdComment)
        } catch (error) {
          // En cas d'erreur, renvoie une réponse avec le message d'erreur et un code d'erreur 500 (erreur coté  serveur)
            return res.status(500).json(error.message) 
        }
}

// Supprime un commentaire spécifique
const deleteComment = async(req, res) => {
    try {
       // Recherche le commentaire avec l'ID correspondant à celui fourni dans les paramètres de la requête
       const comment = await Comment.findById(req.params.commentId)

       // Vérifie si l'utilisateur authentifié est le propriétaire du commentaire
       if(comment.userId === req.user.id){
         // Supprime le commentaire et renvoie une réponse de succès avec un code de statut 200 (OK)
         await Comment.findByIdAndDelete(req.params.commentId)
         return res.status(200).json({msg: "Comment has been successfully deleted"})
       } else {
         // Si l'utilisateur n'est pas le propriétaire, renvoie une réponse d'interdiction avec un code de statut 403
         return res.status(403).json({msg: "You can delete only your own comments"})
       }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le message d'erreur et un code d'erreur 500 (erreur serveur)
        return res.status(500).json(error.message)  
    }
}

// Active ou désactive un "like" pour un commentaire
const toggleLike = async(req, res) => {
    try {
      // Récupère l'ID de l'utilisateur actuellement authentifié
      const currentUserId = req.user.id
      // Recherche le commentaire avec l'ID correspondant à celui fourni dans les paramètres de la requête
      const comment = await Comment.findById(req.params.commentId)
      // Vérifie si l'utilisateur n'a pas encore aimé le commentaire
      if(!comment.likes.includes(currentUserId)){

        // Ajoute l'ID de l'utilisateur aux "likes" du commentaire, sauvegarde et renvoie une réponse de succès avec
        //un code de statut 200 (OK)
        comment.likes.push(currentUserId)
        await comment.save()
        return res.status(200).json({msg: "Comment has been successfully liked!"})
      } else {

        // Si l'utilisateur a déjà aimé le commentaire, retire son ID des "likes", sauvegarde et renvoie une réponse
        //de succès avec un code de statut 200 (OK)
        comment.likes = comment.likes.filter((id) => id !== currentUserId)
        await comment.save()
        return res.status(200).json({msg: "Comment has been successfully unliiked"})
      }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le message d'erreur et un code d'erreur 500 (erreur serveur)
        return res.status(500).json(error.message)  
    }
}
// Exporte les fonctions getCommentsFromPost, createComment, deleteComment et toggleLike pour les rendre accessibles//depuis d'autres modules
module.exports = {
    getCommentsFromPost,
    createComment,
    deleteComment,
    toggleLike
}



//Ce code gère les opérations liées aux commentaires pour un post, notamment la récupération des commentaires associés
//à un post, la création de nouveaux commentaires, la suppression de commentaires (uniquement par le propriétaire
//du commentaire) et la gestion des "likes" pour les commentaires.