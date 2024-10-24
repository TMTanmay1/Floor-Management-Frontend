import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Admindash from './components/admin-dash/Admin-dash';
import FloorRooms from './components/admin-dash/Floor-Rooms';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dash" element={<Admindash />} />
          <Route path="/admin-dash/floor-rooms/:floorId" element={<FloorRooms />} />
         
        </Routes>
      </Router>
    </>
  )
}

export default App