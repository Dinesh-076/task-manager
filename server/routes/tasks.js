import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../models/task.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', async (req, res) => {
  const { title, description,status } = req.body;
  console.log(req.body);
  try {
    const newTask = await createTask(title, description,status);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { title, description, status } = req.body;
  console.log('testing the values -> ',title,description,status);
  try {
    const updatedTask = await updateTask(id, title, description, status);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/statusEdit/:id', async (req, res) => {
  // console.log('request',req);
  // console.log('response',req);

  const { id } = req.params;
  const { status }  = req.body;

  try {
    const updatedeTaskStatus = await updateTaskStatus(id, status);
    if(!updateTaskStatus){
      return res.status(400).json({message: 'Task not found'});
    }
    res.json(updatedeTaskStatus)
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
