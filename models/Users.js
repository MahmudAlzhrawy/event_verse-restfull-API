const{model,Schema,models} =require('mongoose');
const userSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
        
    },
    role:{
        type:String,
        enum:['organizer','gust'],
        required:true,
    },
    image:{
        type:String,
    }
    

},{timestamps:true})

const User =models.User || model('User',userSchema);
module.exports=User;