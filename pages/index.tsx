import Canvas from "@/src/components/Canvas"
import Panel from "@/src/components/Panel"
import Modal from "@/src/components/modal/Modal"
import { useCanvas } from "@/src/hooks/canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import useDragging from "@/src/hooks/dragging"
import useDraw from "@/src/hooks/draw"
import useGame from "@/src/hooks/game"
import useModal from "@/src/hooks/modal"
import { useSettings } from "@/src/hooks/settings"
import shuffleArray from "@/src/utils/shuffleArray"
import { useEffect, useRef } from "react"

export default function Home() {
  const { SIZES, cellWidth } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const { rows, cols } = useSettings()
  const { initializeCells, cells, setCells, img, isReady, setImg, setCellsSave } = useCanvas()

  const {setModalType} = useModal()

  const { isGame, setIsGame, setIsDrawing, photoIndex, setPhotoIndex, photos } = useGame()

  const { onMouseDown, onMouseMove, onMouseUp } = useDragging(imgRef)
  const { autoDraw, resetDraw, randomDraw, draw, isDrawing } = useDraw(imgRef)

  useEffect(() => {
    if (cellWidth > 0) {
      initializeCells()
    }
  }, [cellWidth])

  useEffect(() => {
    if (isReady) {
      const res = shuffleArray(randomDraw())
      draw(null, res)
      setCells(res)
    }
  }, [isReady, img])

  const startGame = () => {
    setIsGame(true)
    const res = shuffleArray(randomDraw()).map((item, i) => {
      if (i === 0) {
        return {
          ...item,
          x: item.initX,
          y: item.initY,
          isCorrect: true,
        }
      }
      return item
    })
    draw(null, res)
    setCells(res)
  }

  const endGame = () => {
    setIsGame(false)
    const res = shuffleArray(randomDraw())
    draw(null, res)
    setCells(res)
  }

  const autoComplete = () => {
    if (isGame) {
      setCellsSave(cells)
      draw(null, resetDraw())
      setIsDrawing(true)
      setTimeout(() => {
        setModalType('photo')
        setIsDrawing(false)
      }, 3000)
    } else {
      draw(null, resetDraw())
    }
  }

  useEffect(() => {
    if(isGame) {
      const isAllCorrect = cells.filter(cell => !cell.isCorrect).length === 0
      if(isAllCorrect) {
        if(photoIndex + 1 === photos.length) {
          setModalType('final')
          endGame()
        } else {
          setPhotoIndex(photoIndex + 1)
        }
      }
    }
  }, [cells, isGame])

  useEffect(() => {
    const res = shuffleArray(randomDraw()).map((item, i) => {
      if (i === 0) {
        return {
          ...item,
          x: item.initX,
          y: item.initY,
          isCorrect: true,
        }
      }
      return item
    })
    if(res.length > 0) {
      draw(null, res)
      setCells(res)
    }
  }, [img])

  useEffect(() => {
    if (imgRef.current && img !== photos[photoIndex]) {
      imgRef.current.src = photos[photoIndex]
      setImg(photos[photoIndex])
    }
  }, [photoIndex])

  return (
    <main className={`w-screen h-screen`}>
      <Modal imgRef={imgRef} />
      <div className="flex flex-col order-2 max-w-[200px] mt-10 fixed left-10 top-[20%]">
        {/* <button
          onClick={() => {
            setIsGame(false)
            autoDraw()
          }}
          disabled={rows <= 0 || cols <= 0 || isDrawing}
          className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
        >
          Начать сборку
        </button> */}
        {!isGame ? (
          <button
            onClick={startGame}
            disabled={rows <= 0 || cols <= 0 || isDrawing}
            className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
          >
            Начать игру
          </button>
        ) : (
          <button
            onClick={endGame}
            disabled={rows <= 0 || cols <= 0 || isDrawing}
            className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
          >
            закончить игру
          </button>
        )}
        {cells.length > 0 ? (
          <button
            onClick={autoComplete}
            disabled={rows <= 0 || cols <= 0 || isDrawing}
            className="bg-slate-600 text-white p-2 rounded hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
          >
            Собрать автоматически
          </button>
        ) : (
          ""
        )}
      </div>
      <Panel imgRef={imgRef} disabled={isDrawing}></Panel>
      <Canvas
        onMouseDown={(e) => {
          onMouseDown(e)
        }}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={(e) => onMouseUp(e)}
        width={SIZES ? SIZES.innerWidth : 0}
        height={SIZES ? SIZES.innerHeight : 0}
      />
      <img className="hidden" ref={imgRef} src="/example.jpg" />
      {/* {isWin && isGame ? (
        <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-black/70">
          <div className="bg-white p-8 shadow-md rounded flex flex-col">
            <h2 className="text-green-500 text-3xl text-center mb-5 font-medium">
              Вы выиграли!
            </h2>

            <Button onClick={endGame} className="text-xl">Вернуться к настройке</Button>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </main>
  )
}
