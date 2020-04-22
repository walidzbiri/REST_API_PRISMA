const express =require('express');
const {email_pass_validator, error_middleware, user_id_validation} = require('../../validation/users');
const {
    createUser,
    getUser,
    deleteUser
}=require('../controllers/userController');

// initialize express router
const router = express.Router();

router.post('/signup',email_pass_validator,error_middleware,createUser);
router.post("/login",getUser);
router.delete("/:user_id",user_id_validation,error_middleware,deleteUser);

module.exports=router;