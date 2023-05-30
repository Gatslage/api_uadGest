const models = require("../models/index");
const Poste = models.poste;

exports.creerPoste = (req, res) => {
  Poste.find({ nom: req.body.nom })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.status(200).json("ce poste existe deja");

      const creer = new Poste({
        nom: req.body.nom,
        description: req.body.description,
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



exports.consulterPoste = (req, res) => {
  const statut = req.query.archivage;
  if (req.query.archivage) {
    Poste.find({
      archive: statut,
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
    Poste.find({})
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

exports.archiverPoste = (req, res) => {
  const modifier = {};
  const id = req.params.id;
  modifier.archive = "archive";

  Poste.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierPoste = (req, res) => {
  const modifier = {};
  const id = req.params.id;

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.description) modifier.description = req.body.description;

  Poste.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.rechercherPoste = (req, res) => {
  const statut = req.query.archivage;
  const id = req.params.id;
  if (req.query.archivage) {
    Poste.find({
      $and: [{ _id: id }, { archive: statut }], //  $and: [{archive: false}, {archive: false}]
    })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Poste.find()
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

  exports.rechercherPosteParNom = (req, res) => {
    const statut = req.query.archivage;
    if (req.query.archivage) {
      Poste.find({
        $and: [{ nom: req.body.nom }, { archive: statut }], //  $and: [{archive: false}, {archive: false}]
      })
        .exec()
        .then((positif) => {
          return res.status(200).json(positif);
        })
        .catch((negatif) => {
          return res.status(500).json(negatif);
        });
    } else {
      Poste.find()
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
};
