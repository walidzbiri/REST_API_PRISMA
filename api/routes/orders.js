const express =require('express');
const router = express.Router();
const {
    productId_quantity_validator,
    error_middleware
}=require('../../validation/order');
const {
    getAllOrders,
    createOrder,
    getOneOrder,
    deleteOrder
}=require('../controllers/orderController');
const verifyToken=require('../../helpers/verifyToken');


router.get('/',verifyToken,getAllOrders);
router.post('/',verifyToken,productId_quantity_validator,error_middleware,createOrder);
router.get('/:order_id',verifyToken,getOneOrder);
router.delete('/:order_id',verifyToken,deleteOrder);

module.exports=router;