const mongoose = require("mongoose");

//avoir une classe logger pour enregistrer tous les logs de l'application(info, warning, erreur, succes)
//concernant les routes dans server.js, creer un fichier à part que l'on importera dans server.js afin que ce dernier soit moins surchargé
//comment prefixer les routes de l'API? grac eà express
//thirth party pour gerer auth0, keycloak
const clientSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      maxlength: 200,
    },
    prenom: {
      type: String,
      required: false,
      maxlength: 60,
    },
    type: {
      type: String,
      required: true,
      enum: ["personne morale", "personne physique"],
    },
    telephone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sexe: {
      type: String,
      enum: ["masculin", "feminin"],
      default: "masculin",
    },
    archive: {
      type: String,
      enum: ["archive", "nonArchive"],
      default: "nonArchive",
    },
    pays: {
      type: String,
      required: true,
      maxlength: 40,
    },
    ville: {
      type: String,
      required: true,
      maxlength: 50,
    },
    quartier: {
      type: String,
      required: true,
    },
    date_partenariat: {
      type: Date,
      required: true,
    },
    commentaire: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("client", clientSchema);
module.exports = Client;
