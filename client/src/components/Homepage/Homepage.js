import React, { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import './Homepage.css'
import TaskBoard from './TaskBoard';
import SearchControls from './SearchControls';
import { useNavigate } from 'react-router-dom';

function Homepage() {

  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);

  function listDownTodo(flag) {
    setTodo(Math.random() * 1000);
  }

  const handleClick = () => {
    navigate('/login');
  }
  return (
    <div>
    <div className="header">
      <div className="header-icon">
        <FaClipboardList size={24} color="#fff" />
      </div>
      <button className="btn-logout" onClick={handleClick}>Logout</button>
    </div>
      <SearchControls listDownTodo={listDownTodo}/>
      <TaskBoard todo={todo} listDownTodo={listDownTodo}/>
    </div>
  )
}

export default Homepage