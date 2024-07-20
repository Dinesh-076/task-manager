// src/EditTaskButton.js
import React, { useState } from 'react';
import * as data from '../service/service'
import TaskForm from './TaskForm';
// import './EditTaskButton.css';

const EditTaskButton = (props) => {
  // console.log(props);
  // return <div></div>;
  const {task, listDownTodo} =  props;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEditTask = () => {
    setIsFormVisible(true);
  };

  const handleSaveTask = async (updatedTask) => {
    console.log('updated task... ',updatedTask);
    try {
      const response = await data.editTask(updatedTask);
      const result = await response.data;
      console.log('Task updated:', result);
      listDownTodo(result);
    } catch (error) {
      console.error('Error updating task:', error);
    }

    console.log('Task updated:', updatedTask);
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <button className="btn-edit" onClick={handleEditTask}>Edit Task</button>

      {isFormVisible && (
        <TaskForm
          mode="edit"
          initialTitle={task.title}
          initialDescription={task.description}
          id={task.id}
          initialStatus = {task.status}
          onSave={handleSaveTask}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditTaskButton;
