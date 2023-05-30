const controllers = require("../controllers/utilisateurController");
const express = require("express");
const router = express.Router();
const multer=require('multer');
var path = require('path');

var myStorage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,path.join(__dirname,'/docPP'))
    },
    filename:(req,file,callBack)=>{
        var filetype=file.mimetype.split("/")[1];
        console.log(file.originalname)
        callBack(null,file.originalname+'.'+filetype)
    }

});

var upload=multer({storage:myStorage})

router.post("/recuperer",controllers.recuperer);
router.post("/", controllers.inscription);
router.post("/connexion/", controllers.seConnecter);
router.post("/modifier/:id", controllers.modifier); 
router.post("/upload/",upload.single('newPP'),(req,res,next)=>{
    console.log("ccccccccccccccccccthis.imageName.toString()")
    let file=req.file;
      if(!file){
        const error=new Error('no File');
        error.httpStatusCode=400
        return next(error)
      }
      res.send(file);
})
router.post("/download/",(req,res,next)=>{
    console.log("envoie du fichier")
    var filepath=path.join(__dirname,'/docPP')+'/'+req.body.filename
    res.download(filepath)
    //res.sendFile(filepath);
})
module.exports = router;
