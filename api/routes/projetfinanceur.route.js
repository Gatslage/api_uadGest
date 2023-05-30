const controllers = require("../controllers/projetfinanceurController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.affecterFinanceurSurprojet);

router.get("/:idprojet", controllers.consulterFinancementsSurUnProjet);

router.get("/financement/:idfinancement", controllers.consulterUnFinancement);

router.get(
  "/financement/:idprojet/:idfinanceur",
  controllers.consulterFinancementsfaitsParUnFinanceurSurUnProjet
);

router.get(
  "/nombre/de/financements/faits/:idprojet/:idfinanceur",
  controllers.consulterLeNombreDeFinancementsfaitsParUnFinanceurSurUnProjet
);

router.get(
  "/nombre/de/financements/:idprojet",
  controllers.consulterLeNombreDeFinancementsSurUnProjet
);

router.put("/:id", controllers.modifierUnFinancement);

module.exports = router;
