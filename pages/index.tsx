import Canvas from "@/src/components/Canvas"
import Panel from "@/src/components/Panel"
import { useCanvas } from "@/src/hooks/canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import { useSettings } from "@/src/hooks/settings"
import { useEffect, useRef } from "react"

export default function Home() {
  const { innerWidth, innerHeight } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const SIZES = {
    tableWidth: innerWidth / 2,
    tableHeight: innerHeight / 2,
    tableX: innerWidth / 4,
    tableY: innerHeight / 4,
  }

  const { rows, cols, cells } = useSettings()
  const { ctx } = useCanvas()

  const cellWidth = SIZES.tableWidth / cols
  const cellHeight = SIZES.tableHeight / rows

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (imgRef.current) {
      cells.forEach((cell) => {
        const x = cell.colIndex * cellWidth + SIZES.tableX
        const y = cell.rowIndex * cellHeight + SIZES.tableY
        ctx.beginPath()

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
        }

        ctx.rect(x, y, cellWidth, cellHeight)
        ctx.stroke()
      })
    }
  }

  useEffect(() => {
    if (ctx) {
      draw(ctx)
    }
  }, [ctx])

  return (
    <main className={`w-screen h-screen`}>
      <Panel />
      <Canvas width={innerWidth} height={innerHeight - 202} draw={draw} />
      <img className="hidden" ref={imgRef} src="/example.jpeg" />
    </main>
  )
}
