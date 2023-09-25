import { useDimensions } from "../hooks/dimensions"
import { Sizes } from "../models/Sizes"

const getOffsetByCoords = (x: number, y: number, SIZES: Sizes) => {
  if (SIZES) {
    return {
      x: x - SIZES?.windowWidth / 2,
      y: y - SIZES?.windowHeight / 2,
    }
  }
}

export default getOffsetByCoords
