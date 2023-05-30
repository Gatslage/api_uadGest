const mongoose = require("mongoose");

const employe_posteSchema = new mongoose.Schema({
  principal: {
    type: Boolean,
    default: false,
  },
  grade: {
    type: Number,
    default: 1,
  },
  employe: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "employe",
  },
  poste: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "poste",
  },
  archive: {
    type: String,
    enum: ["archive", "nonArchive"],
    default: "nonArchive",
  },
  //1=employe simple, 2=chef de projet, 3= admin
});

module.exports = mongoose.model("Employe_poste", employe_posteSchema);
