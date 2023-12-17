import React from "react"
import Button from "../Button"
import useModal from "@/src/hooks/modal"

interface Props {}

const ModalFinal = (props: Props) => {
  const {setModalType} = useModal()
  const onStart = () => {
    setModalType(null)
  }
  return (
    <div className="flex items-center text-black pt-6 flex-col h-full">
      <img
        className="w-[52px] h-[52px] rotate-[60deg] absolute top-1 object-cover left-[40%]"
        src="puzzle-blue.png"
      />
      <img
        className="w-[52px] h-[52px] absolute top-3 object-cover left-[48%]"
        src="puzzle-orange.png"
      />
      <p className="text-sm text-center mb-5 leading-6 font-medium">
        Для того, чтобы начать складывать пазлы<br/> нажмите кнопку «Начать игру».
        Вам будет доступно 3 варианта<br/> картинок, переход к каждой
        последовательный, нажав кнопку<br/>«Начать игру»
      </p>
      <p className="text-sm text-center mb-6 leading-6 font-medium">
        Вы можете загрузить свою картинку, нажав «Выбрать картинку»,<br/> настроить
        любое количество строк и количество пазлов,<br/> размер меняется
        автоматически по выбору строк.<br/> Кнопка «Собрать автоматически» показывает
        вам финальный результат.
      </p>
      <Button onClick={onStart} className="!bg-brand text-white hover:bg-brand hover:opacity-70 hover:text-white w-[127px] rounded-2xl">Начать</Button>
    </div>
  )
}

export default ModalFinal
