const mongoose = require("mongoose");

const posteSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  archive: {
    type: String,
    enum: ["archive", "nonArchive"],
    default: "nonArchive",
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("poste", posteSchema);
