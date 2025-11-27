import React, { createContext, useState, ReactNode } from "react";

interface AuthContextData {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}