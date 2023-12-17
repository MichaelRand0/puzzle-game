import React, { useCallback } from "react"
import Button from "../Button"
import useModal from "@/src/hooks/modal"
import useGame from "@/src/hooks/game"
import { useCanvas } from "@/src/hooks/canvas"
import useDraw from "@/src/hooks/draw"

interface Props {
  imgRef: any
}

const ModalPhoto = (props: Props) => {
  const {imgRef} = props
  const { setModalType } = useModal()
  const { setPhotoIndex, photoIndex, photos } = useGame()
  const {draw} = useDraw(imgRef)
  const {cellsSave, setCells} = useCanvas()

  const continueGame = () => {
    setCells(cellsSave)
    draw(null, cellsSave, false)
    setModalType(null)
  }
  const toNextPhoto = () => {
    setPhotoIndex(photoIndex + 1)
    setModalType(null)
  }
  return (
    <div className="flex items-center text-black justify-between pt-20 pb-10 flex-col h-full">
      <img
        className="w-[52px] h-[52px] rotate-[60deg] absolute top-5 object-cover left-12"
        src="puzzle-orange.png"
      />
      <img
        className="w-[42px] h-[42px] absolute top-10 object-cover left-[40%]"
        src="puzzle-blue.png"
      />
      <img
        className="w-[50px] h-[50px] absolute top-2 object-cover left-[46%]"
        src="puzzle-orange.png"
      />
      <img
        className="w-[50px] h-[50px] absolute top-[45%] object-cover right-2"
        src="puzzle-blue.png"
      />
      <h2 className="text-base text-center font-bold mb-10 max-w-xs">
        {photoIndex + 1 === photos.length ? 'Вы на последнем пазле!' : 'Перейти к следующему пазлу или продолжить собирать текущий?'}
      </h2>
      <div className="flex items-center">
        {photoIndex + 1 === photos.length ? (
          ""
        ) : (
          <Button
            onClick={toNextPhoto}
            className="!bg-brand !text-white !mr-5 !hover:bg-brand hover:opacity-70 hover:text-white w-[127px] rounded-2xl"
          >
            К следующему
          </Button>
        )}
        <Button
          onClick={continueGame}
          className="!bg-brand !text-white !hover:bg-brand hover:opacity-70 hover:text-white w-[127px] rounded-2xl"
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}

export default ModalPhoto
