const{check} =require('express-validator');
const Validator= require('../../middlewares/vaildatormiddleware');


const CreateUserValidate =[
    check('name').notEmpty().withMessage('the name must not be empty'),
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage("email required"),
    check('role').notEmpty().withMessage('role required'),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('pass must be not less than 8 chars'),
    Validator
]
const updateValidator =[
    
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage("email required"),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('pass must be not less than 8 chars'),
    Validator
]

module.exports ={
    CreateUserValidate,
    updateValidator
}