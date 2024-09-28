import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// ESTO SE DEBE CONSULTAR DEL BACKEND
const userList = [
    { user: 'sebastianadmin@example.com', password: '12345678', role: { doctor: true, patient: false, lab: false } },
    { user: 'sebastiancliente@example.com', password: '12345678', role: { doctor: false, patient: true, lab: false } },
    { user: 'laboratoriosebastian@example.com', password: '12345678', role: { doctor: false, patient: false, lab: true } }
];

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const userFromCookies = Cookies.get("user");
        return userFromCookies ? JSON.parse(userFromCookies) : null;
    });

    const [lastActivityTime, setLastActivityTime] = useState(() => {
        return Cookies.get("lastActivityTime") || Date.now();
    });

    const login = ({ email, password }) => {
        const userData = userList.find(user => user.user === email && user.password === password);
    
        if (!userData) {
            // Maneja el caso de credenciales incorrectas
            console.error("Credenciales incorrectas");
            return;
        }
    
        // Extraer el rol del usuario
        const { role } = userData;
    
        // Configura el estado de usuario y cookies
        setUser({ email, role });
        Cookies.set("user", JSON.stringify({ email, role }), { expires: 7, sameSite: 'None', secure: true });
        Cookies.set("lastActivityTime", Date.now(), { sameSite: 'None', secure: true });
        setLastActivityTime(Date.now());
    
        navigate('/profile');
    }

    const logout = () => {
        setUser(null);
        Cookies.remove("user");
        Cookies.remove("lastActivityTime");
        navigate('/');
    }

    const handleUserActivity = () => {
        const currentTime = Date.now();
        setLastActivityTime(currentTime);
        Cookies.set("lastActivityTime", currentTime, { sameSite: 'None', secure: true });
    };

    useEffect(() => {
        // Inicia un intervalo que verifica cada minuto si la sesión ha expirado
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const storedLastActivityTime = Cookies.get("lastActivityTime");
            if (storedLastActivityTime && currentTime - storedLastActivityTime > 30 * 60 * 1000) { // 30 minutos
                logout();
                clearInterval(intervalId);
            }
        }, 60000); // Verificación cada minuto

        // Registrar eventos de usuario para resetear el temporizador
        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);

        // Limpieza
        return () => {
            clearInterval(intervalId);
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
        };
    }, [lastActivityTime]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

function AuthRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

function PostAuthRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/profile" />;
    }

    return children;
}

export {
    AuthProvider,
    useAuth,
    AuthRoute,
    PostAuthRoute
};
