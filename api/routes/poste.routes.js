const controllers = require("../controllers/posteController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.creerPoste);

router.get("/", controllers.consulterPoste);

// router.get("/rechercher", controllers.rechercherPosteParNom);

router.get("/:id", controllers.rechercherPoste);

router.put("/:id", controllers.modifierPoste);

router.put("/archiver/:id", controllers.archiverPoste);

module.exports = router;
