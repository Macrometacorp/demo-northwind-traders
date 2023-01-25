import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GetJwtToken } from "../services";

const AuthContext = createContext({
    isLoggedIn: false,
    email: "",
    password: "",
    token: "",
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export function AuthContextProvider(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setEmail("");
        setPassword("");
        setToken("");
        setLoggedIn(false);
    };

    const loginHandler = async (email, password) => {
        const requestBody = {
            email: email,
            password: password,
            tenant: email.replace("@", "_"),
            username: "root",
        };
        const response = await GetJwtToken(requestBody);
        setEmail(email);
        setPassword(password);
        setToken(response.jwt);
        if (token) {
            localStorage.setItem("isLoggedIn", "1");
            setLoggedIn(true);
            navigate(location.state?.from?.pathname || "/home");
        } else {
            setLoggedIn(false);
            navigate(location.state?.from?.pathname || "/login");
        }
    };

    useEffect(() => {
        const storedUserLoggedInformation = localStorage.getItem("isLoggedIn");

        if (storedUserLoggedInformation === "1") {
            setLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                email: email,
                password: password,
                token: token,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
