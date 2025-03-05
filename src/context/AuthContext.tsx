"use client";

import {createContext, useContext, useState, ReactNode, useEffect} from 'react';

type ZoomToken = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  api_url: string;
}

type ZoomUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  account_id: string;
  role_name: string;
  department: string;
}

type AuthContextType = {
  zoomCode: string | null;
  setZoomCode: (code: string | null) => void;
  zoomToken: ZoomToken | null;
  setZoomToken: (token: ZoomToken | null) => void;
  zoomUser: ZoomUser | null;
  setZoomUser: (user: ZoomUser | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [zoomCode, setZoomCode] = useState<string | null>(null);
  const [zoomToken, setZoomToken] = useState<ZoomToken | null>(null);
  const [zoomUser, setZoomUser] = useState<ZoomUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('zoomToken');
    if (storedToken) {
      setZoomToken(JSON.parse(storedToken));
    }
  }, []);

  const setZoomTokenAndStore = (token: ZoomToken | null) => {
    setZoomToken(token);
    if (token) {
      localStorage.setItem('zoomToken', JSON.stringify(token));
    } else {
      localStorage.removeItem('zoomToken');
    }
  };

  const setZoomUserAndStore = (user: ZoomUser | null) => {
    setZoomUser(user)
    if (user) {
      localStorage.setItem('zoomUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('zoomUser');
    }
  };

  return (
    <AuthContext.Provider value={{ zoomCode, setZoomCode, zoomToken, setZoomToken: setZoomTokenAndStore, zoomUser, setZoomUser: setZoomUserAndStore }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
