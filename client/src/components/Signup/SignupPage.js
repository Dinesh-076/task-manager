import React from "react";
import { FaClipboardList } from 'react-icons/fa';
import SignupContainer from "./SignupContainer";
import { Link } from "react-router-dom";
// import './LoginPage.css'


function SignupPage() {
  return (
    <div>
      <div className="header">
        <div className="login-header-icon">
          <FaClipboardList size={24} color="#fff" />
        </div>
        <div className="log-btns">
        <Link to="/login">Login</Link>
        <button className="btn-login">Signup</button>
        </div>
      </div>
      <SignupContainer />
    </div>
  );
}

export default SignupPage;
