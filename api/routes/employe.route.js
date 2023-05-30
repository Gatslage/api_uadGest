const controllers = require("../controllers/employeController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.creerEmploye);

router.get("/", controllers.consulterTousLesEmployes);

router.post("/rechercheEmail/:email", controllers.rechercherEmployes);

router.get("/recherche/:nom", controllers.rechercherEmployeparNom);

router.put("/:id", controllers.modifierEmploye);

router.put("/archiver/:id", controllers.archiverEmploye);

module.exports = router;
