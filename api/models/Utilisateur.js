const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const utilisateurSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true, //trim permet de supprimer les espaces
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, "Votre adresse mail n'est pas valide"],
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please fill a valid email address",
      // ],
    },

    password: {
      type: String,
      required: false,
      minlength: 6
    },

    noms: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

utilisateurSchema.pre("save", async function (next) {
  const user = this;
  if(user.password){
      user.password = await bcrypt.hash(user.password, 8);
  next();
  }

});

module.exports = mongoose.model("utilisateur", utilisateurSchema);
