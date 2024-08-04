// React dependencies
import { useState } from 'react'
import { ReactDOM } from 'react'
import {Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'

// React Routes
import { Home } from '../routes/home/home'
import { Login } from '../routes/login/login';
import { SignUp } from '../routes/sign-up/sign-up';
import {Logout} from '../routes/logout/logout';

// React Components
import Navbar from '../common/navbar';

// React Contexts

import GmodalProvider from '../../global/contexts/g-modal/g-modal.provider';
import NavbarProvider from '../../global/contexts/navbar/navbar.provider';


// Styles

import './styles/App.css'

function AppRoutes(){
  const location = useLocation();

  return(

      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='*' element={<p>Not found</p>}/>
      </Routes>


  )
}


function App() {


  return (
    <>
      <NavbarProvider>
        <GmodalProvider>
          <BrowserRouter>
            <Navbar/>
            <AppRoutes/>
          </BrowserRouter>
        </GmodalProvider>
      </NavbarProvider>
    </>
  )
}

export default App
