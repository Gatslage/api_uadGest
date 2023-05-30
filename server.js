const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

mongoose.Promise = global.Promise;
//connection à la base de données
mongoose
  .connect("mongodb://localhost:27017/uadBD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connexion à la base de donnée établie");
  })
  .catch((e) => {
    console.log("erreur de connexion :" + e + "on passe en local :");
  });

const serviceRoute = require("./api/routes/service.routes");
const financeurRoute = require("./api/routes/financeur.route");
const employeRoute = require("./api/routes/employe.route");
const clientRoute = require("./api/routes/client.route");
const projetRoute = require("./api/routes/projet.route");
const projetemployeRoute = require("./api/routes/projetemploye.route");
const projetserviceRoute = require("./api/routes/projetservice.route");
const projetfinanceurRoute = require("./api/routes/projetfinanceur.route");
const utilisateurRoute = require("./api/routes/utilisateur.route");
const posteRoute = require("./api/routes/poste.routes");
const employeposteRoute = require("./api/routes/employeposte.routes");
//set Midllewares
app.use(express.static('api/routes/docPP'));
app.use(bodyParser.json());
//app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, auth-token, token, access-token"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
//app.use(helmet());
// Import des routes
app.use("/api/service", serviceRoute);
app.use("/api/financeur", financeurRoute);
app.use("/api/employe", employeRoute);
app.use("/api/client", clientRoute);
app.use("/api/projet", projetRoute);
app.use("/api/projetemploye", projetemployeRoute);
app.use("/api/projetservice", projetserviceRoute);
app.use("/api/projetfinanceur", projetfinanceurRoute);
app.use("/api/utilisateur", utilisateurRoute);
app.use("/api/poste", posteRoute);
app.use("/api/employeposte", employeposteRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenue sur uad-api",
  });
});

//lancement
app.listen(3000, () => console.log("server Start"));
