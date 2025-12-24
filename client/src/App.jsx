import { useState } from 'react'
import Login from'./pages/Login'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App;
