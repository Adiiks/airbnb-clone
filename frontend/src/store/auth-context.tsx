import React, { createContext, useEffect, useState } from "react";
import Auth from "../models/Auth";
import axios from "axios";

type Props = {
    children: React.ReactNode
}

type AuthContextValue = {
    auth: Auth | null,
    setAuth: (auth: Auth | null) => void
}

const authString = localStorage.getItem('auth');
const initialAuth = (authString) ? JSON.parse(authString) : null;

export const AuthContext = createContext<AuthContextValue>({
    auth: {
        token: '',
        id: 0,
        email: '',
        fullName: ''
    },
    setAuth: () => {}
});

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(initialAuth);

    useEffect(() => {
        if (auth) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token;
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('auth');
        }
    }, [auth]);

    function setAuthHandler(auth: Auth | null) {
        setAuth(auth);
    }

    const contextValue: AuthContextValue = {
        auth: auth,
        setAuth: setAuthHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;