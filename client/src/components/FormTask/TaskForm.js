// src/TaskForm.js
import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ mode = 'add', initialTitle = '', initialDescription = '', onSave, onCancel, id, initialStatus }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);

  const handleSave = () => {
    console.log('onSave...');
    onSave({ title, description, id, status });
  };

  const isEditMode = mode === 'edit';

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditMode ? 'Edit Task' : 'Add Task'}</h2>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="buttons">
          <button className='button__' onClick={handleSave}>{isEditMode ? 'Save' : 'Add'}</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
