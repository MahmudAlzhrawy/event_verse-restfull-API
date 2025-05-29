const { GetAllTasks,GetTasks,GetSingleTask, AddTask, UpdateTask, DeleteTask} = require("../controllers/task-Controller");
const  {isAuthorized, authorizeRoles}  = require('../middlewares/auth/AuthorizationMeiddleware');
const express = require('express');

const router = express.Router()
router.route("/").get(isAuthorized,GetAllTasks)
router.route("/:eventId")
.post(isAuthorized, authorizeRoles, AddTask)
.get(isAuthorized,GetTasks)
router.route("/:eventId/:id")
    .get(isAuthorized,GetSingleTask)
    .patch(isAuthorized,authorizeRoles ,UpdateTask)
    .delete(isAuthorized, authorizeRoles, DeleteTask)

module.exports = router;
