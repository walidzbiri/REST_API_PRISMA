const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

const getCacheProducts= (req, res, next) =>{
    client.hgetall("products", (err, data) => {
      if (err) throw err;
      if (data !== null) {
        let allProducts=[];
        Object.keys(data).forEach(key=>{
            allProducts.push(JSON.parse(data[key]));
        })
        res.json({message:"Getting products",data:allProducts});
      } else {
        next();
      }
    });
}

const setCacheProducts=(products)=>{
  products.forEach((product)=>{
    client.hset("products", product.id.toString(),JSON.stringify(product));
  });
  client.expire("products",3600);
}
module.exports= {getCacheProducts,setCacheProducts};