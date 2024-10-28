
const express = require('express');
const { addTask, editTask, deleteTask, getAllTasks } = require('../controllers/Task');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/add-task',auth,addTask);
router.get('/get-task',auth,getAllTasks);
router.put('/edit-task',editTask);
router.delete('/delete-task',auth,deleteTask)
// router.put()

module.exports = router;