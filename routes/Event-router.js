const express =require('express');
const {isAuthorized,authorizeRoles } =require('../middlewares/auth/AuthorizationMeiddleware');
const { GetEvents,GetEventsBelongeToOrganizer, AddEvent,GetSingleEvent, UpdateEvent, DeleteEvent } = require("../controllers/Event-Controller");
const Role =require('../utils/roles')
const router =express.Router();
router.route("/").get(isAuthorized,authorizeRoles(Role.Admin,Role.Guest),GetEvents)
router.route("/GetEventsBelongeToOrganizer").get(isAuthorized, authorizeRoles(Role.Organizer),GetEventsBelongeToOrganizer)
router.route("/createEvent").post(isAuthorized, authorizeRoles(Role.Organizer),AddEvent)
router.route("/:id")
.get(GetSingleEvent)
.patch(isAuthorized,authorizeRoles(Role.Organizer),UpdateEvent)
.delete(isAuthorized,authorizeRoles(Role.Organizer,Role.Admin),DeleteEvent)

module.exports =router;