const {Register ,Login,GetUsers,UpdateUser,DeleteUser} =require('../controllers/user-Controller');
const express =require('express');
const router =express.Router();
const upload=require('../utils/Multer');
const { CreateUserValidate , updateValidator} = require('../utils/validators/UserValidator');



router.route("/").get(GetUsers);
router.route('/register')
.post(upload.single('image'),CreateUserValidate,Register)

router.route('/login').post(Login)
router.route("/:id")
.patch(upload.single("image"), updateValidator,UpdateUser)
.delete(DeleteUser)


module.exports =router;