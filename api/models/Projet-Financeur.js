const mongoose = require("mongoose");

const financeur_projetSchema = new mongoose.Schema(
  {
    financeur: {
      type: mongoose.Types.ObjectId,
      ref: "financeur",
      required: true,
    },
    projet: {
      type: mongoose.Types.ObjectId,
      ref: "projet",
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
    montant: {
      type: Number,
      // required: true,
    },
    date_financement: {
      type: Date,
      required: true,
    },
    periodicite: {
      type: String,
      required: false,
    },
    duree: {
      type: String,
      required: false,
    },
    date_retour_sur_investissement: {
      type: String,
      required: false,
    },
    montant_total: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["don", "investissement"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet_financeur", financeur_projetSchema);
