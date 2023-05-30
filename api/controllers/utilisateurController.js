const models = require("../models/index");
const Utilisateur = models.utilisateur;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const { utilisateur } = require("../models/index");

exports.inscription = async (req, res) => {
  //cryptons le mot de passe
  let nouveau;
  if(req.body.password){
  console.log(mdpCrypt+" voici le mot crypté")
  nouveau = new Utilisateur({
    noms: req.body.noms,
    email: req.body.email,
    password: req.body.password,
  });
  }else{
   
    nouveau = new Utilisateur({
      noms: req.body.noms,
      email: req.body.email
    });
 }

  //faisons l'enregistrement
  try{ 
    console.log(" ggg sans mot")
      const eng=await nouveau.save();
      console.log("positif");
      console.log(eng.password+" voici le nouveau faux")
      return res.status(201).json(eng);
  }catch(negatif){
         console.log(negatif);
      return res.status(500).json(negatif); 
  }




};

exports.seConnecter = (req, res) => {
 /* const hp=async()=>{
    const hash=await bcrypt.hash("mongodip",10)
    console.log(hash)
    console.log(await bcrypt.compare("mongodip",hash))

  }
hp()*/


  Utilisateur.findOne({
    email: req.body.email,
  }).exec().then(async (user) => {

    if (!user) {
      return res
        .status(200)
        .send({ message: "email incorrect" });
    }
    console.log(user.password)
    if(user.password!=undefined){
    var passwordIsValid =await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res
        .status(200)
        .send({ message: "mot de passe incorrect" });
    }
   }else{
     
  console.log("premiere fois")
   }
         var token = jwt.sign({ id: user._id }, "tomate", {
      expiresIn: 86400, // 24 hours
    });
    console.log("REUSSIE")
    res.status(200).send({
      _id: user._id,
      noms: user.noms,
      email: user.email,
      password:user.password,
      role: user.role,
      accessToken: token,
    });

    

  

  }).catch((err)={
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
};

exports.modifier=async (req,res)=>{
  console.log(req.body)
if(req.body.password)req.body.password = await bcrypt.hash(req.body.password, 10);
  
  Utilisateur.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(async (re) => {
      const user= await utilisateur.findOne({_id:req.params.id}).exec()
      var token = jwt.sign({ id: user._id }, "tomate", {
        expiresIn: 86400, // 24 hours
      });
      console.log(user)
      res.status(200).send({
        _id: user._id,
        noms: user.noms,
        email: user.email,
        password:user.password,
        accessToken: token,
      });
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });

    exports.uploadImg=(req,res)=>{
      let file=req.file;
      console.log(file.filename)
      console.log("maintenant"+file.filename)
      if(!file){
        const error=new Error('no File');
        error.httpStatusCode=400
        return next(error)
      }
      res.send(file);
    }
    exports.downloadImg=(req,res)=>{
      
    }
}

exports.recuperer=(req,res)=>{
    Utilisateur.find(req.body)
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });

}