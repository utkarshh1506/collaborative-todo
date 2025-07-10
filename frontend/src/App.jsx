import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Board from './Pages/Board';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/board" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/board" element={isLoggedIn ? <Board /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
