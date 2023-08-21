// Importe le module jwt pour la gestion des tokens JWT
const jwt = require("jsonwebtoken")

// Middleware pour vérifier le token d'authentification
const verifyToken = async(req, res, next) => {
    // Vérifie si l'en-tête "Authorization" est présent dans la requête
    if(!req.headers.authorization) 
    // Si l'en-tête est absent, renvoie une réponse d'interdiction avec un code de statut 403 (Interdit)
    return res.status(403).json({msg: 'Not authorized. No token'})

    // Vérifie si l'en-tête "Authorization" commence par "Bearer "
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        // Extrait le token du format "Bearer <token>" en séparant les deux partie
        const token = req.headers.authorization.split(' ')[1]
        // Vérifie le token en utilisant la clé secrète process.env.JWT_SECRET
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            // En cas d'erreur lors de la vérification du token, renvoie une réponse d'interdiction
            if(err) return res.status(403).json({msg: 'Wrong or expired token'})
            else {
                // Si le token est valide, ajoute les données décodées du token à la requête et passe à la fonction middleware suivante
                req.user = data // data = {id: user._id}
                next()
            }
        })
    }
}

// Exporte la fonction middleware pour être utilisée dans d'autres modules
module.exports = verifyToken


//Ce code définit un middleware (verifyToken) qui vérifie la présence et la validité d'un token d'authentification JWT
//dans l'en-tête "Authorization" d'une requête HTTP. Il vérifie d'abord si l'en-tête est présent, puis s'assure que
//le token est correct et non expiré en le vérifiant avec la clé secrète process.env.JWT_SECRET. Si le token est valide,
//les données du token sont ajoutées à la requête (req.user) pour une utilisation ultérieure dans d'autres parties
//de l'application. Si le token est incorrect ou expiré, une réponse d'interdiction est renvoyée avec un code 
//de statut 403. Ce middleware peut être utilisé pour sécuriser les routes nécessitant une authentification préalable.
