type Coord = {
  x: number
  y: number
}

const checkDistance = (p1: Coord, p2: Coord) => {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  )
}

const checkIsClose = (
  currentCoord: Coord,
  correctCoord: Coord,
  cellWidth: number
) => {
  if (
    checkDistance(
      { x: currentCoord.x, y: currentCoord.y },
      { x: correctCoord.x, y: correctCoord.y }
    ) <
    cellWidth / 3
  ) {
    return true
  }
  return false
}

export default checkIsClose
