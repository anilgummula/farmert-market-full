const joi = require('joi');

const registerValidation = (req,res,next)=>{
    const schema = joi.object({
        username : joi.string().min(3).max(100).required(),
        email : joi.string().email().required(),
        mobile : joi.string().min(10).required(),
        type : joi.string().required(),
        password : joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message: "Bad request",error})
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message: "Bad request",error})
    }
    next();
}

module.exports = {
    registerValidation,
    loginValidation
}