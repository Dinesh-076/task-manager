// src/AddTaskButton.js
import React, { useState } from "react";
import * as data from "../service/service";
import TaskForm from "./TaskForm";
// import './AddTaskButton.css';

const AddTaskButton = ({ listDownTodo }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddTask = () => {
    setIsFormVisible(true);
  };

  const handleSaveTask = async (task) => {
    try {
      const response = await data.addTask(task);
      const result = await response.data;
      console.log("Task updated:", result);
      listDownTodo(result);
    } catch (error) {
      console.error("Error updating task:", error);
    }
    console.log("Task saved:", task);
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <button className="add-task-button" onClick={handleAddTask}>
        Add Task
      </button>

      {isFormVisible && (
        <TaskForm mode="add" onSave={handleSaveTask} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default AddTaskButton;
