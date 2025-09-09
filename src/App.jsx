import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import { Horarios } from './db/horarios';
import { Produtos } from './db/produtos';
import Popup from './components/Popup';

function App() {

  const [Status, setStatus] = useState('');

  const [ShowPopup, setShowPopup] = useState(false);
  const [Animacao, setAnimacao] = useState('');

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


  const handlerHorarios = () => {
    setAnimacao('animate__animated animate__fadeIn')
    setShowPopup(true);
  }

  const handlerCloseHorarios = () => {
    setAnimacao('animate__animated animate__fadeOut')
    setTimeout(() => {setShowPopup(false)}, 500)
  } 

  const ProdutoMensagem = (foto, nome, valor) => {
    const produtoEmCarrinho = ProdutosSelecionados.find(item => item.nome === nome);

    if(!produtoEmCarrinho){
      const produto = {
        foto: foto,
        nome: nome,
        valor: valor,
      }

      const novosProdutosSelecionados = [...ProdutosSelecionados, produto];
      setProdutosSelecionados(novosProdutosSelecionados);

      const itens = novosProdutosSelecionados.map(item => `[${item.nome}, A partir de ${item.valor}]`);

      const listaDeItens = itens.join('\n');

      const mensagem = `Olá! Gostaria de saber sobre: \n\n${listaDeItens}\n\n Poderia me passar mais detalhes?`

      const MensagemForm = encodeURIComponent(mensagem)
      
      const link = `https://wa.me/556194030319/?text=${MensagemForm}`

      window.open(link)
    }
  }

    return (
    <>
      
      {ShowPopup && (
        <>
          <Popup onClick={handlerCloseHorarios} animacao={Animacao} />
        </>
      )
      }


      <main className='w-dvw min-h-dvh px-2 py-8 md:px-[5rem] md:py-[2rem] flex items-center justify-center bg-[url("/fundo.jpg")] bg-cover bg-center bg-no-repeat bg-fixed'>
        <div className='bg-neutral-900 border-2 border-gold rounded-2xl p-4 sm:p-8 relative w-full max-w-4xl overflow-hidden'>
          
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
              background: 'radial-gradient(ellipse at center, rgba(252, 194, 0, 0.25) 0%, transparent 70%)',
              filter: 'blur(48px)',
              transform: 'translate(50%, 20%)'
            }}
          ></div>

          <button className='absolute top-4 right-4 bg-transparent hover:bg-neutral-800 border-gold-H border border-gold px-3 py-1.5 hidden rounded-full text-gold text-gold-H cursor-pointer transition-colors duration-300 z-11'>
            <i className='bi bi-cart4 text-lg'></i>
          </button>
          {ProdutosSelecionados.length >= 1 && (
            <span className='absolute cursor-default top-2 right-2 bg-gold px-[7px] py-[1px] text-xs font-bold text-black rounded-full hidden z-10'>
              {ProdutosSelecionados.length}
            </span>
          )}
          <div className='Header space-y-4 relative z-10'>
            <div className='Foto flex justify-center w-full'>
              <img src="/perfil.jpg" className='w-[150px] h-[150px] rounded-full object-cover border-2 border-gold' alt="ElisMakeup" />   
            </div>
            <div className='Text flex flex-col justify-center items-center text-center space-y-2'>
              <span className='cursor-default text-white font-bold text-3xl tracking-wider'>ElisMakeup</span>
              <span className='cursor-default text-white font-bold text-md tracking-wider'>📍DF - Brasília</span>
              <span className='cursor-default text-white'>Estou:  <span className={`font-bold cursor-default ${Status === 'Disponível' ? "text-green-500" : "text-red-500"}`} >{Status}</span></span>
              <div className='flex justify-center items-center'>
                <button className='bg-transparent hover:bg-gold border border-gold p-2 cursor-pointer rounded-lg text-white hover:bg-neutral-800  transition-colors duration-300' onClick={handlerHorarios}>Ver horários</button>
              </div>
            </div>
            <div className='Social flex justify-center items-center py-2'>
              <div className='p-2 rounded-lg flex justify-center items-center px-6 sm:px-8 gap-6 border border-gold'>
                <a href="https://wa.me/556194030319/?text=Ol%C3%A1%20estou%20interessada(o)%20nos%20seus%20servi%C3%A7os!" target="_blank" rel="noopener noreferrer" className='cursor-pointer text-gold text-gold-H text-3xl transition-colors duration-300'><i className='bi bi-whatsapp'></i></a>
                <a href="https://www.instagram.com/elissilvamakeup/" target="_blank" rel="noopener noreferrer" className='cursor-pointer text-gold text-3xl text-gold-H transition-colors duration-300'><i className='bi bi-instagram'></i></a>
              </div>
            </div>
          </div>
          <div className='Body flex flex-col rounded-xl mt-6 relative z-10'>
            <div className='bg-gold p-3 rounded-t-lg text-center'>
              <span className='font-bold text-black cursor-default text-xl'>Meus Serviços</span>
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
