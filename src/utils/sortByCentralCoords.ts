import { Cell } from "../models/Cell"

function sortByCentralCoordinates(arr: Cell[]) {
  // Найдем центральные координаты
  const centralX = arr.reduce((sum, obj) => sum + obj.colIndex, 0) / arr.length
  const centralY = arr.reduce((sum, obj) => sum + obj.rowIndex, 0) / arr.length

  // Используем функцию сортировки, чтобы сравнить расстояние от каждого объекта до центральных координат
  arr.sort((a, b) => {
    const distA = Math.sqrt((a.colIndex - centralX) ** 2 + (a.rowIndex - centralY) ** 2)
    const distB = Math.sqrt((b.colIndex - centralX) ** 2 + (b.rowIndex - centralY) ** 2)

    return distA - distB
  })

  return arr
}

export default sortByCentralCoordinates
