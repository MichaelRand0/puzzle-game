import Canvas from "@/src/components/Canvas"
import Panel from "@/src/components/Panel"
import { useCanvas } from "@/src/hooks/canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import { useSettings } from "@/src/hooks/settings"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const { innerWidth, innerHeight } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const SIZES = {
    tableWidth: innerWidth / 2,
    tableHeight: innerHeight / 2,
    tableX: innerWidth / 4,
    tableY: innerHeight / 4,
  }

  const { rows, cols, cells, speed } = useSettings()
  const { ctx } = useCanvas()

  const cellWidth = SIZES.tableWidth / cols
  const cellHeight = SIZES.tableHeight / rows

  const [isDrawing, setIsDrawing] = useState(false)

  const draw = (ctx: CanvasRenderingContext2D) => {
    setIsDrawing(true)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    cells.forEach((cell, i) => {
      const x = cell.colIndex * cellWidth + SIZES.tableX
      const y = cell.rowIndex * cellHeight + SIZES.tableY
      ctx.beginPath()

      setTimeout(() => {
        if (imgRef.current) {
          ctx.drawImage(
            imgRef.current,
            (cell.colIndex * imgRef.current.width) / cols,
            (cell.rowIndex * imgRef.current.height) / rows,
            imgRef.current.width / cols,
            imgRef.current.height / rows,
            x,
            y,
            cellWidth,
            cellHeight
          )
          ctx.rect(x, y, cellWidth, cellHeight)
          ctx.strokeStyle = "black"
          ctx.stroke()
        }
        if((i + 1) === cells.length) {
          setIsDrawing(false)
        }
      }, speed * (i + 1))
    })
  }

  return (
    <main className={`w-screen h-screen`}>
      <Panel btnProps={{onClick: () => ctx && draw(ctx), disabled: isDrawing}} />
      <Canvas width={innerWidth} height={innerHeight} draw={draw} />
      <img className="hidden" ref={imgRef} src="/example.jpeg" />
    </main>
  )
}
