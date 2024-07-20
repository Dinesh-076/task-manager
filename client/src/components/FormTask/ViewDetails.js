// src/TaskForm.js
import React, { useState } from 'react';
import './TaskForm.css';

const ViewDetails = ({ task, onCancel}) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>View Details</h2>
        <p>Title: {task.title}</p>
        <p>Description: {task.description}</p>
        <div className="buttons">
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
