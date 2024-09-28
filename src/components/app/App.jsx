import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { Home } from '../routes/home/home';
import { Login } from '../routes/login/login';
import { Logout } from '../routes/logout/logout';
import Navbar from '../common/navbar';
import { Profile } from '../routes/profile/profile';
import GmodalProvider from '../../global/contexts/g-modal/g-modal.provider';
import NavbarProvider from '../../global/contexts/navbar/navbar.provider';
import { AuthProvider, AuthRoute, PostAuthRoute } from '../../global/contexts/auth/auth';
import './styles/App.css';

function AppRoutes(){
  const location = useLocation();

  return(
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home/>}/>
        
        <Route 
          path='/login' 
          element={<PostAuthRoute><Login/></PostAuthRoute>}/>
        
        <Route
          path='/logout'
          element={<AuthRoute><Logout/></AuthRoute>}/>

        <Route 
          path='/profile' 
          element={<AuthRoute><Profile/></AuthRoute>}  />

        <Route path='*' element={<p>Not found</p>}/>
      </Routes>
  );
}

function App() {
  return (
    <>
      <NavbarProvider>
        <GmodalProvider>
          <BrowserRouter>
            <AuthProvider>
              <Navbar/>
              <AppRoutes/>
            </AuthProvider>
          </BrowserRouter>
        </GmodalProvider>
      </NavbarProvider>
    </>
  );
}

export default App;
