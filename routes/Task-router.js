const { GetAllTasks,GetTasks,GetSingleTask, AddTask, UpdateTask, DeleteTask} = require("../controllers/task-Controller");
const  {isAuthorized, authorizeRoles}  = require('../middlewares/auth/AuthorizationMeiddleware');
const express = require('express');
const Roles = require("../utils/roles");

const router = express.Router()
router.route("/").get(isAuthorized,authorizeRoles(Roles.Organizer),GetAllTasks)
router.route("/:eventId")
.post(isAuthorized,authorizeRoles(Roles.Organizer), AddTask)
.get(isAuthorized,authorizeRoles(Roles.Organizer),GetTasks)
router.route("/:eventId/:id")
    .get(isAuthorized,authorizeRoles(Roles.Organizer),GetSingleTask)
    .patch(isAuthorized,authorizeRoles(Roles.Organizer) ,UpdateTask)
    .delete(isAuthorized, authorizeRoles(Roles.Organizer), DeleteTask)

module.exports = router;
