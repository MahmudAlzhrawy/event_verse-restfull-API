const express = require('express');
const router = express.Router();
const {
    getAllInvitationsForEvent,
    getSingleInvitation,
    updateInvitation,
    addInvitation,
    deleteInvitation
} = require('../controllers/invitaion-Controller');
const { isAuthorized, authorizeRoles } = require('../middlewares/auth/AuthorizationMeiddleware');

router.route('/:eventId')
    .get(isAuthorized,getAllInvitationsForEvent)
    .post(isAuthorized, authorizeRoles, addInvitation);
router.route('/:eventId/:id')
    .get(isAuthorized, getSingleInvitation)
    .put(isAuthorized, authorizeRoles, updateInvitation)
    .delete(isAuthorized, authorizeRoles, deleteInvitation);
    
    module.exports = router;