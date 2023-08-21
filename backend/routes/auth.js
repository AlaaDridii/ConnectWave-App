// Importe les fonctions d'inscription et de connexion depuis le contrôleur d'authentification
const { register, login } = require("../controllers/authController")

// Importe le module de routage "express" et crée un routeur pour les fonctionnalités d'authentification
const authRouter = require("express").Router()

// Définit la route POST "/register" pour l'inscription d'un nouvel utilisateur
authRouter.post('/register', register)

// Définit la route POST "/login" pour la connexion d'un utilisateur existant
authRouter.post('/login', login)

// Exporte le routeur d'authentification contenant les routes définies
module.exports = authRouter


//Ce code configure les routes d'authentification en utilisant le module de routage "express". Les routes sont
//définies pour les fonctionnalités d'inscription (/register) et de connexion (/login). Chaque route utilise 
//une fonction correspondante provenant du contrôleur d'authentification pour gérer la logique. 
//Le routeur d'authentification est ensuite exporté pour être utilisé dans d'autres parties de l'application.