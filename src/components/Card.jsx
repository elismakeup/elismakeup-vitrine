export default function Card({foto, nome, descricao, preco, Status, onClick}){
  return ( 
    <>
      <div className="bg-neutral-950 p-[0.5rem] rounded-sm flex flex-col">
        <div className="Foto flex justify-center">
          <img src={foto} alt="" className="rounded-xl w-full h-[200px]" />
        </div>
        <div className="Text flex flex-col justify-center items-center text-center">
          <span className="cursor-default font-bold text-white text-xl">{nome}</span>
          <span className="cursor-default text-white text-sm">{descricao}</span>
          <div className="w-full flex justify-center items-center">
            <span className="cursor-default flex text-center font-bold text-white text-base">{`A partir de R$`}{preco}</span>
          </div>
        </div>
        <div className="Action flex justify-center items-center w-full mt-[10px]">
          {Status === "Fechada" ? (
            <button className="bg-zinc-600 p-[0.5rem] rounded-sm cursor-not-allowed text-white w-full flex text-xs sm:text-base gap-[5px] justify-center items-center w-full" disabled><i className="bi bi-cart4"></i>Fechada</button>
          ) : (
            <button onClick={onClick} className="bg-green-500 flex items-center justify-center text-white font-bold text-xs sm:text-base gap-[4px] w-full p-[0.5rem] rounded-sm cursor-pointer hover:bg-green-600"><i className="bi bi-whatsapp"></i>Entrar em contato</button>
          )}
        </div>
      </div>
    </>
  )
}
