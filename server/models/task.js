
import pool from '../db.js';

// Get all tasks
const getAllTasks = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  } catch (err) {
    console.error('Error getting tasks:', err.message);
    throw err;
  }
};

// Create a new task
const createTask = async (title, description,status) => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description,status) VALUES ($1, $2, $3) RETURNING *',
      [title, description,status]
    );
    return rows[0];
  } catch (err) {
    console.error('Error creating task:', err.message);
    throw err;
  }
};

const updateTaskStatus = async (id, status) => {

  try {
    const {rows} = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error updating task status:', err.message);
    throw err;
  }
};

// Update an existing task
const updateTask = async (id, title, description, status) => {
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error updating task:', err.message);
    throw err;
  }
};

// Delete a task
const deleteTask = async (id) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return { message: 'Task deleted successfully' };
  } catch (err) {
    console.error('Error deleting task:', err.message);
    throw err;
  }
};

export {
  getAllTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
