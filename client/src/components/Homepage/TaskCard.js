import React from 'react';
import EditTaskButton from '../FormTask/EditTaskButton';
import * as data from '../service/service';
import ViewDetailsButton from '../FormTask/ViewDetailsButton';

const TaskCard = ({ task, listDownTodo, setActiveCard, columnId }) => {
  const handleDeleteTask = async () => {
    try {
      const response = await data.deleteTask(task);
      const result = await response.data;
      listDownTodo();
      console.log('Task deleted:', result);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text', task.id);
    e.dataTransfer.setData('sourceColumnId', columnId);
    setActiveCard(task.id);
  };

  return (
    <div 
      className="task-card" 
      draggable 
      onDragStart={handleDragStart}
    >
      <h3>{task.title}</h3>
      <p className='task-card-desc'>{task.description}</p>
      <p className='task-card-date'>Created at: {task.created_at}</p>
      <div className="task-card-buttons">
        <button className="btn-delete" onClick={handleDeleteTask}>Delete</button>
        <EditTaskButton columnId={columnId} task={task} listDownTodo={listDownTodo} />
        <ViewDetailsButton task={task} />
      </div>
    </div>
  );
};

export default TaskCard;
