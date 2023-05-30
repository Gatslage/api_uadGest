const mongoose = require("mongoose");

const projet_serviceSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Types.ObjectId,
      ref: "service",
      required: true,
    },
    projet: {
      type: mongoose.Types.ObjectId,
      ref: "projet",
      required: true,
    },
    pourcentage_avancement: {
      type: Number,
      required: false,
    },
    // poucentage_reglement_facture_totale: {
    //   type: Number,
    //   required: false,
    // },
    reste_a_verser: {
      type: Number,
      required: false,
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
      required: true,
    },
    date_contrat: {
      type: Date,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet_service", projet_serviceSchema);
