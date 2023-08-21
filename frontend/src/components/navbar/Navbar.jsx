import React from 'react'
import classes from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import person from '../../assests/couverture.jpg'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  // Récupèrer l'utilisateur depuis  Redux
  const {user} = useSelector((state) => state.auth) 
  // Hook pour la navigation
  const navigate = useNavigate()

  const toggleModal = () => {
    // Inverser l'état du modal
    setShowModal(prev => !prev)
  }

  const handleLogout = () => {
    // Effacer les données de l'utilisateur enregistrées (déconnexion)
    localStorage.clear()
    // Rediriger l'utilisateur vers la page d'authentification
    navigate('/auth')
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/'>
            <h3>ConnectWave</h3>
          </Link>
        </div>
        <div className={classes.right}>
          <form className={classes.searchForm}>
            <input type="text" placeholder='Search profile...' />
            <AiOutlineSearch className={classes.searchIcon} />
          </form>
          <img src={person} className={classes.personImg} onClick={toggleModal} />
          {showModal && (
            <div className={classes.modal}>
              <span onClick={handleLogout} className={classes.logout}>logout</span>
              <Link to={`/updateProfile/${user._id}`} className={classes.updateProfile}>Update Profile</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

//Le composant Navbar représente une barre de navigation avec un logo, un champ de recherche, une image de profil 
//cliquable et un modal contenant des options de profil telles que la déconnexion et la mise à jour du profil. 
//Le composant utilise des hooks tels que useState et useSelector pour gérer les états locaux et accéder à l'état global
// Redux. Il utilise également les composants Link et useNavigate pour la navigation entre les pages.