import { useEffect, useState } from "react"

export const useDimensions = () => {
  const [innerWidth, setInnerWidth] = useState(300)
  const [innerHeight, setInnerHeight] = useState(300)

  useEffect(() => {
    if (window) {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }
  }, [])

  return { innerWidth, innerHeight }
}
