import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: string | null;
  userId: string | null; 
  token: string | null; 
  setUser: (user: string | null) => void;
  setUserData: (user: string | null, userId: string | null, token: string | null) => void; 
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("id")); 
  const [token, setToken] = useState<string | null>(localStorage.getItem("token")); 

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id"); 
    localStorage.removeItem("token"); 
    setUser(null);
    setUserId(null);
    setToken(null);
  };

  const setUserData = (newUser: string | null, newUserId: string | null, newToken: string | null) => {
    if (newUser) {
      localStorage.setItem("user", newUser);
    } else {
      localStorage.removeItem("user");
    }
    
    if (newUserId) {
      localStorage.setItem("id", newUserId);
    } else {
      localStorage.removeItem("id");
    }
    
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }

    setUser(newUser);
    setUserId(newUserId);
    setToken(newToken);
  };

  return (
    <UserContext.Provider value={{ user, userId, token, setUser, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}