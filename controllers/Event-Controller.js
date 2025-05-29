const Event = require('../models/Events');

const ErrorHandler = require('../utils/ErrorHandler');
const AddEvent = async(req,res,next)=>{
try{
    const {title,description,date,location}= req.body;
    const newEvent =new Event({
        title,
        description,
        date,
        location,
        createdBy:req.user.id
        
});

    const created = await newEvent.save();
    if(created) {
        return res.status(201).json({statue:"success",data:newEvent})
    }
    else return next(new ErrorHandler("there is a problem while creating new event",400));

}catch(error){
    next(new ErrorHandler(error,500))}
}
const GetEvents = async (req, res, next) => {
    try {
        const events = await Event.find({createdBy:req.user.id}).populate('createdBy','-_id name').select("-__v ");
        if (events) {
        return res.status(200).json({
            data: events,
            message: "events fetched successfully",
        });
        }
        return next(new ErrorHandler("There is a problem while fetching events", 400));
    } catch (error) {
        return next(error);
    }
};
const GetSingleEvent=async(req,res,next)=>{
    const{id} =req.params;
    try{
        const singleEvent = await Event.findById({_id:id,createdBy:req.user.id}).populate('createdBy','-_id name').select('-__v');
        if(singleEvent) return res.status(200).json({Event:singleEvent,message:"Fetched Successfully"})
            return next(new ErrorHandler(`Failed to Fetch the Event with ID :${id} `,404));
    }catch(err){
    return next(new ErrorHandler(err,400))
}
}
const UpdateEvent=async(req,res,next)=>{
    const{id} =req.params;
    const {title,description,date,location} =req.body;
    try{
        const updateEvent = await Event.findByIdAndUpdate({_id:id},{title,description,date,location});
        if(updateEvent) return res.status(200).json({updatedEvent:updateEvent,message:"updated Successfully"})
            return next(new ErrorHandler(`Failed to update the Event with ID :${id} `,400));
    }catch(err){
    return next(new ErrorHandler(err,400))
}
}
const DeleteEvent = async (req,res,next)=>{
const{id}=req.params;
const deletEvent= await Event.findByIdAndDelete({_id:id});
if(deletEvent)return res.status(200).json({message:`deleted Event with id : ${id} successfully`});
return next(new ErrorHandler(`failed to delete Event with id ${id}`,400));
}

module.exports={
    AddEvent,
    UpdateEvent,
    GetEvents,
    GetSingleEvent,
    DeleteEvent
}