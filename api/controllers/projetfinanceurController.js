const models = require("../models");
const Projet = require("../models/Projet");
const ProjetFinanceur = models.projetFinanceur;

exports.affecterFinanceurSurprojet = (req, res) => {
  const creer = new ProjetFinanceur({
    financeur: req.body.financeur,
    projet: req.body.projet,
    type: req.body.type,
    montant: req.body.montant,
    date_contrat: req.body.date_contrat,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    periodicite: req.body.periodicite,
    duree: req.body.duree,
    date_retour_sur_investissement: req.body.date_retour_sur_investissement,
    montant_total: req.body.montant_total,
  });

  creer
    .save()
    .then((positif) => {
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterFinancementsSurUnProjet = (req, res) => {
  const id = req.params.idprojet;
  const nombre = 0;
  ProjetFinanceur.find({
    projet: id,
  })
    .populate("projet financeur")
    .exec()
    .then((positif) => {
      console.log(positif);

      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterLeNombreDeFinancementsSurUnProjet = (req, res) => {
  const id = req.params.idprojet;
  const nombre = 0;
  ProjetFinanceur.find({
    projet: id,
  })
    .populate("projet financeur")
    .exec()
    .then((positif) => {
      console.log(positif);

      return res.status(200).json({ taille: positif.length });
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterUnFinancement = (req, res) => {
  const id = req.params.idfinancement;

  ProjetFinanceur.find({
    _id: id,
  })
    .populate("projet financeur")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterFinancementsfaitsParUnFinanceurSurUnProjet = (req, res) => {
  const idp = req.params.idprojet;
  const idf = req.params.idfinanceur;

  ProjetFinanceur.find({
    financeur: idf,
    projet: idp,
  })
    .populate("financeur projet")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterLeNombreDeFinancementsfaitsParUnFinanceurSurUnProjet = (
  req,
  res
) => {
  const idp = req.params.idprojet;
  const idf = req.params.idfinanceur;

  ProjetFinanceur.find({
    financeur: idf,
    projet: idp,
  })
    .populate("financeur projet")
    .exec()
    .then((positif) => {
      return res.status(200).json({ taille: positif.length });
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierUnFinancement = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  if (req.body.projet) modifier.projet = req.body.projet;
  if (req.body.financeur) modifier.financeur = req.body.financeur;
  if (req.body.type) modifier.type = req.body.type;
  if (req.body.montant) modifier.montant = req.body.montant;
  if (req.body.date_contrat) modifier.date_contrat = req.body.date_contrat;
  if (req.body.date_debut) modifier.date_debut = req.body.date_debut;
  if (req.body.date_fin) modifier.date_fin = req.body.date_fin;
  if (req.body.periodicite) modifier.periodicite = req.body.periodicite;
  if (req.body.duree) modifier.duree = req.body.duree;
  if (req.body.date_retour_sur_investissement)
    modifier.date_retour_sur_investissement;
  if (req.body.statut) modifier.statut = req.body.statut;
  if (req.body.montant_total) modifier.montant_total = req.body.montant_total;

  ProjetFinanceur.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
