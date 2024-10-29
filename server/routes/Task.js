
const express = require('express');
const { addTask, editTask, deleteTask, getAllTasks } = require('../controllers/Task');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/add-task',auth,addTask);
router.get('/get-task',auth,getAllTasks);
router.put('/edit-task',auth,editTask); // i am adding middleware here, but i really dont think i need to do this to edit the task, will review this later
router.delete('/delete-task',auth,deleteTask)
// router.put()

module.exports = router;