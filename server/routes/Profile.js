const express = require('express');
const router = express.Router();

const {updateProfile,deleteAccount,updateDisplayPicture} = require('../controllers/Profile');
const {auth} = require('../middlewares/auth');

router.put('/updateProfile',auth,updateProfile);
router.delete('/deleteProfile',auth,deleteAccount);
router.put('/updateDisplayPicture',auth,updateDisplayPicture);

module.exports = router;