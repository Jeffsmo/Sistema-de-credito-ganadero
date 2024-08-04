import { useState } from "react";
import NavbarContext from "./navbar.context";

function NavbarProvider ({children}){

    const [isNavbarActive, setNavbarActive] = useState(true);

    const unableNavbar = () =>{
        return (setNavbarActive(false))
    }

    const enableNavbar = () =>{
        return (setNavbarActive(true))
    }


    return(
        <NavbarContext.Provider  value={{
            isNavbarActive,
            setNavbarActive,
            unableNavbar,
            enableNavbar
        }}>
            {children}
        </NavbarContext.Provider>
    )



}

export default NavbarProvider;