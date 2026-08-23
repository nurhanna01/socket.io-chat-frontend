import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  saveToken: (token: string) => void;
  deleteToken: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UseAuth = () => useContext(AuthContext)!;
