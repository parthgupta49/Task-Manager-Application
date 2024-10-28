const express = require('express');
const { createCategory } = require('../controllers/Category');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/createCategory',auth,createCategory);
// router.get('/get-task',getTask);
// router.put()

module.exports = router;