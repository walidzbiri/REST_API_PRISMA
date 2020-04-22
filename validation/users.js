const { check, validationResult } = require('express-validator');

const email_pass_validator=[
    // the name property on the body object must respect some conditions
    check('email').isEmail(),
    // the password property on the body object
    check('password').isLength({min:8}),
];

const user_id_validation=[
    // the user_id property on the params object
    check('user_id').isInt({gt:0})
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
    email_pass_validator,
    user_id_validation,
    error_middleware
}