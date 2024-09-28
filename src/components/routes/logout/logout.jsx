import React from "react";
import { useAuth } from "../../../global/contexts/auth/auth";

function Logout(){

    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    }

    return(
    <>    
        <h1>Log Out</h1>

        <form onSubmit={logout}>
            <label > ¿Seguro de que quieres salir ahora? </label>

            <button type="submit">Salir</button>

        </form>
    </>

    )
}


export {Logout}