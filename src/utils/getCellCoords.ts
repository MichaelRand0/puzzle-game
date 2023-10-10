import { Cell } from "../models/Cell"

const getCellCoords = (randomCell: Cell) => {
  const cellX = Math.round(randomCell.x)
  const cellY = Math.round(randomCell.y)
  const initX = Math.round(randomCell.initX)
  const initY = Math.round(randomCell.initY)

  const coordsArr: { x: number; y: number }[] = []

  const stepX = (cellX - initX) / 59
  const stepY = (cellY - initY) / 59

  const xArr: number[] = Array.from({ length: 60 }, (_, i) => cellX - stepX * i)
  const yArr: number[] = Array.from({ length: 60 }, (_, i) => cellY - stepY * i)

  const arrA = xArr.length > yArr.length ? xArr : yArr

  arrA.forEach((elA, index) => {
    coordsArr.push({
      x:
        xArr.length > yArr.length
          ? elA
          : xArr[index]
          ? xArr[index]
          : randomCell.initX,
      y:
        xArr.length < yArr.length
          ? elA
          : yArr[index]
          ? yArr[index]
          : randomCell.initY,
    })
  })

  return coordsArr
}

export default getCellCoords
