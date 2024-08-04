import React, { useState } from "react";
import "./styles/sign-up.css"; 

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de autenticación aquí
        console.log("Correo:", email, "Contraseña:", password);
    };

    return (
        <div className="sign-up-wrapper">
            <div className="sign-up-container-container">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit} className="sign-up-form">
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
                    <button type="submit" className="sign-up-button">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
}

export { SignUp };
