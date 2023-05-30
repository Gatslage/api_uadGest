const { projetService } = require("../models");
const models = require("../models");
const ProjetService = models.projetService;
const Projet = models.projet;

exports.affecterServiceSurProjet = (req, res) => {
  const creer = new projetService({
    service: req.body.service,
    projet: req.body.projet,
    montant: req.body.montant,
    date_contrat: req.body.date_contrat,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
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

exports.consulterServicesDunprojet = (req, res) => {
  ProjetService.find({
    projet: req.params.id,
  })
    .populate("projet service")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
//pour la fonctionnalité ci-dessus, ca naffiche pas le pourcentage davancement, ni celui de reglement de la fqacture.

exports.RechercherFacturationParId = (req, res) => {
  const id = req.params.id;
  ProjetService.findById({
    _id: id,
  })
    .populate("projet service")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.RechercherUneFacturationParProjetEtService = (req, res) => {
  const querry = {};
  if(req.query.idp ) querry.project = req.query.idp;
  if(req.query.ids ) querry.service = req.query.ids;
  
  
    ProjetService.find(querry)
      .populate("projet service")
      .exec()
      .then((positif) => {
        try{
          let result = [];
          positif.map((item)=>{
          Projet.find({_id: item.projet._id})
          .populate("client chef")
          .exec()
          .then((res)=>{
            item.projet = res[0];
            console.log(item.projet);
            result.push(item) 
          })

        })
        setTimeout(()=>{
          return res.status(200).json(result);
        },1000)
        }catch(ex){
          console.log(ex);
        }
       
        
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });

};

exports.modifierFacturation = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  if (req.body.service) modifier.service = req.body.service;
  if (req.body.projet) modifier.projet = req.body.projet;
  if (req.body.montant) modifier.montant = req.body.montant;
  if (req.body.pourcentage_avancement)
    modifier.pourcentage_avancement = req.body.pourcentage_avancement;
  if (req.body.poucentage_reglement_facture_totale)
    modifier.oucentage_reglement_facture_totale =
      req.body.oucentage_reglement_facture_totale;
  if (req.body.statut) modifier.statut = req.body.statut;
  if (req.body.date_contrat) modifier.date_contrat = req.body.date_contrat;
  if (req.body.date_debut) modifier.date_debut = req.body.date_debut;
  if (req.body.date_fin) modifier.date_fin = req.body.date_fin;

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierPourcentageAvancement = (req, res) => {
  const id = req.params.id;
  const modifier = {};

  if (req.body.pourcentage_avancement)
    modifier.pourcentage_avancement = req.body.pourcentage_avancement;

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierStatut = (req, res) => {
  const id = req.params.id;
  const modifier = {};

  if (req.body.statut) modifier.statut = req.body.statut;

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverFacturation = (req, res) => {
  const modifier = {};
  const id = req.params.id;
  modifier.archive = "archive";

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
