import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import NavbarContext from '../../../global/contexts/navbar/navbar.context';
import './styles/navbar.css';
import { useContext, useEffect } from 'react';
import { useAuth } from '../../../global/contexts/auth/auth';
import ProfileImg from '../../../assets/media/profile.jsx'; // Asegúrate de que la ruta sea correcta

const routes = [];

routes.push({
    to:'/login',
    text:'Ingresar',
    private: false,
    publicOnly: true
});

routes.push({
    to:'/logout',
    text:'Cerrar Sesión',
    private: true     
});

routes.push({
    to:'/profile',
    text: 'Perfil',
    private: true
});

function Navbar() {
    const context = useContext(NavbarContext);
    const location = useLocation();
    const auth = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/sign-up") {
            context.unableNavbar();
        } else {
            context.enableNavbar();
        }
    }, [location.pathname, context]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={context.isNavbarActive ? "navbar-wrapper" : "hidden"}>
            <nav>
                <div className="nav-content">
                    <ul className="font-semibold navbar-container">
                        <li>
                            <NavLink to="/" className="nav-logo">
                                LOGO
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-container">
                        {routes.map(route => {
                            if (route.publicOnly && auth.user) return null;
                            if (route.private && !auth.user) return null;
                            if (route.text === 'Perfil') return null;
                            if (route.text === 'Cerrar Sesión') return null;
                            
                            return (
                                <li key={route.to}>
                                    <NavLink
                                        className={route.text === 'Ingresar' ? 'login-nav-button' : 'nav-route'}
                                        to={route.to}
                                    >
                                        {route.text}
                                    </NavLink>
                                </li>
                            );
                        })}
                        {auth.user?.email}
                        {auth.user && (
                            <li className="profile-menu" onClick={toggleDropdown} >
                                <ProfileImg
                                    width="100px"  // Ajusta el tamaño según sea necesario
                                    height="80px"
                                    className="profile-icon" 
                                    
                                />
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <NavLink to="/profile" className="dropdown-item">Perfil</NavLink>
                                        <NavLink to="/logout" className="dropdown-item">Cerrar Sesión</NavLink>
                                    </div>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
