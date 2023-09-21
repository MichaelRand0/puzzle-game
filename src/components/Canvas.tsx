import React, { useEffect, useRef } from "react"
import { useCanvas } from "../hooks/canvas"

interface Props extends React.ComponentProps<"canvas"> {
  draw: (context: CanvasRenderingContext2D) => void
}

const Canvas = (props: Props) => {
  const { draw, width, height } = props
  const ref = useRef<HTMLCanvasElement | null>(null)

  const {setCtx} = useCanvas()

  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        setCtx(ctx)
        // draw(ctx)
      }
    }
  }, [width, height])

  return <canvas ref={ref} {...props} />
}

export default Canvas
