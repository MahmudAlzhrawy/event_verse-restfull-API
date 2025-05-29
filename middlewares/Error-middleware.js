const glopalError =(err,req,res,next)=>{
    const statusCode= err.statusCode|| 500;
    const message = err.message ||"Internal server error";
    const Opritional = err.isOpritional;
    const stack=err.stack;
    res.status(statusCode).json({status:'Fail',err:{
        success:false,
        statusCode:statusCode,
        isOpritional:Opritional
    },
    message:statusCode === 500 ?"Somthing went error" : message,
    stack, 
})
}

module.exports = glopalError;
