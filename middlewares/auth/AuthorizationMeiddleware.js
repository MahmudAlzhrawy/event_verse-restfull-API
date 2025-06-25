const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/ErrorHandler");
const User = require('../../models/Users');

const isAuthorized = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        return next(new ErrorHandler("Unauthorized, no token provided", 401));
    }

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
};

const authorizeRoles = (...roles)=>{
        return (req, res, next) => {
            if (!req.user) {
                return next(new ErrorHandler('User not authenticated', 401));
            }

            if (!roles.includes(req.user.role)) {
                return next(new ErrorHandler('Forbidden: You do not have permission to access this resource', 403));
            }

            next();
        }
};

module.exports = {
    isAuthorized,
    authorizeRoles
};
