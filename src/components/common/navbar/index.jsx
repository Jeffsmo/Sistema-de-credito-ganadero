import { NavLink, useLocation } from 'react-router-dom';
import NavbarContext from '../../../global/contexts/navbar/navbar.context';
import './styles/navbar.css';
import { useContext, useEffect } from 'react';

function Navbar() {
    const context = useContext(NavbarContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/sign-up") {
            context.unableNavbar();
        } else {
            context.enableNavbar();
        }
    }, [location.pathname, context]);

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
                        <li>
                            <img src="" alt="" />
                        </li>
                        <li>
                            <NavLink to="/login">
                                Log in
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/sign-up">
                                Sign Up
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
