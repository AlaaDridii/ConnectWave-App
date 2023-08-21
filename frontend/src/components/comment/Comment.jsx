import React from 'react'                                           // Importer le module React
import person from '../../assests/person1.jpg'                      // Importer une image de profil par défaut
import { useEffect } from 'react'                                   // Importer le hook useEffect de React
import { useState } from 'react'                                    // Importer le hook useState de React
import { format } from 'timeago.js'                                 // Importer la fonction format de timeago.js pour formater les dates
import { request } from '../../util/request'                        // Importer la fonction request pour effectuer des appels API
import classes from './comment.module.css'                          // Importer les classes CSS spécifiques au composant
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'        // Importer des icônes de React Icons
import { useSelector } from 'react-redux'                           // Importer le hook useSelector

const Comment = ({ comment }) => {
    // Récupèrer l'utilisateur et le token depuis l'état global Redux
    const { user, token } = useSelector((state) => state.auth)  
    // État local pour stocker les informations de l'auteur du commentaire    
    const [commentAuthor, setCommentAuthor] = useState("")          
    const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id))

    useEffect(() => {
        const fetchCommentAuthor = async () => {
            try {
                // Effectuer une requête pour obtenir les informations de l'auteur du commentaire
                const data = await request(`/user/find/${comment.userId}`, 'GET')
                setCommentAuthor(data) // Mettre à jour l'état avec les données de l'auteur du commentaire
            } catch (error) {
                console.error(error)
            }
        }
        fetchCommentAuthor() // Appeller la fonction d'obtention de l'auteur du commentaire lors du montage du composant
    }, [])

    const handleLikeComment = async () => {

        try {
            const headers = {'Authorization': `Bearer ${token}`} // Créer des autorisations pour l'appel API
           
            // Effectuer une requête pour activer ou désactiver le "like" du commentaire
            await request(`/comment/toggleLike/${comment._id}`, 'PUT', headers)
            // Inverse l'état de "like"du commentaire
            setIsLiked(prev => !prev) 
        } catch (error) {
          console.error(error)
        }
    }

    return (
        <div className={classes.comment}>
            <div className={classes.commentLeft}>
                <img src={person} className={classes.commentImg} />
                <div className={classes.commentDetails}>
                    <h4>{commentAuthor?.username}</h4>
                    <span>{format(comment.createdAt)}</span>
                </div>
                <div className={classes.commentText}>{comment.text}</div>
            </div>
            {isLiked ? <AiFillHeart onClick={handleLikeComment}/> : <AiOutlineHeart onClick={handleLikeComment}/>}
        </div>
    )
}
// Exporter le composant Comment
export default Comment

//Ce composant React représente un commentaire dans une application. Il affiche les détails de l'auteur du commentaire,
// la date du commentaire, le texte du commentaire et une icône de cœur qui peut être cliquée pour "aimer" ou "ne plus 
//aimer" le commentaire. Le composant utilise des hooks comme useState et useEffect, ainsi que des fonctionnalités de
// gestion d'état global Redux via le hook useSelector. Il effectue également des appels API pour obtenir les 
//informations de l'auteur du commentaire et pour gérer les "likes" des commentaires.