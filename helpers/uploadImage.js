let multer  = require('multer');
const mime=require('mime');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.'+mime.getExtension(file.mimetype));
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 5242880 
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
            cb(null, true)
        }
        else{
            cb(null, false)
        }
    }
});

module.exports=upload;