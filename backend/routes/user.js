// Importer les fonctions du contrôleur utilisateur pour gérer les opérations utilisateur
const { getUser, getAll, updateUser, deleteUser, getUserFriends, followUser, unfollowUser } = require('../controllers/userController')

// Importer le middleware de vérification du token d'authentification
const verifyToken = require('../middlewares/auth')

// Importer le module de routage "express" et créer un routeur pr les fonctionnalités d'utilisateur
const userRouter = require('express').Router()

// Définit la route GET "/findAll" pour obtenir la liste de tous les utilisateurs
userRouter.get('/findAll', getAll)

// Définit la route GET "/find/:id" pour obtenir les détails d'un utilisateur spécifique par son ID
userRouter.get('/find/:id', getUser)

// Définit la route GET "/find/userfriends/:id" pour obtenir la liste d'amis d'un utilisateur spécifique par son ID
userRouter.get('/find/userfriends/:id', getUserFriends)

// Définit la route PUT "/update/:id" pour mettre à jour les informations d'un utilisateur (requiert une authentification)
userRouter.put('/update/:id', verifyToken, updateUser)

// Définit la route PUT "/follow/:id" pour permettre à un utilisateur de suivre un autre utilisateur (requiert une authentification)
userRouter.put('/follow/:id', verifyToken, followUser)

// Définit la route PUT "/unfollow/:id" pour permettre à un utilisateur de ne plus suivre un autre utilisateur (requiert une authentification)
userRouter.put('/unfollow/:id', verifyToken, unfollowUser)

// Définit la route DELETE "/delete/:id" pour supprimer un utilisateur (requiert une authentification)
userRouter.delete('/delete/:id', verifyToken, deleteUser)

module.exports = userRouter


//Ce code configure les routes liées aux opérations utilisateur en utilisant le module de routage "express".
//Chaque route correspond à une fonction spécifique du contrôleur utilisateur et peut nécessiter une authentification
//en utilisant le middleware verifyToken. Le routeur utilisateur est ensuite exporté pour être utilisé dans d'autres
//parties de l'application.