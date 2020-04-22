const express=require('express');
const morgan= require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creating express app
const app =express();
const port= process.env.POSRT || 3000;

// Api Routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

//Adding cors middleware to enable all CORS requests
app.use(cors()); 
// using the morgan logger middleware
app.use(morgan('dev'));
// using body parser middleware to parse the body of incoming requests with url encoded or json data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving /images as a static folder
app.use('/images',express.static("images"));

// Handled routes
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes);

// Error handling
app.use((req,res,next)=>{
    const error=new Error("Not found");
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({error:{message:error.message}});
});

// starting server
app.listen(port,()=>{
    console.log("server listening on port 3000")
})