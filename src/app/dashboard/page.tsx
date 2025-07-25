'use client'
import Link from "next/link";

export default function Dashboard() {

  function formatarNomeCompleto(nome: string) {
    if (!nome || typeof nome != 'string') {
      return '';
    }
    // Remover espaços em branco no início e no fim, e depois dividir a string a cada espaço
    const palavras = nome.trim().split(/\s+/);
    // Mapear cada palavra para deixar a primeira letra em maiúsculo e o resto em minúsculo
    const palavrasFormatadas = palavras.map(palavra => {
      if (palavra.length === 0) {
        return '';
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    });
    // Juntar todos os nomes de volta
    return palavrasFormatadas.join(' ');
  }

  const nomeUsuarioFormatado = formatarNomeCompleto(localStorage.getItem('username'));

  return (
    <div className="justify-items-center pt-20">
      <main className="flex-1 py-6 bg-gray-50 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-3xl flex justify-center font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="flex justify-center text-gray-500 dark:text-gray-400 mt-1"><span className="flex gap-2">É bom ter você de volta! Aqui está a visão geral do seu perfil.<i className="bi bi-emoji-smile"></i></span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pedidos Realizados</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">6</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-3">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Último Pedido: #0006 em 25/07/2025</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Lista de Desejos</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">x itens</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/50 rounded-full p-2.5">
                <svg className="w-5 h-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Atualizada em: 25/07/2025</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:cursor-pointer">
            <Link href="./help">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Suporte</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">Fale Conosco</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/50 rounded-full p-2.5">
                  <svg className="w-5 h-5 text-yellow-500 dark:text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Canais: WhatsApp, E-mail e Telefone</p>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Acessar Meu</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">Perfil</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-900/50 rounded-full p-2.5">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">{nomeUsuarioFormatado}</p>
          </div>

        </div>

        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Últimas compras</h3>
          <div className="overflow-y-auto h-80">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  <th scope="col" className="px-4 py-3">Data</th>
                  <th scope="col" className="px-4 py-3">Nº do Pedido</th>
                  <th scope="col" className="px-4 py-3">Valor</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">25/07/2025</td>
                  <td className="px-4 py-3 font-medium">#0006</td>
                  <td className="px-4 py-3">R$ 6,66</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Entregue</span></td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">25/07/2025</td>
                  <td className="px-4 py-3 font-medium">#0005</td>
                  <td className="px-4 py-3">R$ 135,50</td>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Enviado</span></td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">25/07/2025</td>
                  <td className="px-4 py-3 font-medium">#0004</td>
                  <td className="px-4 py-3">R$ 1.234,56</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Entregue</span></td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">25/07/2025</td>
                  <td className="px-4 py-3 font-medium">#0003</td>
                  <td className="px-4 py-3">R$ 89,90</td>
                  <td className="px-4 py-3"><span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Cancelado</span></td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">25/07/2025</td>
                  <td className="px-4 py-3 font-medium">#0002</td>
                  <td className="px-4 py-3">R$ 312,00</td>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Enviado</span></td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">25/07/2025</td>
                  <td className="px-4 py-3 font-medium">#0001</td>
                  <td className="px-4 py-3">R$ 55,20</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Entregue</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}