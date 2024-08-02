import {NavLink} from 'react-router-dom';


import './styles/navbar.css'




function Navbar(){
    return(
        <nav>

            <ul className='font-semibold navbar-container'>
                <li>
                    <NavLink to='/' className='nav-logo'>
                        LOGO
                    </NavLink>
                </li>
            </ul>

            <ul className='navbar-container'>
                <li>
                        <img src="" alt="" />
                </li>
                <li>
                    <NavLink to='/login' className= 'font-semibold login nav-font'>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' >
                        Sign Up
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar