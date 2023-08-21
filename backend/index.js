//Importer le framework Express pour la création d'applications web
const express = require('express')
// Importer le module mongoose pour interagir avec la base de données
const mongoose = require('mongoose')
//Importer le module CORS pour gérer les autorisations de partage de ressources entre domaines
const cors = require('cors')
// Importer le routeur d'authentification
const authRouter = require('./routes/auth')
// Importer le routeur d'utilisateurs
const userRouter = require('./routes/user')
// Importer le routeur de publications
const postRouter = require('./routes/post')
//Importer le routeur de commentaires
const commentRouter = require('./routes/comment')
// Importer le routeur de contrôle pour le téléchargement de fichiers
const uploadRouter = require('./controllers/uploadController')
// Importe le module dotenv pour charger les variables d'environnement depuis le fichier .env
const dotenv = require('dotenv').config()
const app = express()

// Se connecter à la base de données en utilisant l'URL définie dans les variables d'environnement
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    // Afficher un message si la connexion à la base de données réussit
    console.log('db connection is a success')
})
// Définir un chemin pour servir des images statique
app.use('/images', express.static('public/images'))

// middlewares
app.use(cors()) // Utiliser le middleware CORS pour gérer les autorisations de partage de ressources entre domaine
app.use(express.json()) // Utiliser le middleware pour analyser les données JSON dans les requêtes
app.use(express.urlencoded({extended: true})) // Utiliser le middleware pour analyser les données de formulaire URL encodé

app.use('/auth', authRouter) // Associer le routeur d'authentification aux routes commençant par /auth
app.use('/user', userRouter) // Associer le routeur d'utilisateurs aux routes commençant par /user
app.use('/post', postRouter) // Associer le routeur de publications aux routes commençant par /post
app.use('/comment', commentRouter)
app.use('/upload', uploadRouter) // Associer le routeur de contrôle de téléchargement aux routes commençant par /upload

// Recevoir les demandes entrantes sur le port spécifié dans les variables d'environnement et affiche un message lorsque le serveur est connecté avec succès
app.listen(process.env.PORT, () => console.log('Server has been connected successfully'))

//C'est le fichier principal du backend de l'application qui configure le serveur Express,la connexion à la base de données MongoDB,
//les middlewares pour gérer les requêtes et les routes pour les différentes fonctionnalités de l'application.
//Chaque routeur est associé à un préfixe d'URL spécifique (/auth, /user, /post, /comment, /upload).
//Le serveur écoute ensuite sur le port spécifié dans les variables d'environnement (process.env.PORT) et affiche
//un message lorsque la connexion est établie avec succès.
