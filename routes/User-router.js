const {Register ,Login,GetUsers,UpdateUser,DeleteUser} =require('../controllers/user-Controller');
const express =require('express');
const router =express.Router();
const upload=require('../utils/Multer');
const {isAuthorized,authorizeRoles } =require('../middlewares/auth/AuthorizationMeiddleware');
const { CreateUserValidate , updateValidator} = require('../utils/validators/UserValidator');
const Roles = require('../utils/roles');

router.route("/").get(isAuthorized,authorizeRoles(Roles.Admin),GetUsers);
router.route('/register')
.post(upload.single('image'),CreateUserValidate,Register)

router.route('/login').post(Login)
router.route("/:id")
.patch(upload.single("image"), updateValidator,UpdateUser)
.delete(DeleteUser)


module.exports =router;