const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema(
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
      required: true,
      enum: ["masculin", "feminin"],
      default: "masculin",
    },

    date_embauche: {
      type: Date,
      required: true,
    },
    pays: {
      type: String,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
    quartier: {
      type: String,
      required: true,
    },

    dateNaissance: {
      type: Date,
      required: true,
    },
    archive: {
      type: String,
      enum: ["archive", "nonArchive"],
      default: "nonArchive",
    },
    commentaire: {
      type: String,
      required: false,
    },
    salaire: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employe", employeSchema);
