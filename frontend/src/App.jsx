import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Board from './Pages/Board'
import Landing from './Pages/Landing'
import EditProfile from './Components/EditProfile'
import Login from './Components/Login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/home" element={<Landing />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>  
  )
}

export default App
