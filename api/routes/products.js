const express =require('express');
const router = express.Router();
const {  name_price_validator, 
        product_id_validator,
        error_middleware
      }= require('../../validation/product');
const {
      getAllProducts,
      createProduct,
      getOneProduct,
      deleteOneProduct,
      updateProduct
    }=require('../controllers/productController')
const uploadImage=require('../../helpers/uploadImage');
const verifyToken=require('../../helpers/verifyToken');
const {getCacheProducts}=require('../../helpers/cacheMiddlewares/products');


router.get('/',getCacheProducts,getAllProducts);
router.post('/',verifyToken,uploadImage.single("productImage"),name_price_validator,error_middleware,createProduct);
router.get('/:product_id',product_id_validator,error_middleware,getOneProduct);
router.delete('/:product_id',verifyToken,product_id_validator,error_middleware,deleteOneProduct)
router.patch('/:product_id',verifyToken,product_id_validator,error_middleware,name_price_validator,error_middleware,updateProduct);

module.exports=router;