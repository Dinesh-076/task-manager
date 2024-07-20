// src/AddTaskButton.js
import React, { useState } from "react";
import ViewDetails from "./ViewDetails";

const ViewDetailsButton = ({task}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddTask = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <button className="btn-details" onClick={handleAddTask}>
        View Details
      </button>

      {isFormVisible && (
        <ViewDetails task={task} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default ViewDetailsButton;
