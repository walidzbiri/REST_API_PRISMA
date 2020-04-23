const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { setCacheProducts} =require('../../helpers/cacheMiddlewares/products');

const getAllProducts=async (req,res,next)=>{
    const products=await prisma.product.findMany();
    setCacheProducts(products);
    res.json({message:"Getting products",data:products});
}

const createProduct=async (req,res,next)=>{
    const product=await prisma.product.create({
        data:{
            name:req.body.name,
            price: parseFloat(req.body.price),
            image: req.file.filename
        }
    });
    res.json({message:"product created",data:product});
}

const getOneProduct=async (req,res,next)=>{
    const productById = await prisma.product.findOne({ where: { id: parseInt(req.params.product_id) } })
    if(productById == null)
        res.status(404).json({message:`no product with id:${req.params.product_id} detected`});
    else{
        res.json({message:"Getting product with id",data:productById});
    }
}

const deleteOneProduct=async (req,res,next)=>{
    await prisma.product.delete({
    where: { id: parseInt(req.params.product_id) },
  }).then(deletedProduct=>{
    res.json({message:"specific order deleted",data:deletedProduct});
  }).catch(err=>{
      if(err.code==="P2016"){
        res.status(404).json({error:`no product with id:${req.params.product_id} detected`});
      }
      else if(err.code=="P2014"){
        res.status(401).json({error:`product with id:${req.params.product_id} is in relation with some orders`});
      }
  });
}

const updateProduct=async (req,res,next)=>{
    await prisma.product.update({
        data: { name: req.body.name, price:req.body.price },
        where: { id: parseInt(req.params.product_id)},
      }).then(updatedProduct=>{
        res.json({message:"Updating product with id",data:updatedProduct});
      }).catch(err=>{
        res.status(404).json({message:`no product with id:${req.params.product_id} detected`});
      });
}

module.exports={
    getAllProducts,
    createProduct,
    getOneProduct,
    deleteOneProduct,
    updateProduct
}