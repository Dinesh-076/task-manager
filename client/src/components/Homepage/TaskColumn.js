import React from 'react';
import TaskCard from './TaskCard';
import DropArea from '../DropArea/DropArea';

const TaskColumn = ({ title, tasks, listDownTodo, setActiveCard, status, onDrop }) => {
  return (
    <div className="task-column__">
      <h2>{title}</h2>
      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <TaskCard
            index={index}
            setActiveCard={setActiveCard}
            task={task}
            listDownTodo={listDownTodo}
            columnId={status}
          />
          <DropArea onDrop={() => onDrop(status, index + 1)} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TaskColumn;
