import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AuthCallback from './components/AuthCallback';
import Form from './components/Form';
import ProtectedRoute from './components/ProtectedRoutes'; // import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<ProtectedRoute element={<Form />} />} />
      </Routes>
    </Router>
  );
};

export default App;
