const mongoose = require("mongoose");

const projetSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "client",
      required: true,
    },
    chef: {
      type: mongoose.Types.ObjectId,
      ref: "employe",
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    but: {
      type: String,
      required: true,
    },
    statut: {
      type: String,
      enum: ["encours", "terminé", "suspendu"],
      default: "encours",
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
    date_creation: {
      type: Date,
      required: true,
    },    
    date_modification: {
      type: Date,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet", projetSchema);
