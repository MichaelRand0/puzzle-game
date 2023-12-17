import { useEffect, useState } from "react"
import { useSettings } from "./settings"
import { Sizes } from "../models/Sizes"

export const useDimensions = () => {
  const [sizes, setSizes] = useState<Sizes | null>(null)
  const { rows, cols } = useSettings()
  const [cellWidth, setCellWidth] = useState(0)
  const [cellHeight, setCellHeight] = useState(0)

  useEffect(() => {
    if (sizes) {
      setCellWidth((sizes.innerHeight * 0.7) / cols)
      setCellHeight((sizes.innerHeight * 0.7) / rows)
    }
  }, [sizes, rows, cols])

  useEffect(() => {
    if (window && !sizes) {
      // initialize sizes
      const newSizes: Sizes = {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        tableWidth: window.innerWidth * 0.7,
        tableHeight: window.innerHeight * 0.7,
        tableX: window.innerWidth * 0.33,
        tableY: window.innerHeight * 0.2,
        windowWidth: window.outerWidth,
        windowHeight: window.outerHeight
      }
      setSizes(newSizes)
    }
  }, [])

  return { SIZES: sizes, cellWidth, cellHeight }
}
