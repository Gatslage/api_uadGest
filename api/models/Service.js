const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    archive: {
      type: String,
      enum: ["archive", "nonArchive"],
      default: "nonArchive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", serviceSchema);
