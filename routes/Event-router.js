const express =require('express');
const {isAuthorized,authorizeRoles } =require('../middlewares/auth/AuthorizationMeiddleware');
const { GetEvents, AddEvent,GetSingleEvent, UpdateEvent, DeleteEvent } = require("../controllers/Event-Controller");

const router =express.Router();

router.route("/").get(isAuthorized,GetEvents)
router.route("/createEvent").post(isAuthorized, authorizeRoles,AddEvent)
router.route("/:id")
.get(isAuthorized,GetSingleEvent)
.patch(isAuthorized,authorizeRoles,UpdateEvent)
.delete(isAuthorized,authorizeRoles,DeleteEvent)

module.exports =router;