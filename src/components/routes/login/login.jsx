import React, { useState } from "react";
import "./styles/login.css"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../global/contexts/auth/auth";

function Login() {

    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ESTO PUEDE IR EN UN CONTEXTO |||||

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de autenticación aquí
       auth.login({email, password});
       
    };

    const returnToHome = () =>{
        navigate('/');
    }

    //////// AUTENTICACION


    return (
        <div className="login-wrapper">
                <button className="login-back-home" onClick={returnToHome}>X</button>
            <div className="login-container-container">
                <h1>Log in</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
}

export { Login };
