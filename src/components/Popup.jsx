import { Horarios } from "../db/horarios"

export default function Popup({onClick, animacao}){

  return (
    <>
      <div className="w-dvw min-h-dvh bg-black/50 flex justify-center items-center fixed z-50">
        <div className={`Pop rounded-xl bg-neutral-900 p-[1rem] w-90 ${animacao}`}>
          <div className="bg-gold rounded-sm w-full flex justify-between p-[0.5rem] items-center">
            <span className="font-bold cursor-default">Horários de Funcionamento</span>
            <button className="font-bold text-xl rounded-full cursor-pointer" onClick={onClick}><i className="bi bi-x-circle"></i></button>
          </div>
          <div className="Horas flex flex-col justify-center p-[0.5rem] w-full gap-[2px]">
            {Horarios.map((hora, index) => (
              <>
                <div key={index} className="flex gap-[5px]">
                  <span className="cursor-default text-white w-[50%]">{hora.dia}:</span>
                  <div className="flex gap-[5px] w-[50%] justify-center items-center">
                    <span className="cursor-default text-white">{hora.horaA} -</span>
                    <span className="cursor-default text-white">{hora.horaB}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
