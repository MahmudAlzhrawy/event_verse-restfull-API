const express = require('express');
const router = express.Router();
const Roles = require('../utils/roles')
const {
    getAllInvitationsForEvent,
    getSingleInvitation,
    updateInvitation,
    addInvitation,
    deleteInvitation
} = require('../controllers/invitaion-Controller');
const { isAuthorized, authorizeRoles } = require('../middlewares/auth/AuthorizationMeiddleware');

router.route('/:eventId')
    .get(isAuthorized,authorizeRoles(Roles.Organizer),getAllInvitationsForEvent)
    .post(isAuthorized, authorizeRoles(Roles.Organizer), addInvitation);
router.route('/:eventId/:id')
    .get(isAuthorized,authorizeRoles(Roles.Organizer) ,getSingleInvitation)
    .put(isAuthorized,authorizeRoles(Roles.Organizer) , updateInvitation)
    .delete(isAuthorized, authorizeRoles(Roles.Organizer), deleteInvitation);
    
    module.exports = router;