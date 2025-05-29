const User = require('../models/Users');
const bcrypt= require('bcrypt');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require("jsonwebtoken");
const Register = async(req,res,next)=>{
try{
    const {name,email,password,role}= req.body;
    const image= req.file ? req.file.filename:null ;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const newUser =new User({
        name,
        email,
        password:hashedpassword,
        role,
        image
});
    const foundEmail=await  User.findOne({email});
    if(foundEmail) return next(new ErrorHandler("Email already exists",400));
    const created = await newUser.save();
    if(created) return res.status(201).json({statue:"success",data:newUser});
    else return next(new ErrorHandler("there is a problem while creating new user",400));

}catch(error){
    next(new ErrorHandler(error,500))}
}
const GetUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if (users) {
        return res.status(200).json({
            data: users,
            message: "Users fetched successfully",
        });
        }
        return next(new ErrorHandler("There is a problem while fetching users", 400));
    } catch (error) {
        return next(error);
    }
};


const Login = async (req,res,next)=>{
    const {password,email}=req.body;
    const findUser = await User.findOne({ email });
    if(findUser){
        decryptedBass = await bcrypt.compare(password,findUser.password);
        if(decryptedBass){
            const token = await jwt.sign({id:findUser._id,email:findUser.email,role:findUser.role},process.env.JWT_SECRET,{
                expiresIn:"2d"
            });
            return res.status(200).json({message:"success",data:findUser,token:token});
        }
        return next(new ErrorHandler("Wrong password",400));
    }
    else{
        return next(new ErrorHandler("the user not found",404));
    }

}
const UpdateUser=async(req,res,next)=>{
    const{id} =req.params;
    const {password,email,name} =req.body;
    const image= req.file ? req.file.filename:null ;
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const updateUser = await User.findByIdAndUpdate({_id:id},{email,name,password:hashedpassword,image});
        if(updateUser) return res.status(200).json({updatedUser:updateUser,message:"updated Successfully"})
            return next(new ErrorHandler(`Failed to update the user with ID :${id} `,400));
    }catch(err){
    return next(new ErrorHandler(err,400))
}
}
const DeleteUser = async (req,res,next)=>{
const{id}=req.params;
const deletuser= await User.findByIdAndDelete({_id:id});
if(deletuser)return res.status(200).json({message:`deleted user with id : ${id} successfully`});
return next(new ErrorHandler(`failed to delete user with id ${id}`,400));
}

module.exports={
    Register,
    Login,
    UpdateUser,
    GetUsers,
    DeleteUser
}