import Canvas from "@/src/components/Canvas"
import Panel from "@/src/components/Panel"
import { useCanvas } from "@/src/hooks/canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import useDragging from "@/src/hooks/dragging"
import useDraw from "@/src/hooks/draw"
import { useSettings } from "@/src/hooks/settings"
import { useEffect, useRef } from "react"

export default function Home() {
  const { SIZES, cellWidth } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const { rows, cols } = useSettings()
  const { initializeCells, cells } = useCanvas()

  const { onMouseDown, onMouseMove, onMouseUp } = useDragging(imgRef)
  const { autoDraw, updateDraw, resetDraw, randomDraw, isDrawing } =
    useDraw(imgRef)

  useEffect(() => {
    if (cellWidth > 0) {
      initializeCells()
    }
  }, [cellWidth])

  return (
    <main className={`w-screen h-screen`}>
      <div className="flex flex-col order-2 max-w-[150px] mt-10 fixed left-10 top-[20%]">
        <button
          onClick={() => autoDraw()}
          disabled={rows <= 0 || cols <= 0 || isDrawing}
          className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
        >
          Начать сборку
        </button>
        <button
          onClick={() => {
            updateDraw(randomDraw())
          }}
          disabled={rows <= 0 || cols <= 0 || isDrawing}
          className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
        >
          Начать игру
        </button>
        {cells.length > 0 ? (
          <button
            onClick={() => {
              updateDraw(resetDraw())
            }}
            disabled={rows <= 0 || cols <= 0 || isDrawing}
            className="bg-slate-600 text-white p-2 rounded hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
          >
            Сбросить
          </button>
        ) : (
          ""
        )}
      </div>
      <Panel imgRef={imgRef} disabled={isDrawing}></Panel>
      <Canvas
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={(e) => onMouseUp(e)}
        width={SIZES ? SIZES.innerWidth : 0}
        height={SIZES ? SIZES.innerHeight : 0}
      />
      <img className="hidden" ref={imgRef} src="/example.jpeg" />
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
