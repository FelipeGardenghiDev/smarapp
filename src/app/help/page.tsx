'use client'
import React, { useEffect } from 'react'
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import NavBar from '../components/navbar';

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
      <div className="justify-items-center pt-20">
        <main className="flex-1 py-6">
          <div className="mb-8">
            <h1 className="text-3xl flex justify-center font-bold text-gray-800 dark:text-white">Fale Conosco</h1>
            <p className="flex justify-center text-gray-500 dark:text-gray-400 mt-1">Precisando de ajuda? Entre em contato conosco!</p>
          </div>
        </main>
      </div>
    </>
  );
}