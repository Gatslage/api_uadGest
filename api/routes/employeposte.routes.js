const controllers = require("../controllers/employeposteController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.AffecterPosteEmploye);

router.get("/:id", controllers.consulterLesPostesEmploye);

router.get("/principal/:id", controllers.consulterPostePrincipal);

router.put("/:id", controllers.modifierUneAffectation);

module.exports = router;
