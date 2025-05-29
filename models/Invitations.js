const{model,Schema,models} =require('mongoose');
const InvitationSchema =new Schema({
    
    email:{
        type:String,
        required:true,
        
    },
    status:{
        type:String,
        enum:['pending','accepted','declined'],
        required:true,
    },
    responseDate:{
        type:Date,
    }
    ,
    eventId:{
        type:Schema.Types.ObjectId,
        ref:'Event',
        required:true
    }
    

},{timestamps:true})

const Invitation =models.User || model('Invitation',InvitationSchema);
module.exports=Invitation;