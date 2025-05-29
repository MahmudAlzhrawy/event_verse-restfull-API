const Invitation = require('../models/Invitations');
const ErrorHandler = require('../utils/ErrorHandler');

const getAllInvitationsForEvent = async (req, res, next) => {
    try {
        const invitations = await Invitation.find({ eventId: req.params.eventId })
            .populate('eventId', '-_id title date location')
            .select('-__v -createdAt -updatedAt');
        res.status(200).json({
        success: true,
        invitations,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
const getSingleInvitation = async (req, res, next) => {
    const {id}= req.params;
    if (!id) {
        return next(new ErrorHandler('Invitation ID is required', 400));
    }
    try {
        const invitation = await Invitation.findById({_id:id})
            .populate('eventId', '-_id title date location')
            .select('-__v -createdAt -updatedAt');
        res.status(200).json({
            success: true,
            invitation,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
const updateInvitation = async (req, res, next) => {
    const { id } = req.params;
    const { email } = req.body;
    if (!id) {
        return next(new ErrorHandler('Invitation ID is required', 400));
    }
    try {
        const updatedInvitation = await Invitation.findByIdAndUpdate(
            id,
            { email },
            { new: true, runValidators: true }
        ).populate('eventId', '-_id title date location')
        .select('-__v -createdAt -updatedAt');
        if (!updatedInvitation) {
            return next(new ErrorHandler('Invitation not found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Invitation updated successfully',
            invitation: updatedInvitation,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

const addInvitation = async (req, res, next) => {
    const { eventId } = req.params;
    const { email } = req.body;
    if (!eventId || !email) {
        return next(new ErrorHandler('Event ID and email are required', 400));
    }
    try {
        const newInvitation = new Invitation({ eventId, email });
        await newInvitation.save();
        res.status(201).json({
            success: true,
            message: 'Invitation created successfully',
            invitation: newInvitation,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
const deleteInvitation = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ErrorHandler('Invitation ID is required', 400));
    }
    try {
        const deletedInvitation = await Invitation.findByIdAndDelete(id);
        if (!deletedInvitation) {
            return next(new ErrorHandler('Invitation not found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Invitation deleted successfully',
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


module.exports = {
    getAllInvitationsForEvent,
    getSingleInvitation,
    addInvitation,
    deleteInvitation,
    updateInvitation
}