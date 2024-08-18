const { userSchemaValidation } = require('./validation');

module.exports.validateUser = (req,res,next) =>{
    const { error } = userSchemaValidation.validate(req.body);
    if(error){
        const { message } = error.details[0];
        res.status(400).json({message: message, type:'danger'});
    }else{
        next()
    }
}