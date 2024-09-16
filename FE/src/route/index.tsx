import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Screen/home';
import Login from '../Screen/login';
import Register from '../Screen/register';
import LayoutWithHeader from '../layout/withHeader';


const RouteApp: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LayoutWithHeader><Home /></LayoutWithHeader>} />
      
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default RouteApp;