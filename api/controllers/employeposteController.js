const models = require("../models/index");
const Employe_poste = models.employePoste;

exports.AffecterPosteEmploye = (req, res) => {
  let message = "";
  Employe_poste.find({
    employe: req.body.employe,
  })
    .exec()
    .then((affirmatif) => {
      affirmatif.map((item) => {
        if (item.poste == req.body.poste) {
          message = "cet employe a déjà ce poste";
          if (item.principal == true) {
            message = "cet employe a déjà ce poste et il est principal";
            return res.json({ message: message });
          }
          return res.json({ message: message });
        } else if (item.principal == true) {
          message = "cet employe a déjà un poste principal";
          return res.json({ message: message });
        }
      });

      const creer = new Employe_poste({
        employe: req.body.employe,
        poste: req.body.poste,
        grade: req.body.grade,
        principal: req.body.principal,
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
exports.consulterLesPostesEmploye = (req, res) => {
  Employe_poste.find({
    employe: req.params.id,
  })
    .populate("employe poste")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterPostePrincipal = (req, res) => {
  Employe_poste.findOne({
    employe: req.params.id,
    principal: true,
  })
    //.select("employe")
    .populate("poste employe")
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

  if (req.body.grade) modifier.grade = req.body.grade;
  if (req.body.principal) modifier.principal = req.body.principal;
  if (req.body.archive) modifier.archive = req.body.archive;

  Employe_poste.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
