const controllers = require("../controllers/serviceController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.creerService);

router.get("/", controllers.consulterTousLesServices);
//router.get("/plusieurs", controllers.consulterTousLesServices)  cette route ne peut etre executer que si elle passe avant celle du bas
router.get("/recherche/", controllers.rechercherUnServiceParSonNom);

router.get("/:id", controllers.recupererUnService);

router.put("/:id", controllers.modifierService);

router.put("/archiver/:id", controllers.archiverService);

module.exports = router;
