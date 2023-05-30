const controllers = require("../controllers/projetemployeController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.AffecterEmployeSurProjet);

router.get("/:id", controllers.consulterEmployesAffectesSurUnProjet);

router.get(
  "/consulterMissionsEmploye/:id",
  controllers.consulterMissionsSurLesquelsUnEmployeEstAffecte
);
router.get(
  "/projet/chef/:idchef",
  controllers.consulterProjetsSurlesquelsUnEmployeEstChef
);

router.get("/employes/ou/chef/:idchef", controllers.consulterEmployesOuChef);

router.get("/employes/missions/", controllers.consulterMissionSurTousProjet);

router.get(
  "/consulter/une/affectation/unique/:idAffectation",
  controllers.consulterUneAffectation
);

router.put("/ModifAffect/:idAffectation", controllers.modifierUneAffectation);

router.put("/:idAffectation", controllers.archiverAffectation);

router.put(
  "/modif/dateFinE/:idAffectation",
  controllers.modifierDateFinEffectif
);

router.put("/modif/statut/A/:idchef", controllers.modifierStatut);

module.exports = router;
