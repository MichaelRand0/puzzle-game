import Button from "@/src/components/Button"
import Canvas from "@/src/components/Canvas"
import Panel from "@/src/components/Panel"
import { useCanvas } from "@/src/hooks/canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import useDragging from "@/src/hooks/dragging"
import useDraw from "@/src/hooks/draw"
import useGame from "@/src/hooks/game"
import { useSettings } from "@/src/hooks/settings"
import { useEffect, useRef } from "react"

export default function Home() {
  const { SIZES, cellWidth } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const { rows, cols } = useSettings()
  const { initializeCells, cells } = useCanvas()

  const { onMouseDown, onMouseMove, onMouseUp } = useDragging(imgRef)
  const { autoDraw, updateDraw, resetDraw, isGame, isDrawing } = useDraw(imgRef)
  const { setIsGame, isWin, setIsWin } = useGame()

  const endGame = () => {
    setIsGame(false)
    setIsWin(false)
    const newCells = resetDraw()
    updateDraw(newCells)
  }

  const startGame = () => {
    setIsGame(true)
  }

  useEffect(() => {
    if (cellWidth > 0) {
      initializeCells()
    }
  }, [cellWidth])

  return (
    <main className={`w-screen h-screen`}>
      <Panel imgRef={imgRef} disabled={isDrawing}>
        <div className="flex mb-2">
          {isGame ? (
            <div>
              <button
                onClick={endGame}
                disabled={rows <= 0 || cols <= 0 || isDrawing}
                className="bg-slate-600 text-white p-2 rounded mr-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
              >
                Закончить игру
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => autoDraw()}
                disabled={rows <= 0 || cols <= 0 || isDrawing}
                className="bg-slate-600 text-white p-2 rounded mr-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
              >
                Начать сборку
              </button>
              <button
                onClick={() => startGame()}
                disabled={rows <= 0 || cols <= 0 || isDrawing}
                className="bg-slate-600 text-white p-2 rounded mr-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
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
          )}
        </div>
      </Panel>
      <Canvas
        onMouseDown={(e) => onMouseDown(e)}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={(e) => onMouseUp(e)}
        width={SIZES ? SIZES.innerWidth : 0}
        height={SIZES ? SIZES.innerHeight : 0}
      />
      <img className="hidden" ref={imgRef} src="/example.jpeg" />
      {isWin && isGame ? (
        <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-black/70">
          <div className="bg-white p-8 shadow-md rounded flex flex-col">
            <h2 className="text-green-500 text-3xl text-center mb-5 font-medium">
              Вы выиграли!
            </h2>
            {/* <div className="text-xl mb-5 text-black font-bold">
          <span>Паззл собран за: </span>
          <span className="text-green-500 font-bold">15 секунд</span>
        </div> */}
            {/* <Button onClick={} className="text-xl mb-3">Начать заново</Button> */}
            <Button onClick={endGame} className="text-xl">Вернуться к настройке</Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  )
}
