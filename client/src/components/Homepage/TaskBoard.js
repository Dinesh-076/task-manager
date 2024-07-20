import React, { useEffect, useState } from 'react';
import * as data from '../service/service';
import TaskColumn from './TaskColumn';
import './TaskBoard.css';

const TaskBoard = ({ todo, listDownTodo }) => {
  const [columns, setColumns] = useState({
    todo: { id: 'todo', title: 'TODO', tasks: [] },
    inProgress: { id: 'inProgress', title: 'IN PROGRESS', tasks: [] },
    done: { id: 'done', title: 'DONE', tasks: [] },
  });

  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await data.getAllTasks();
        const tasks = response.data;

        // Initialize new columns structure
        const newColumns = {
          todo: { ...columns.todo, tasks: [] },
          inProgress: { ...columns.inProgress, tasks: [] },
          done: { ...columns.done, tasks: [] },
        };

        // Distribute tasks into the appropriate columns
        tasks.forEach((task) => {
          const columnKey = task.status === 'Todo' ? 'todo' : task.status === 'edit' ? 'inProgress' : 'done';
          newColumns[columnKey].tasks.push(task);
        });
        setColumns(newColumns);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [todo]);

  const onDrop = (status, index) => {
    let sourceColumnKey = null;
    let task = null;

    // Identify the source column and task
    Object.keys(columns).forEach((columnKey) => {
      const column = columns[columnKey];
      const foundTask = column.tasks.find((t) => t.id === activeCard);
      if (foundTask) {
        sourceColumnKey = columnKey;
        task = foundTask;
      }
    });

    if (!task || sourceColumnKey === null) return;

    // Remove task from the source column
    const updatedSourceTasks = columns[sourceColumnKey].tasks.filter((t) => t.id !== activeCard);

    // Insert task into the target column at the specified position
    const updatedTargetTasks = [
      ...columns[status].tasks.slice(0, index),
      task,
      ...columns[status].tasks.slice(index),
    ];

    // If the task is moved within the same column, remove the task from its original position
    if (sourceColumnKey === status) {
      const sourceIndex = columns[status].tasks.findIndex((t) => t.id === activeCard);
      if (sourceIndex < index) {
        updatedTargetTasks.splice(sourceIndex, 1); // Remove the original task after insertion
      } else {
        updatedTargetTasks.splice(sourceIndex+1, 1); // Remove the original task before insertion
      }
    }

    // Update columns state
    setColumns({
      ...columns,
      [sourceColumnKey]: { ...columns[sourceColumnKey], tasks: updatedSourceTasks },
      [status]: { ...columns[status], tasks: updatedTargetTasks },
    });

    task.status = status;
    data.updateTaskStatus(task)
      .then((response) => {
        console.log('Task status updated:', response);
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  return (
    <div className="task-board">
      {Object.values(columns).map((column) => (
        <div key={column.id} className="task-column">
          <TaskColumn
            status={column.id}
            setActiveCard={setActiveCard}
            title={column.title}
            tasks={column.tasks}
            listDownTodo={listDownTodo}
            onDrop={onDrop}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
