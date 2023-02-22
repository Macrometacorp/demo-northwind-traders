import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GetJwtToken } from "../services";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AuthContext = createContext({
    isLoggedIn: false,
    baseUrl: BASE_URL,
    regionName: "GLOBAL",
    email: "",
    password: "",
    token: "",
    onLogout: () => {},
    onLogin: (email, password) => {},
    onChangeRegion: (regionName, regionUrl) => {},
});

export function AuthContextProvider(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [baseUrl, setBaseUrl] = useState(BASE_URL);
    const [regionName, setRegionName] = useState("GLOBAL");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        setLoggedIn(false);
        setEmail("");
        setPassword("");
        setToken("");
    };

    const loginHandler = async (email, password) => {
        const requestBody = {
            email: email,
            password: password,
            tenant: email.replace("@", "_"),
            username: "root",
        };
        const response = await GetJwtToken(requestBody, baseUrl);
        if (response.jwt) {
            setEmail(email);
            setPassword(password);
            setToken(response.jwt);
            setLoggedIn(true);
            navigate(location.state?.from?.pathname || "/home");
        } else {
            setLoggedIn(false);
        }
    };

    const changeRegionHandler = (regionName, regionUrl) => {
        setBaseUrl(regionUrl);
        setRegionName(regionName);
    };

    useEffect(() => {}, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                baseUrl: baseUrl,
                regionName: regionName,
                email: email,
                password: password,
                token: token,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                onChangeRegion: changeRegionHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
