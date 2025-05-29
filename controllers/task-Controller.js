const Task = require('../models/Tasks');
const ErrorHandler = require('../utils/ErrorHandler');
const AddTask = async(req,res,next)=>{
try{
    
    const {title,description}= req.body;
    const{eventId} =req.params
    const newTask =new Task({
        title,
        description,
        assignedTo:req.user.id,
        eventId:eventId,
        status:"to-do"
});

    const created = await newTask.save();
    if(created) return res.status(201).json({statue:"success",data:newTask});
    else return next(new ErrorHandler("there is a problem while creating new task",400));

}catch(error){
    next(new ErrorHandler(error,500))}
}
const GetAllTasks = async (req, res, next) => {
    try {
        const task = await Task.find({assignedTo:req.user.id})
        .populate({path:'eventId', select:'title -_id'})
        .populate({path:'assignedTo',select:'name -_id'})
        .select('-__v');
        if (task) {
        return res.status(200).json({
            data: task,
            message: "Task fetched successfully",
        });
        }
        return next(new ErrorHandler("There is a problem while fetching Task",400));
    } catch (error) {
        return next(error);
    }
};
const GetTasks = async (req, res, next) => {
    const{eventId} =req.params
    try {
        const task = await Task.find({eventId,assignedTo:req.user.id})
        .populate({path:'eventId', select:'title -_id'})
        .populate({path:'assignedTo',select:'name -_id'})
        .select('-__v');
        if (task) {
        return res.status(200).json({
            data: task,
            message: "Task fetched successfully",
        });
        }
        return next(new ErrorHandler("There is a problem while fetching Task",400));
    } catch (error) {
        return next(error);
    }
};
const GetSingleTask=async(req,res,next)=>{
    const{eventId,id} =req.params;
    try{
        const singleTask = await Task.findById({_id:id,eventId:eventId,assignedTo:req.user.id})
        .populate({path:'eventId', select:'title -_id'})
        .populate({path:'assignedTo',select:'name -_id'})
        .select('-__v');;
        if(singleTask) return res.status(200).json({Task:singleTask,message:"Fetched Successfully"})
            return next(new ErrorHandler(`Failed to Fetch the Task with ID :${id} `,404));
    }catch(err){
    return next(new ErrorHandler(err,400))
}
}
const UpdateTask=async(req,res,next)=>{
    const{eventId,id} =req.params;
    const {status} =req.body;
    
    try{
        const updateTask = await Task.findByIdAndUpdate({_id:id,eventId:eventId,assignedTo:req.user.id},{status});
        if(updateTask) return res.status(200).json({updatedTask:updateTask,message:"updated Successfully"})
            return next(new ErrorHandler(`Failed to update the task with ID :${id} `,400));
    }catch(err){
    return next(new ErrorHandler(err,400))
}
}
const DeleteTask = async (req,res,next)=>{
const{eventId,id}=req.params;
const deletedtask= await Task.findByIdAndDelete({_id:id,eventId:eventId,assignedTo:req.user.id});
if(deletedtask)return res.status(200).json({message:`deleted task with id : ${id} successfully`});
return next(new ErrorHandler(`failed to delete task with id ${id}`,400));
}

module.exports= {
    GetTasks,
    GetSingleTask,
    AddTask,
    GetAllTasks,
    UpdateTask,
    DeleteTask
}