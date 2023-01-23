import {createContext, useState, useEffect} from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export function AuthContextProvider(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setLoggedIn(true);
    };

    useEffect(() => {
        const storedUserLoggedInformation = localStorage.getItem('isLoggedIn')

        if(storedUserLoggedInformation === '1'){
            setLoggedIn(true)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
