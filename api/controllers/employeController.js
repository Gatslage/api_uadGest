const { find } = require("../models/Client");
const Financeur = require("../models/Financeur");
const bcrypt = require("bcryptjs");
const { employe } = require("../models/index");
const models = require("../models/index");
const Employe = models.employe;

exports.creerEmploye = (req, res) => {
  Employe.find({ $and: [{ nom: req.body.nom }, { email: req.body.email }] })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)return res.json({ message: "cet employe existe deja" });


      const creer = new Employe({
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        email: req.body.email,
        sexe: req.body.sexe,
        dateNaissance: req.body.dateNaissance,
        date_embauche: req.body.date_embauche,
        pays: req.body.pays,
        ville: req.body.ville,
        quartier: req.body.quartier,
        salaire: req.body.salaire,
      });

      creer
        .save()
        .then((positif) => {
          return res.status(201).json(positif);
        })
        .catch((negatif) => {
          return res.status(500).json(negatif);
        });
    });
};

exports.consulterTousLesEmployes = (req, res) => {
  const status = req.query.archivage;
  if (req.query.archivage) {
    Employe.find({
      archive: status,
    })
      .sort({
        nom: 1,
      })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Employe.find()
      .sort({
        nom: 1,
      })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.rechercherEmployes = (req, res) => {
  const em = req.params.email;
  Employe.find({email:em})
    .exec()
    .then((positif) => {
      console.log(positif)
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.rechercherEmployeparNom = (req, res) => {
  const nom = req.params.nom;
  Employe.find({
    nom: nom,
  })
    .exec()
    .then((positif) => {
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierEmploye = (req, res) => {
  const modifier = {};
  const id = req.params.id;

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.prenom) modifier.prenom = req.body.prenom;
  if (req.body.telephone) modifier.telephone = req.body.telephone;
  if (req.body.email) modifier.email = req.body.email;
  if (req.body.pays) modifier.pays = req.body.pays;
  if (req.body.ville) modifier.ville = req.body.ville;
  if (req.body.quartier) modifier.quartier = req.body.quartier;
  if (req.body.sexe) modifier.sexe = req.body.sexe;
  if (req.body.dateNaissance) modifier.dateNaissance = req.body.dateNaissance;
  if (req.body.archive) modifier.archive = req.body.archive;
  if (req.body.salaire) modifier.salaire = req.body.salaire;
  if (req.body.commentaire) modifier.commentaire = req.body.commentaire;

  Employe.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverEmploye = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  modifier.archive = "archive";

  Employe.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
