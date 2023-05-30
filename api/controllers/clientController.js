const models = require("../models/index");
const Client = models.client;

exports.creerClient = (req, res) => {
  Client.find({ nom: req.body.nom })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.json({ message: "ce client existe déjà" });

      const creer = new Client({
        nom: req.body.nom,
        prenom: req.body.prenom,
        type: req.body.type,
        telephone: req.body.telephone,
        email: req.body.email,
        sexe: req.body.sexe,
        pays: req.body.pays,
        ville: req.body.ville,
        quartier: req.body.quartier,
        date_partenariat: req.body.date_partenariat,
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

exports.consulterTousLesClients = (req, res) => {

  let body ={}; 
  if(req.body)body= req.body;
  console.log(body)
    Client.find(body)
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
  
};

exports.rechercherClient = (req, res) => {
  const statut = req.query.archivage;
  const id = req.params.id;
  if (req.query.archivage) {
    Client.find({
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
    Client.find()
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

exports.rechercherclientparNom = (req, res) => {
  const statut = req.query.archivage;
  if (req.query.archivage) {
    Client.find({
      $and: [{ nom: req.body.nom }, { archive: statut }],
    })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })

      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Client.find()
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

exports.modifierClient = (req, res) => {
  const id = req.params.id;
  const modifier = {}; //type,telephone,email,archive, pays, ville, quartier

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.prenom) modifier.prenom = req.body.prenom;
  if (req.body.type) modifier.type = req.body.type;
  if (req.body.telephone) modifier.telephone = req.body.telephone;
  if (req.body.email) modifier.email = req.body.email;
  if (req.body.sexe) modifier.sexe = req.body.sexe;
  if (req.body.pays) modifier.pays = req.body.pays;
  if (req.body.ville) modifier.ville = req.body.ville;
  if (req.body.quartier) modifier.quartier = req.body.quartier;
  if (req.body.commentaire) modifier.commentaire = req.body.commentaire;

  Client.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverClient = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  modifier.archive = "archive";

  Client.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
