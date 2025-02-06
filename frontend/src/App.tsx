import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../src/pages/Home'; // Importa el componente Home
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterForm from './pages/Register';
import TaskList from './pages/adminTasks';
import UserTasks from './pages/UserTasks';
import TaskForm from './pages/addTask';
import UpdateTaskForm from './pages/editTask';

import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/manage-tasks" element={<TaskList/>} />
            <Route path="/userTasks/:userId" element={<UserTasks/>} />
            <Route path="/add" element={<TaskForm/>} />
            <Route path="/update/:id" element={<UpdateTaskForm/>} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
