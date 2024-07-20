import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import './LoginPage.css'
import LoginContainer from "./LoginContainer";


function LoginPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }
  return (
    <div>
      <div className="header">
        <div className="login-header-icon">
          <FaClipboardList size={24} color="#fff" />
        </div>
        <div className="log-btns">
        <button className="btn-login" onClick={handleClick}>Login</button>
        <Link to="/register">Signup</Link>
        </div>
      </div>
      <LoginContainer />
    </div>
  );
}

export default LoginPage;
