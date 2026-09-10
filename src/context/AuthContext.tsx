import React, { createContext, useContext, useState } from "react";

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
  const [profile, setProfile] = useState<Profile | null>(null);

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

  return (
    <AuthContext.Provider
      value={{ token, saveToken, deleteToken, profile, saveProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UseAuth = () => useContext(AuthContext)!;
