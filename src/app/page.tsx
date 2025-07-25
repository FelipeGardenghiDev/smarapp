'use client'
import React, { useEffect } from 'react'
import { useAuth } from './providers/AuthProvider';
import { useRouter } from 'next/navigation';
import NavBar from './components/navbar';
import Dashboard from "./dashboard/page";

export default function MainPage() {
  const { isLoggedIn, isLoadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }
    if (!isLoggedIn) {
      console.warn('Usuário não autenticado. Redirecionando...');
      router.push('/login');
    }
  }, [isLoggedIn, isLoadingAuth, router]);

  if (isLoadingAuth) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Verificando autenticação...
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Ou uma mensagem "Redirecionando..."
  }

  return (
    <>
      <NavBar/>
      <Dashboard/>
    </>
  );
}