import React, { useState } from 'react'
import classes from './post.module.css'
import italy from '../../assests/couverture.jpg'
import person from '../../assests/person1.jpg'
import { AiFillLike, AiOutlineComment, AiOutlineHeart, AiOutlineLike } from 'react-icons/ai'
import { IoMdSettings, IoMdShareAlt } from 'react-icons/io'
import { format } from 'timeago.js'
import { useEffect } from 'react'
import { request } from '../../util/request'
import { useSelector } from 'react-redux'
import Comment from '../comment/Comment'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  // Récupèrer l'utilisateur et le token depuis Redux
  const { user, token } = useSelector((state) => state.auth)
  // State pour stocker les détails de l'auteur
  const [authorDetails, setAuthorDetails] = useState("")
  // State pour afficher/cacher les commentaires
  const [showComments, setShowComments] = useState(false)
   //State pour stocker les commentaires
  const [comments, setComments] = useState([])
  // State pour stocker le texte du commentaire
  const [commentText, setCommentText] = useState("")
  // State pour suivre si la publication est "aimée" par l'utilisateur actuel
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id))
  // State pour afficher/cacher le modal de suppression de publication
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Effectue une requête pour obtenir les détails de l'auteur de la publication
        const data = await request('/user/find/' + post.userId, 'GET')
        // Mettre à jour la state avec les détails de l'auteur
        setAuthorDetails(data)
      } catch (error) {
        console.error(error)
      }
    }
     // Appeller la fonction d'obtention des détails de l'auteur 
    fetchDetails()
  }, [post._id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
         // Effectuer une requête pour obtenir les commentaires de la publication
        const data = await request(`/comment/${post._id}`, 'GET')
        console.log(data)
        // Mettre à jour le state avec les commentaires
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    // Appeller la fonction d'obtention des commentaires
    fetchComments()
  }, [post._id])
   // Gèrer les "like" de la publication
  const handleLike = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    try {
      // Effectuer une requête pour aimer la publication
      await request(`/post/likePost/${post._id}`, "PUT", headers)
      // Inverser l'état de "like"de la publication
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }
// Gère les "dislike" de la publication
  const handleDislike = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    try {
      await request(`/post/dislikePost/${post?._id}`, "PUT", headers)
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }
// Gèrer la soumission d'un commentaire
  const handleComment = async (e) => {
    e.preventDefault()

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      // Effectuer une requête pour ajouter un commentaire
      const data = await request('/comment', 'POST', headers, { text: commentText, postId: post._id })
      console.log(data)
       // Mettre à jour State avec le nouveau commentaire
      setComments(prev => {
        if (prev.length === 0) return [data]
        return [data, ...prev]
      })

      setCommentText("")
    } catch (error) {
      console.error(error)
    }
  }
// Gèrer la suppression de la publication
  const handleDeletePost = async() => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      }

      await request('/post/deletePost/' + post._id, 'DELETE', headers)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className={classes.post}>
      <div className={classes.top}>
        <Link to={`/profile/${user._id}`} className={classes.topLeft}>
          <img src={person} alt="" className={classes.postAuthorImg} />
          <div className={classes.postDetails}>
            <span>{authorDetails?.username}</span>
            <span className={classes.date}>{format(post?.createdAt)}</span>
          </div>
        </Link>
        {user._id === post?.userId && <IoMdSettings onClick={() => setShowDeleteModal(prev => !prev)}/>}
        {showDeleteModal && (
          <span className={classes.deleteModal} onClick={handleDeletePost}>
             Delete post
          </span>
        )}
      </div>
      <p className={classes.desc}>
        {post?.desc}
      </p>
      <div className={classes.postImgContainer}>
        <img src={post.imageUrl ? `http://localhost:5000/images/${post.imageUrl}` : italy} alt="" className={classes.postImg} />
      </div>
      <div className={classes.actions}>
        {
          !isLiked &&
          <span className={classes.action} onClick={handleLike}>
            Like <AiOutlineLike />
          </span>
        }
        {isLiked &&
          <span className={classes.action} onClick={handleDislike}>
            Liked <AiFillLike />
          </span>
        }
        <span className={classes.action} onClick={() => setShowComments(prev => !prev)}>
          Comment <AiOutlineComment />
        </span>
        <span className={classes.action}>
          Share <IoMdShareAlt />
        </span>
      </div>
      {showComments &&
        <>
          <div className={classes.comments}>
            {comments?.length > 0 ? comments?.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            )) : <h3 style={{padding: '1.25rem'}}>No comments yet.</h3>}
          </div>
          <form className={classes.commentSection} onSubmit={handleComment}>
            <textarea value={commentText} type="text" placeholder='Type comment...' onChange={(e) => setCommentText(e.target.value)} />
            <button type="submit">Post</button>
          </form>
        </>
      }
    </div>
  )
}

export default Post
//Ce composant Post représente une publication dans une application. Il affiche les détails de l'auteur, 
//le texte de la publication, l'image de la publication, les actions de like, commentaire et partage, 
//ainsi que la section des commentaires. Le composant utilise des hooks tels que useState et useEffect
// pour gérer les états locaux et effectuer des appels API. Il utilise également le composant Comment pour afficher
 //les commentaires associés à la publication.