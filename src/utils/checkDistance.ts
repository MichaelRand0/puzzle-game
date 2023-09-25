type Coord = {
  x: number
  y: number
}

const checkDistance = (p1: Coord, p2: Coord) => {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  )
}
