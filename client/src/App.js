import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Signup/SignupPage";

function App() {
  const isAuthenticated = false;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" exact element={<Homepage />} />
          <Route path="/register" element={<SignupPage />} />
          {/* <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} 
          />
          <Route 
            path="/home" 
            element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/signup" 
            element={<SignupPage />} 
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
