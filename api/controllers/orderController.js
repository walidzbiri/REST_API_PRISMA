const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllOrders=async (req,res,next)=>{
    const orders=await prisma.order.findMany();
        res.json({message:"Getting orders",data:orders});
};

const createOrder=async (req,res,next)=>{
    await prisma.order.create({
         data:{
             product: {
                 connect: {id: req.body.productId}
             },
             quantity: req.body.quantity
         }
     }).then(order=>{
         res.json({message:"order created",data:order});
     }).catch(err=>{
         res.json({error:`There is no product with id ${req.body.productId}`});
     });
 };

 const getOneOrder=async (req,res,next)=>{
    const orderById = await prisma.order.findOne({ where: { id: parseInt(req.params.order_id) } })
        if(orderById == null)
            res.status(404).json({message:`no order with id:${req.params.order_id} detected`});
        else{
            res.json({message:"Getting order with id",data:orderById});
        }
}

const deleteOrder=async (req,res,next)=>{
    await prisma.order.delete({
        where: { id: parseInt(req.params.order_id) },
      }).then(deletedOrder=>{
        res.json({message:"specific order deleted",data:deletedOrder});
      }).catch(err=>{
        res.status(404).json({message:`no order with id:${req.params.order_id} detected`});
      });
}
module.exports={
    getAllOrders,
    createOrder,
    getOneOrder,
    deleteOrder
}
