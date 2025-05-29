const {models,model,Schema}=require("mongoose");

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['to-do','in-progress','done'],
        required:true,
    },
    eventId:{
        type:Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

const Task =models.Task || model("Task",TaskSchema);
module.exports =Task;