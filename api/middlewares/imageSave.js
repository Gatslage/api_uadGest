const bodyParser=require("body-parser");
const multer=require('multer');

const myStorage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'../docPP')
    },
    filename:(req,file,callBack)=>{
        var filetype=file.mimetype.split("/")[1];
       
        a.split()
        callBack(null,file.filename)
    }
})

exports.upload=multer({storage:myStorage})

