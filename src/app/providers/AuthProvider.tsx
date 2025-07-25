'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  authToken: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (token: string, username: string, email: string, role: string) => void;
  logout: () => void;
  isLoadingAuth: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const router = useRouter();

  // Função de Login
  const login = useCallback((token: string, username: string, email: string, role: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    setAuthToken(token);
    setUsername(username);
    setEmail(email);
    setRole(role);
    router.push('/');
  }, [router]);

  // Função de Logout
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setAuthToken(null);
    setUsername(null);
    setEmail(null);
    setRole(null);
    router.push('/login'); // Redireciona para a página de login após logout
  }, [router]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setAuthToken(storedToken);
    }
    setIsLoadingAuth(false);
  }, []);

  // O valor que será fornecido pelo contexto
  const contextValue = {
    authToken,
    username,
    email,
    role,
    isLoggedIn: !!authToken, // true se authToken não for null ou string vazia
    login,
    logout,
    isLoadingAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para consumir o contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth precisa ser usado com um AuthProvider');
  }
  return context;
};