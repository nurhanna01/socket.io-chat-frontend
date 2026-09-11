import React, { createContext, useContext, useEffect, useState } from "react";
import { UseSocket } from "./SocketContext";

interface AuthContextType {
  token: string | null;
  saveToken: (token: string) => void;
  deleteToken: () => void;
  profile: Profile | null;
  saveProfile: (id: number, username: string) => void;
}
interface Profile {
  id: number;
  username: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  
  const [profile, setProfile] = useState<Profile | null>(
    JSON.parse(localStorage.getItem("profile") || "null") as Profile,
  );

  const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const saveProfile = (id: number, username: string) => {
    setProfile({ id, username });
    localStorage.setItem("profile", JSON.stringify({ id, username }));
  };

  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const { connect } = UseSocket();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("profile");
    if (storedToken && storedProfile) {
      setToken(storedToken);
      setProfile(JSON.parse(storedProfile));
      connect(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, saveToken, deleteToken, profile, saveProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UseAuth = () => useContext(AuthContext)!;
