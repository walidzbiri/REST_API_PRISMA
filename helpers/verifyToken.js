const jwt = require('jsonwebtoken');


module.exports=(req,res,next)=>{
    const userToken= req.headers.hasOwnProperty('authorization') ? req.headers.authorization.split(" ")[1] : null
    jwt.verify(userToken,"sgdkajhdbajdhg3||54354||adhvahdgzrewq",(err,decoded)=>{
        if(err){
            res.status(401).json({error:"Authentication failed"});
        }else{
            console.log(decoded);
            req.userData=decoded;// token payload
            next();
        }
    });
}