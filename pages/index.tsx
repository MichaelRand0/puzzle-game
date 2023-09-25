import Canvas from "@/src/components/Canvas"
import Panel from "@/src/components/Panel"
import { useCanvas } from "@/src/hooks/canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import { useSettings } from "@/src/hooks/settings"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const { SIZES, cellWidth, cellHeight } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const { rows, cols, speed } = useSettings()
  const { ctx, cells, setCells, initializeCells } = useCanvas()

  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (cellWidth > 0) {
      initializeCells()
    }
  }, [cellWidth])

  const resetDraw = () => {
    const newCells = cells.map((cell) => {
      return {
        ...cell,
        x: cell.initX,
        y: cell.initY,
      }
    })
    setCells(newCells)
  }

  const autoDraw = () => {
    if (SIZES && ctx) {
      setIsDrawing(true)
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)
      cells.forEach((cell, i) => {
        ctx.beginPath()
        setTimeout(() => {
          if (imgRef.current) {
            ctx.drawImage(
              imgRef.current,
              (cell.colIndex * imgRef.current.width) / cols,
              (cell.rowIndex * imgRef.current.height) / rows,
              imgRef.current.width / cols,
              imgRef.current.height / rows,
              cell.initX,
              cell.initY,
              cellWidth,
              cellHeight
            )
            ctx.rect(cell.initX, cell.initY, cellWidth, cellHeight)
            ctx.strokeStyle = "black"
            ctx.stroke()
          }
          if (i + 1 === cells.length) {
            setIsDrawing(false)
          }
        }, speed * (i + 1))
      })
    }
    resetDraw()
  }

  const randomDraw = () => {
    if (SIZES && ctx) {
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)
      if (imgRef.current) {
        ctx.globalAlpha = 0.2
        ctx.drawImage(
          imgRef.current,
          SIZES.tableX,
          SIZES.tableY,
          SIZES.tableWidth,
          SIZES.tableHeight
        )
      }

      const newCells = cells.map((cell) => {
        const randomX =
          Math.random() * (SIZES.tableWidth - cellWidth) + SIZES.tableX
        const randomY =
          Math.random() * (SIZES.tableHeight - cellHeight) + SIZES.tableY

        return {
          ...cell,
          x: randomX,
          y: randomY,
        }
      })
      setCells(newCells)
      newCells.forEach((cell) => {
        ctx.beginPath()
        ctx.globalAlpha = 1

        if (imgRef.current) {
          ctx.drawImage(
            imgRef.current,
            (cell.colIndex * imgRef.current.width) / cols,
            (cell.rowIndex * imgRef.current.height) / rows,
            imgRef.current.width / cols,
            imgRef.current.height / rows,
            cell.x,
            cell.y,
            cellWidth,
            cellHeight
          )
          ctx.rect(cell.x, cell.y, cellWidth, cellHeight)
          ctx.strokeStyle = "black"
          ctx.stroke()
        }
      })
    }
  }

  return (
    <main
      onMouseDown={() => console.log("down")}
      className={`w-screen h-screen`}
    >
      <Panel disabled={rows <= 0 || cols <= 0 || isDrawing}>
        <button
          onClick={() => autoDraw()}
          disabled={rows <= 0 || cols <= 0 || isDrawing}
          className="bg-slate-600 text-white p-2 rounded mb-2 mr-4 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
        >
          Начать сборку
        </button>
        <button
          onClick={() => randomDraw()}
          disabled={rows <= 0 || cols <= 0 || isDrawing}
          className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
        >
          Randomize cells
        </button>
        <button
          onClick={() => resetDraw()}
          disabled={rows <= 0 || cols <= 0 || isDrawing}
          className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50"
        >
          Reset cells
        </button>
      </Panel>
      <Canvas
        width={SIZES ? SIZES.innerWidth : 0}
        height={SIZES ? SIZES.innerHeight : 0}
      />
      <img className="hidden" ref={imgRef} src="/example.jpeg" />
    </main>
  )
}
