import React from "react";
import "./SearchControls.css";
import AddTaskButton from "../FormTask/AddTaskButton";

const SearchControls = ({listDownTodo}) => {
  return (
    <div className="task-controls">
      <AddTaskButton listDownTodo={listDownTodo} />
      <div className="task-controls-right">
        <div>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" placeholder="Search..." />
        </div>
        <div>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort">
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchControls;
