'use client'
import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';

export default function NavBar() {

    const [showDropMenu, setShowDropMenu] = useState(false);
    const { logout } = useAuth();
    
    // Formatando nome do user para inserí-lo na NavBar
    function PrimeiraMaiuscula(nome: string) {
        if (!nome) { 
            return '';
        }
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }
    const nomeUsuarioCompletoString = localStorage.getItem('username') ?? ''; // esse operador "??" é pra caso o 'username' for nulo, retornar uma string vazia para a variável
    const nomeUsuarioPartes = nomeUsuarioCompletoString.split(' ');
    const primeiroNome = nomeUsuarioPartes[0];
    const nomeUsuario = primeiroNome ? primeiroNome.toLowerCase() : ''; 
    const nomeUsuarioFormatado = PrimeiraMaiuscula(nomeUsuario);
    
    return (
        <header className="fixed w-screen">
            <nav className="flex px-5 justify-between bg-indigo-100 shadow-lg drop-shadow-md">
                <div className="flex gap-12">
                    <div className="flex gap-1 content-center">
                        <img src="../../favicon.ico" alt="Logo do SmarApp" className="content-center" width="60"></img>
                        <h1 className="text-4xl content-center justify-self-auto select-none">SmarApp</h1>
                    </div>
                    <div className="flex gap-6">
                        <button className="text-2xl hover:cursor-pointer hover:text-gray-500 transition-all" type="button"><Link href="./">Dashboard</Link></button>
                        <button className="text-2xl hover:cursor-pointer hover:text-gray-500 transition-all" type="button">Produtos</button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex gap-2 hover:cursor-pointer hover:text-gray-500 hover:fill-gray-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" className="bi bi-cart4 content-center" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 
                            .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 
                            0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 
                            1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                        </svg>
                        <span className="text-2xl content-center hover:cursor-pointer">Meu carrinho</span>
                    </button>
                    <span className="text-2xl content-center">|</span>
                    <button id="dropdownButton" onMouseEnter={() => setShowDropMenu(true)} onMouseLeave={() => setShowDropMenu(false)} className="flex gap-2 hover:cursor-pointer hover:text-gray-500 
                    hover:fill-gray-500 transition-all">
                        <span className="text-2xl content-center hover:cursor-pointer">{nomeUsuarioFormatado}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" className="bi bi-person-fill content-center" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                    </button>
                </div>
            </nav>
            <div id="dropdownMenu" onMouseEnter={() => setShowDropMenu(true)} onMouseLeave={() => setShowDropMenu(false)} className={`absolute flex flex-col rounded-b-md w-43 justify-self-end bg-indigo-100 ${!showDropMenu ? 'hidden' : ''}`}>
                <button className="hover:cursor-pointer hover:text-gray-500 hover:bg-indigo-50 transition-all">Meus Pedidos</button>
                <button className="hover:cursor-pointer hover:text-gray-500 hover:bg-indigo-50 transition-all">Minha Conta</button>
                <button className="hover:cursor-pointer hover:text-gray-500 hover:bg-indigo-50 transition-all"><Link href="./help">Ajuda</Link></button>
                <button onClick={logout} className="hover:cursor-pointer hover:text-red-500 hover:bg-indigo-50 transition-all">Sair</button>
            </div>
        </header>
    );
}