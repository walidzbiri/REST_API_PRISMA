const { check, validationResult } = require('express-validator');

const productId_quantity_validator=[
    // the name property on the body object must respect some conditions
    check('productId').isInt({min:1}),
    // the price property on the body object must be positive
    check('quantity').isInt({min:1}),
];

const error_middleware=(req,res,next)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

module.exports={
    productId_quantity_validator,
    error_middleware
}