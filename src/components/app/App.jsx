import { useState } from 'react'
import { ReactDOM } from 'react'
import {Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'

import { Home } from '../routes/home/home'
import { Login } from '../routes/login/login';
import { SignUp } from '../routes/sign-up/sign-up';

import Navbar from '../common/navbar';

import './styles/App.css'

function AppRoutes(){
  const location = useLocation();

  return(
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
    </Routes>

  )
}


function App() {


  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <AppRoutes/>
        </BrowserRouter>
    </>
  )
}

export default App
