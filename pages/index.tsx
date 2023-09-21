import Canvas from "@/src/components/Canvas"
import { useDimensions } from "@/src/hooks/dimensions"
import { useRef } from "react"

export default function Home() {
  const { innerWidth, innerHeight } = useDimensions()

  const imgRef = useRef<HTMLImageElement>(null)

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (imgRef.current) {
      ctx.drawImage(
        imgRef.current,
        innerWidth / 3,
        innerHeight / 3,
        innerWidth / 3,
        innerHeight / 3
      )
    }
  }

  return (
    <main className={`w-screen h-screen`}>
      <Canvas width={innerWidth} height={innerHeight} draw={draw} />
      <img className="hidden" ref={imgRef} src="/example.jpeg" />
    </main>
  )
}
