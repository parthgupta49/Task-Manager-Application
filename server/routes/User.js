const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth')
const {sendOTP,login,signUp,changePassword,googleSignUp, googleLogIn} = require('../controllers/Auth')
const {resetPassword,resetPasswordToken} = require('../controllers/ResetPassword');
// const { googleLogIn } = require('../../src/services/operations/authAPI');

router.post('/signup',signUp);
router.post('/login',login);
router.post('/sendotp',sendOTP);
router.post('/changepassword',auth,changePassword);
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);
router.post('/google-authentication',googleSignUp);
router.post('/google-authentication-login',googleLogIn);

module.exports = router;