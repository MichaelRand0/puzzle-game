import React, { useEffect, useRef } from "react"

interface Props extends React.ComponentProps<"canvas"> {
  draw: (context: CanvasRenderingContext2D) => void
}

const Canvas = (props: Props) => {
  const { draw, width, height } = props
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        draw(ctx)
      }
    }
  }, [width, height])

  return <canvas ref={ref} {...props} />
}

export default Canvas
