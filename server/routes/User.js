const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth')
const {sendOTP,login,signUp,changePassword} = require('../controllers/Auth')
const {resetPassword,resetPasswordToken} = require('../controllers/ResetPassword');
router.post('/signup',signUp);
router.post('/login',login);
router.post('/sendotp',sendOTP);
router.post('/changepassword',auth,changePassword);
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);

module.exports = router;