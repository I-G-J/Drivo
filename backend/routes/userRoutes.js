const express= require('express')
const router=express.Router();
const {body}=require("express-validator")
const authMiddleware=require('../middleware/auth.middleware');
const userController=require('../controllers/user.controllers')
router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be at least 3 characters long "),
    body('password').isLength({min:8}).withMessage("password must be of 8 characters long")
],userController.registeruser)




router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email id '),
    body('password').isLength({min:8}).withMessage('Invalid  password')
],
    userController.loginUser
)


router.get('/profile', authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)
module.exports=router