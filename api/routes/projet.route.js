const controllers = require("../controllers/projetController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.creerPojet);

router.get("/", controllers.consulterProjet);

router.get("/projetsclient/:idClient", controllers.consulterProjetsDunClient);

router.get("/projets/chef/:idChef", controllers.consulterProjetsDunChef);

router.put("/:id", controllers.modifierProjet);

/////////////////////////////////////////////////////////////
// a mettre  dans un seul controller

router.put("/archiver/:id", controllers.archiverProjet);

router.put("/statut/:id", controllers.modifierStatutProjet);
///////////////////////////////////////////////////////////////

module.exports = router;
