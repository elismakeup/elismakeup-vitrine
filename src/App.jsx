import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import { Horarios } from './db/horarios';
import { Produtos } from './db/produtos';

function App() {

  const [Status, setStatus] = useState('');


  const [ProdutosSelecionados, setProdutosSelecionados] = useState([]) 

  
  useEffect(() => {

    const verificarStatus = () => {
      const agora = new Date();
      const fuso = 'America/Sao_Paulo';

      const DiaNFormat = agora
        .toLocaleString('pt-BR', { weekday: 'long', timeZone: fuso })
        .replace('-feira', '');
      const Dia = DiaNFormat.charAt(0).toUpperCase() + DiaNFormat.slice(1);

      const horaAtual = agora.toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: fuso,
        hour12: false
      });

      const horaDia = Horarios.find(hora => hora.dia === Dia);

      if(horaDia){
        const { horaA, horaB } = horaDia
        if(horaAtual >= horaA && horaAtual < horaB){
          setStatus('Disponível');
        }else{
          setStatus('Fechada')
        }
      }else{
        setStatus('Fechada')
      }
    }

    verificarStatus();

    const intervalo = setInterval(verificarStatus, 60000)

    return () => clearInterval(intervalo);
  }, []) 

  const ProdutoMensagem = (foto, nome, valor) => {
    const produtoEmCarrinho = ProdutosSelecionados.find(item => item.nome === nome);

    if(!produtoEmCarrinho){
      const produto = {
        foto: foto,
        nome: nome,
        valor: valor,
      }

      const novosProdutosSelecionados = [produto];
      setProdutosSelecionados(novosProdutosSelecionados);

      const itens = novosProdutosSelecionados.map(item => `[Maquiagem ${item.nome === "Casual" ? ("") : ("para")} ${item.nome}]`);

      const listaDeItens = itens.join('\n');

      const mensagem = `Olá! Gostaria de saber sobre: \n\n${listaDeItens}\n\n Poderia me passar mais detalhes?`

      const MensagemForm = encodeURIComponent(mensagem)
      
      const link = `https://wa.me/556194030319/?text=${MensagemForm}`

      window.open(link)
    }
  }

    return (
    <>
      

      <main className='w-dvw min-h-dvh px-2 py-8 md:px-[5rem] md:py-[2rem] flex items-center justify-center'>
        <div className='bg-neutral-900 border-2 border border-fuchsia-700 rounded-2xl p-4 sm:p-8 relative w-full max-w-4xl overflow-hidden'>
          
          <div 
            className="absolute z-0"
            style={{
              width: '500px',
              height: '1000px',
              bottom: '0px',
              left: '0px',
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
              filter: 'blur(48px)',
              transform: 'translate(-50%, 50%)'
            }}
          ></div>

          <div 
            className="absolute z-0"
            style={{
              width: '400px',
              height: '400px',
              top: '0px',
              right: '0px',
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
              filter: 'blur(48px)',
              transform: 'translate(50%, 20%)'
            }}
          ></div>

          <div className='Header space-y-4 relative z-10'>
            <div className='Foto flex justify-center w-full'>
              <img src="/perfil.jpg" className='w-[150px] h-[150px] rounded-full object-cover border-2 border-fuchsia-700' alt="ElisMakeup" />   
            </div>
            <div className='Text flex flex-col justify-center items-center text-center space-y-2'>
              <span className='cursor-default text-white font-bold text-3xl tracking-wider'>ElisMakeup</span>
              <span className='cursor-default text-white font-bold text-sm tracking-wider'>Atendimento em domicílio e salão</span>
              <span className='cursor-default text-white font-bold text-md tracking-wider'>📍DF - Brasília</span>

              <span className='cursor-default text-white'>Estou:  <span className={`font-bold cursor-default ${Status === 'Disponível' ? "text-green-500" : "text-red-500"}`} >{Status}</span></span>
            </div>
            <div className='Social flex justify-center items-center py-2'>
              <div className='p-2 rounded-lg flex justify-center items-center px-6 sm:px-8 gap-6 border border-fuchsia-700'>
                <a href="https://wa.me/556194030319/?text=Ol%C3%A1%20estou%20interessada(o)%20nos%20seus%20servi%C3%A7os!" target="_blank" rel="noopener noreferrer" className='cursor-pointer text-fuchsia-700 hover:text-white text-3xl transition-colors duration-300'><i className='bi bi-whatsapp'></i></a>
                <a href="https://www.instagram.com/elissilvamakeup/" target="_blank" rel="noopener noreferrer" className='cursor-pointer text-fuchsia-700 text-3xl hover:text-white transition-colors duration-300'><i className='bi bi-instagram'></i></a>
              </div>
            </div>
          </div>
          <div className='Body flex flex-col rounded-xl mt-6 relative z-10'>
            <div className='bg-fuchsia-700 p-3 rounded-t-lg text-center'>
              <span className='font-bold text-white cursor-default text-xl'>Meus Serviços</span>
            </div>
            <div className='bg-neutral-800 grid grid-cols-2 lg:grid-cols-3 rounded-b-lg p-2 md:p-4 gap-2 md:gap-4 max-h-96 overflow-y-auto overflow-x-hidden'>
            
              {Produtos.length > 0 ? (
                  Produtos.map((produto, index) => (
                    <React.Fragment key={index}>
                      <Card
                        foto={produto.foto}
                        nome={produto.nome} 
                        descricao={produto.descricao}
                        preco={produto.valor}
                        Status={Status}
                        onClick={() => {ProdutoMensagem(produto.foto, produto.nome, produto.valor)}}
                      />
                    </React.Fragment>
                  ))
                  
              ) : (
                <>
                  <div className='flex justify-center items-center lg:col-span-3 h-48'>
                    <span className='text-neutral-600 cursor-default text-xl font-bold'>Nenhum produto encontrado</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
