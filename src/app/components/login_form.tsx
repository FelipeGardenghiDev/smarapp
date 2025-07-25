'use client'
import Link from "next/dist/client/link";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from "../providers/AuthProvider";

const loginSchema = z.object({ 
  email: z.email('*E-mail inválido!'),
  password: z.string().min(6, '*A senha deve ter entre 6 e 30 caracteres.').max(30, '*A senha deve ter entre 6 e 30 caracteres.')
});
type LoginSchemaType = z.infer<typeof loginSchema>

export default function LoginForm() {

    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors}, reset } = useForm<LoginSchemaType>({
            resolver: zodResolver(loginSchema),
            mode: 'onBlur'
        });
    
      async function handleLogin(data: LoginSchemaType) {    
        setIsLoading(true);
        try {
          const apiUrl = 'http://localhost:8080/api/v1/auth/login';
          const resposta = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (resposta.ok) {
            const resultado = await resposta.json();
            console.log('Login realizado com sucesso! Resposta da API:', resultado);
            
            if (resultado.token) {
                console.log('Token salvo no localStorage: ', resultado.token);
                login(resultado.token, resultado.user.username, resultado.user.email, resultado.user.role);
            } else {
                console.warn('API não retornou um token de login.');
            }
            reset();
          } else if (resposta.status == 401) {
            const resultadoErro = await resposta.json();
            console.error('Usuário ou senha inválidos! Erro:', resultadoErro);
            alert('Usuário ou senha inválidos!');
          } else {
            const resultadoErro = await resposta.json();
            console.error('Erro ao realizar o Login:', resultadoErro);
            alert(`Erro no login: ${resultadoErro.message || 'Verifique o console para mais detalhes.'}`);
          }
    
        } catch (erro) {
          console.error('Erro ao conectar com a API:', erro);
          alert('Não foi possível conectar com o servidor! Verifique o console para mais detalhes.');
        } finally {
            setIsLoading(false);
        }
    }
    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main>
            <form action="#" method="POST" onSubmit={handleSubmit(handleLogin)}>
                <div className="justify-items-center p-8 pb-20 sm:p-8">
                    <div className="justify-items-center mb-10">
                    <img src="./favicon.ico" alt="Logo do SmarApp" width="100" height="100"></img>
                    <h1 className="text-5xl tracking-wide">SmarApp</h1>
                    <p className="text-s">Desenvolvido para fins de estudo</p>
                    </div>
                  
                  {/* Testando essa linha  */}
                  {errors.root && <p className="text-red-500 text-center mb-4">{errors.root.message}</p>}

                    <div className="flex border-2 rounded-xl p-6">
                    <div id="campos_login" className="flex space-y-1">
                        <div id="labels" className="flex flex-col gap-y-2">
                        <label className="px-3 py-1 text-xl align-middle text-right">Usuário:</label>
                        <label className="px-3 py-1 text-xl align-middle text-right">Senha:</label>
                        </div>
                        <div id="inputs_login" className="flex max-w-2xl">
                        <div className="flex flex-col gap-y-2">
                            <input type="email" className={`border-2 p-1 w-60 ${errors.email ? 'border-red-500' : 'border-black-300'}`} placeholder="usuario@smar.com.br" {...register('email')}></input>
                            <div className="flex space-x-3">
                            <input type={showPassword ? "text" : "password"} className={`border-2 p-1 w-60 ${errors.password ? 'border-red-500' : 'border-black-300'}`} placeholder="senha do usuário" {...register('password')} ></input>
                            <button type="button" onClick={() => setShowPassword(!showPassword)}><i id="buttonPassword" className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i></button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div id="error_messages" className="flex flex-col mt-2">
                        {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
                        {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>}
                    </div>
                    <div id="botoes" className="justify-items-center mt-5 space-x-5">
                    <button type="submit" className="bg-green-700 text-white rounded-md px-8 py-2.5 text-lg align-middle hover:cursor-pointer hover:scale-105 hover:transition-all hover:shadow-xl">Entrar</button>
                    <Link href="../cadastro/profiles">
                        <button type="button" className="bg-black text-white rounded-md px-6 py-2.5 text-lg align-middle hover:cursor-pointer hover:scale-105 hover:transition-all hover:shadow-xl">Cadastro</button>
                    </Link>
                    </div>
                </div>
            </form>

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Carregando...</p>
                </div>
            )}
        </main>
    );
}