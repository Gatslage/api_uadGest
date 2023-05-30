const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.client = require("./Client");
db.employe = require("./Employe");
db.financeur = require("./Financeur");
db.service = require("./Service");
db.poste = require("./poste");
db.projet = require("./Projet");
db.projetEmploye = require("./Projet-Employe");
db.projetFinanceur = require("./Projet-Financeur");
db.projetService = require("./Projet-Service");
db.employeProjet = require("./Employe-Poste");
db.utilisateur = require("./Utilisateur");
db.employePoste = require("./Employe-Poste");
module.exports = db;
