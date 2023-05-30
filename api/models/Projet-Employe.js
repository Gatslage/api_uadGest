const mongoose = require("mongoose");

const employe_projetSchema = new mongoose.Schema(
  {
    employe: {
      type: mongoose.Types.ObjectId,
      ref: "employe",
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
    mission: {
      type: String,
      maxlength: 150,
      required: true,
    },
    date_debut: {
      type: Date,
      required: true,
    },
    date_fin: {
      type: String,
      required: true,
    },
    date_debut_effectif: {
      type: Date,
      required: false,
    },
    date_fin_effectif: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employe_projet", employe_projetSchema);
