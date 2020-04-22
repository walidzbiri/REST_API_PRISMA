const { check, validationResult } = require('express-validator');

const name_price_validator=[
    // the name property on the body object must respect some conditions
    check('name').isLength({min:4,max:20}),
    // the price property on the body object must be positive
    check('price').isFloat({gt:0}),
];

const product_id_validator=[
    // the product_id property on the params object must be int positive
    check('product_id').isInt({min:0})
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
    name_price_validator,
    product_id_validator,
    error_middleware
}