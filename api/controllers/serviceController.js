const models = require("../models/index");
const Service = models.service;

exports.creerService = (req, res) => {
  Service.find({ nom: req.body.nom })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.json({ message: "Ce service existe deja" });

      const creer = new Service({
        description: req.body.description,
        nom: req.body.nom,
      });
      creer
        .save()
        .then((positif) => {
          return res.status(201).json(positif);
        })
        .catch((negatif) => {
          console.log(negatif);
          return res.status(500).json(negatif);
        });
    });
};

exports.consulterTousLesServices = (req, res) => {
  const status = req.query.archivage;
  if (req.query.archivage) {
    Service.find({
      archive: status, //$and: [{archive: false}, {archive: false}] lorsquon veut mettre des contraintes
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
    Service.find()
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

exports.recupererUnService = (req, res) => {
  const id = req.params.id;
  const statut = req.query.archivage;
  if (req.query.archivage) {
    Service.find({ $and: [{ _id: id }, { archive: statut }] })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Service.find()
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.rechercherUnServiceParSonNom = (req, res) => {
  const nom = req.body.nom;
  const statut = req.query.archivage;
  if (req.query.archivage) {
    Service.find({ $and: [{ nom: nom }, { archive: statut }] })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        console.log(negatif);
        return res.status(500).json(negatif);
      });
  } else {
    Service.find()
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.modifierService = (req, res) => {
  const modifier = {};
  const id = req.params.id;

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.description) modifier.description = req.body.description;

  Service.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverService = (req, res) => {
  const id = req.params.id;
  const archivage = {};
  archivage.archive = "archive";
  Service.updateOne({ _id: id }, { $set: archivage })
    .then((positif) => {
      console.log("archivage reussi");
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
