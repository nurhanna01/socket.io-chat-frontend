import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    token:string|null,
    saveToken: (token: string) => void;
    deleteToken: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}:{children: React.ReactNode})=>{
    const [token, setToken] = useState<string|null>(null)

    const saveToken = (token:string)=>{
        setToken(token)
    }

    const deleteToken = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, saveToken, deleteToken }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)!;