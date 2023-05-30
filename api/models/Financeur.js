const mongoose = require("mongoose");

const financeurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      maxlength: 60,
    },
    prenom: {
      type: String,
      required: false,
      maxlength: 60,
    },
    sexe: {
      type: String,
      enum: ["Mascculin", "Feminin", "Autre"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    date_naissance: {
      rype: Date,
      required: false,
    },
    date_partenariat: {
      type: Date,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 20,
    },
    type: {
      type: String,
      required: true,
      enum: ["personne morale", "personne physique"],
    },
    commentaire: {
      type: String,
      required: false,
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
    archive: {
      type: String,
      enum: ["archive", "nonArchive"],
      default: "nonArchive",
    },
    secteur_activite: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("financeur", financeurSchema);
