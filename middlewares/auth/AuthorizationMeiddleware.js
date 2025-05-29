const jwt = require("jsonwebtoken");
const ErrorHandler =require("../../utils/ErrorHandler")
const User =require('../../models/Users');
const isAuthorized =async (req,res,next)=>{
const auth = req.headers.authorization;
if(!auth ||!auth.startsWith("Bearer ") ){
    next(new ErrorHandler("Unauthorized, no token provided", 401));
}
    const token =auth.split(" ")[1];
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user) return next(new ErrorHandler("the user not found ",404));
        req.user=user
        next();
    }catch(error){
        return next(new ErrorHandler(error,401))
    }


}
const authorizeRoles = (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler('User not authenticated', 401));
    }
    if (req.user.role !== 'organizer') {
        return next(new ErrorHandler('Forbidden: You do not have permission to access this resource', 403));
    }
    next();
};
module.exports = {
    isAuthorized,
    authorizeRoles
};