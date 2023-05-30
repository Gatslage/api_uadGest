const models = require("../models/index");
const Financeur = models.financeur;

exports.creerFinanceur = (req, res) => {
  Financeur.find({ nom: req.body.nom })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.status().json({ message: "Ce financeur existe déjà" });

      const creer = new Financeur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        sexe: req.body.sexe,
        email: req.body.email,
        telephone: req.body.telephone,
        type: req.body.type,
        pays: req.body.pays,
        ville: req.body.ville,
        quartier: req.body.quartier,
        date_naissance: req.body.date_naissance,
        date_partenariat: req.body.date_partenariat,
        commentaire: req.body.commentaire,
        secteur_activite: req.body.secteur_activite,
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

exports.consulterTousLesFinanceurs = (req, res) => {
  const status = req.query.archivage;
  if (req.query.archivage) {
    Financeur.find({
      archive: status,
    })
      .sort({
        nom: 1,
      })
      .select("nom email telephone type qualite pays commentaire")
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Financeur.find()
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

exports.rechercherUnFinanceurParNom = (req, res) => {
  const nom = req.params.nom;
  Financeur.find({
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

exports.rechercherUnFinanceurParId = (req, res) => {
  const id = req.params.id;
  const statut = req.query.archivage;

  if (statut) {
    Financeur.find({
      $and: [{ _id: id }, { archive: statut }],
    })
      .exec()
      .then((positif) => {
        return res.status(201).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Financeur.find()
      .sort({
        nom: 1,
      })
      .populate()
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};
exports.modifierFinanceur = (req, res) => {
  const modifier = {};
  const id = req.params.id;

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.prenom) modifier.prenom = req.body.prenom;
  if (req.body.email) modifier.email = req.body.email;
  if (req.body.telephone) modifier.telephone = req.body.telephone;
  if (req.body.type) modifier.type = req.body.type;
  if (req.body.qualite) modifier.qualite = req.body.qualite;
  if (req.body.pays) modifier.pays = req.body.pays;
  if (req.body.ville) modifier.ville = req.body.ville;
  if (req.body.quartier) modifier.quartier = req.body.quartier;
  if (req.body.commentaire) modifier.commentaire = req.body.commentaire;

  Financeur.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverFinanceur = (req, res) => {
  const id = req.params.id;
  const modifier = {};

  modifier.archive = "archive";

  Financeur.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
