'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useState } from 'react'

const cadastroSchema = z.object({ 
  username: z.string().min(3, '*O nome de usuário deve ter pelo menos 3 caracteres.').toUpperCase(),
  email: z.email('*E-mail inválido!').min(1, '*E-mail é obrigatório!'),
  password: z.string().min(6, '*A senha deve ter entre 6 e 30 caracteres.').max(30, '*A senha deve ter entre 6 e 30 caracteres.'),
  confirmPassword: z.string().min(6, '*A senha deve ter entre 6 e 30 caracteres.').max(30, '*A senha deve ter entre 6 e 30 caracteres.'),
  role: z.string().min(1, '*Selecione um cargo!')
}).refine((data) => data.password === data.confirmPassword, {
    message: '*As senhas não coincidem.',
    path: ['confirmPassword'],
});

type CadastroSchemaType = z.infer<typeof cadastroSchema>

export default function ProfilesForm() {

    const { register, handleSubmit, formState: {errors}, reset } = useForm<CadastroSchemaType>({
        resolver: zodResolver(cadastroSchema),
        mode: 'onBlur'
    })

    async function handleCadastroProfiles(data: CadastroSchemaType) {
        try {
            const { confirmPassword, ...dataToSend } = data;
            const apiUrl = 'http://localhost:8080/api/v1/auth/register';
            const resposta = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (resposta.ok) {
                const resultado = await resposta.json();
                console.log('Resposta da API:', resultado);
                alert('Cadastro realizado com sucesso!');
                reset();
            } else {
                const resultadoErro = await resposta.json();
                console.error('Erro ao realizar o cadastro:', resultadoErro);
                alert(`Erro no cadastro: ${resultadoErro.message || 'Verifique o console para mais detalhes.'}`);
            }

        } catch (erro) {
            console.error('Erro ao conectar com a API:', erro);
            alert('Não foi possível conectar com o servidor!');
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form action="#" method="POST" onSubmit={handleSubmit(handleCadastroProfiles)}>
        <div className="justify-items-center pb-5">
            <div className="justify-items-center mb-7">
                <h1 className="text-5xl">Cadastro de Perfil</h1>
            </div>

            <div className="flex mb-6 border-2 rounded-xl p-6">
                <div className="flex flex-col gap-y-3">
                    <label className="px-3 py-1 text-xl align-middle text-right tracking-tight">Nome:</label>
                    <label className="px-3 py-1 text-xl align-middle text-right tracking-tight">Email:</label>
                    <label className="px-3 py-1 text-xl align-middle text-right tracking-tight">Nova Senha:</label>
                    <label className="px-3 py-1 text-xl align-middle text-right tracking-tight">Confirme a Senha:</label>
                    <label className="px-3 py-1 text-xl align-middle text-right tracking-tight">Cargo:</label>
                </div>
                <div className="flex flex-col gap-y-3">
                    <div>
                        <input type="text" className={`border-2 p-1 w-60 ${errors.username ? 'border-red-500' : 'border-black-300'}`} placeholder="João da Silva" {...register('username')}></input>
                    </div>
                    <input type="email" className={`border-2 p-1 w-60 ${errors.email ? 'border-red-500' : 'border-black-300'}`} placeholder="usuario@smar.com.br" {...register('email')}></input>
                    <div className="flex space-x-3">
                        <input type={showPassword ? "text" : "password"} className={`border-2 p-1 w-60 ${errors.password ? 'border-red-500' : 'border-black-300'}`} placeholder="Insira sua senha" {...register('password')}></input>
                        <button type="button" onClick={() => setShowPassword(!showPassword)}><i id="buttonPassword" className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i></button>
                    </div>
                    <div className="flex space-x-3">
                        <input type={showConfirmPassword ? "text" : "password"} className={`border-2 p-1 w-60 ${errors.confirmPassword ? 'border-red-500' : 'border-black-300'}`} placeholder="Confirme sua senha" {...register('confirmPassword')}></input>
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><i id="buttonConfirmPassword" className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i></button>
                    </div>
                    <select className={`border-2 p-1.5 w-60 ${errors.role ? 'border-red-500' : 'border-black-300'}`} {...register('role')}>
                        <option value="">Selecione o Cargo</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuário</option>
                    </select>
                    <div id="error_messages" className="flex flex-col">
                        {errors.username && <p className="text-red-500 text-xs mt-0.5">{errors.username.message}</p>} 
                        {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
                        {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>}
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword.message}</p>}
                        {errors.role && <p className="text-red-500 text-xs mt-0.5">{errors.role.message}</p>}
                    </div>
                </div>
            </div>

            <div className="flex space-x-3">
                <button type="submit" className="bg-green-700 text-white rounded-md px-8 py-2.5 text-lg align-middle hover:cursor-pointer hover:scale-105 hover:transition-all hover:shadow-xl">Cadastrar</button>
                <Link href="../../">
                    <button type="button" className="bg-white text-black border-2 rounded-md px-10 py-2.5 text-lg align-middle hover:cursor-pointer hover:scale-105 hover:transition-all hover:shadow-xl">Voltar</button>
                </Link>
            </div>
        </div>
    </form>
  )
}