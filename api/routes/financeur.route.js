const controllers = require("../controllers/financeurController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.creerFinanceur);

router.get("/", controllers.consulterTousLesFinanceurs);

router.get("/nom/:nom", controllers.rechercherUnFinanceurParNom);

router.get("/:id", controllers.rechercherUnFinanceurParId);

router.put("/:id", controllers.modifierFinanceur);

router.put("/archiver/:id", controllers.archiverFinanceur);

module.exports = router;
