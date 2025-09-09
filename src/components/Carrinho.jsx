
export default function CarrinhoAside({Produtos, Close, Animacao, onAumentar, onDiminuir, SomaTodos, WPP, Status}){

  return (
    <>
      <div className="w-dvw min-h-dvh fixed flex bg-black/50 justify-end items-center fixed z-50">
        
        <aside className={`${Animacao} min-h-dvh w-75 bg-neutral-900 flex flex-col`}>
          <div className="bg-gold p-[1rem] flex">
            <div className={`mr-[5px] flex justify-center items-center w-[5%]`}>
              <button className="bg-transparent text-black cursor-pointer mt-[5px] font-bold text-xl" title="Fechar" onClick={Close}><i className="bi bi-x-circle"></i></button>
            </div>
            <div className="w-[95%] flex justify-center items-center text-center">
              <span className="font-bold cursor-default">Meu carrinho</span>
            </div>
          </div>
          <div className={`Produtos flex-1 flex-col p-[0.5rem] overflow-y-auto ${Produtos.length > 0 ? "" : "flex justify-center items-center"}`}>
            {Produtos.length > 0 ? (
              Produtos.map(produto => (
                  <div key={produto.nome} className="p-[1rem] mb-[5px] bg-black border-gold border-1 rounded-sm flex shadow-md">
                    <div>
                      <img src={produto.foto} className="w-[95px] h-[95px] rounded-sm object-cover" alt="" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between ml-[5px] px-1 pt-2">
                      <span className="text-white font-bold cursor-default">{produto.nome}</span>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold cursor-default text-xs">{`R$`}{produto.valor}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => onAumentar(produto.nome)} className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-neutral-400 transition-colors cursor-pointer">
                            <i className="bi bi-plus font-bold"></i>
                          </button>
                          <span className="text-white font-bold cursor-default">{produto.multiplicador}</span>
                          <button onClick={() => onDiminuir(produto.nome)} className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-neutral-400 transition-colors cursor-pointer">
                            <i className="bi bi-dash font-bold"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
            ) : (
              <>
                <div className="p-[1rem] flex justify-center items-center">
                  <span className="text-zinc-300 cursor-default font-bold text-base text-center">Carrinho vazio, Selecione um produto :)</span>
                </div>
              </>
            )
            }
          </div>

          <div className="Bottom">
            <div className="Total flex w-full justify-end">
              <div className="px-[0.5rem] py-[0.2rem] rounded-t-xl flex justify-center items-center bg-gold">
                <span className="font-bold text-sm cursor-default">{`Total: R$`}{SomaTodos}</span>
              </div>
            </div>
            <div className="Button w-full flex justify-center items-center bg-gold p-[0.5rem]">
              {Status === "Fechada" ? (
                <button  className="bg-zinc-700 flex items-center justify-center text-white font-bold gap-[4px] w-full p-[0.5rem] rounded-sm cursor-not-allowed"><i className="bi bi-whatsapp"></i>Fechada</button>
              ) : (
                <a href={`${WPP}`} target="_blank" className="bg-green-500 flex items-center justify-center text-white font-bold gap-[4px] w-full p-[0.5rem] rounded-sm cursor-pointer hover:bg-green-600"><i className="bi bi-whatsapp"></i>Entrar em contato</a>    
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
