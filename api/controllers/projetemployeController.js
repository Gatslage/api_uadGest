const models = require("../models");
const Projet = require("../models/Projet");
const ProjetEmploye = models.projetEmploye;
const Employe = models.employe;

exports.AffecterEmployeSurProjet = (req, res) => {
  const creer = new ProjetEmploye({
    employe: req.body.employe,
    projet: req.body.projet,
    mission: req.body.mission,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    date_debut_effectif: req.body.date_debut_effectif,
    date_fin_effectif: req.body.date_fin_effectif,
    statut:req.body.statut
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

exports.consulterEmployesAffectesSurUnProjet = (req, res) => {
  ProjetEmploye.find({
    projet: req.params.id,
  })
    .select("mission")
    .populate("projet employe")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterMissionsSurLesquelsUnEmployeEstAffecte = (req, res) => {
  ProjetEmploye.find({
    employe: req.params.id,
  })
    //.select("employe")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterProjetsSurlesquelsUnEmployeEstChef = (req, res) => {
  ProjetEmploye.find({
    chef: req.params.idchef,
  })
    .populate("projet employe")
    .select("projet")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(200).json(negatif);
    });
};

exports.consulterEmployesDisponibles = (req, res) => {
  Employe.find({
    archive: status,
  })
    .sort({
      nom: 1,
    })
    .exec()
    .then((positif1) => {
      return res.status(200).json(positif1);
    })
    .then((negatif1) => {
      return res.status(500).json(negatif1);
    });

  ProjetEmploye.find({
    projet: req.params.id,
  })
    .select("mission")
    .populate("projet employe")
    .exec()
    .then((positif2) => {
      return res.status(200).json(positif2);
    })
    .catch((negatif2) => {
      return res.status(500).json(negatif2);
    });
};

exports.consulterEmployesOuChef = (req, res) => {
  const id = req.params.idchef;
  ProjetEmploye.find({
    chef: id,
  })
    .select("employe")
    .populate("employe")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterMissionSurTousProjet = (req, res) => {
  
  Projet.find({});
};

exports.consulterUneAffectation = (req, res) => {
  const id = req.params.idAffectation;

  ProjetEmploye.findById(id)
    .populate("projet employe")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierUneAffectation = (req, res) => {
  const modifier = {};
  const id = req.params.idAffectation;

  if (req.body.mission) modifier.mission = req.body.mission;
  if (req.body.date_debut) modifier.date_debut = req.body.date_debut;
  if (req.body.date_fin) modifier.date_fin = req.body.date_fin;
  if (req.body.date_debut_effectif) modifier.date_debut_effectif;
  if (req.body.employe) modifier.employe = req.body.employe;

  ProjetEmploye.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverAffectation = (req, res) => {
  const modifier = {};
  const id = req.params.idAffectation;
  modifier.archive = "archive";

  ProjetEmploye.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierDateFinEffectif = (req, res) => {
  const modifier = {};
  const id = req.params.idAffectation;
  modifier.date_fin_effectif = req.body.date_fin_effectif;

  ProjetEmploye.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierStatut = (req, res) => {
  const id = req.params.idChef;

  const modifier = {};
  modifier.statut = req.body.statut;
  ProjetEmploye.find({
    chef: req.params.idchef,
  })
    .populate("employe projet")
    .then((posi) => {
      return res.status(200).json(posi);
    })
    .catch((nega) => {
      return res.status(500).json(nega);
    });

  ProjetEmploye.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
