const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt= require('bcrypt');
const jwt=require("jsonwebtoken");

const createUser=(req,res,next)=>{
    bcrypt.hash(req.body.password, 10,async function(err, hash) {
        // Store hash in database
        await prisma.user.create({
            data:{
                email:req.body.email,
                password: hash
            }
        }).then(user=>{
            res.json({message:"User signed up",data:user});
        }).catch(err=>{
            if(err.code=="P2002"){
                res.status(409).json({error:"Email already used"});
            }else{
                res.json({error:err});
            }
        });
    });
}
const getUser=async (req,res,next)=>{
    await prisma.user.findOne({
        where: {
          email: req.body.email,
        },
      }).then(user=>{
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            console.log(result);
            if(result==true){
                jwt.sign({data: user.id}, 'sgdkajhdbajdhg3||54354||adhvahdgzrewq', { expiresIn: '1h' },(err,token)=>{
                    if(err){
                        res.json({error:err});
                    }else{
                        res.json({message:"Login successfull",token});
                    }
                });
            }
            else{
                res.json({message:"Login unsuccessfull"});
            }
        });
      }).catch(err=>{
        res.json({error:err});
      });
}
const deleteUser=async (req,res,next)=>{
    await prisma.user.delete({
        where:{
            id: parseInt(req.params.user_id)
        }
    }).then(user=>{
        res.json({message:"user deleted",user});
    }).catch(err=>{
        res.status(404).json({error:"User to delete does not exist"});
    });
}

module.exports={
    createUser,
    getUser,
    deleteUser
}