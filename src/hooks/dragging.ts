import { RefObject } from "react"
import checkIsClose from "../utils/checkIsClose"
import { useCanvas } from "./canvas"
import { useDimensions } from "./dimensions"
import useDraw from "./draw"

const useDragging = (imgRef: RefObject<HTMLImageElement>) => {
  const { cells, setCells, selectedCell, setSelectedCell } = useCanvas()
  const { SIZES, cellHeight, cellWidth } = useDimensions()

  const { drawCells } = useDraw(imgRef)

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    // get cell by click on it
    const x = e.clientX
    const y = e.clientY
    let copyCells = [...cells]
    const cellToRemove = [...copyCells].reverse().filter((cell) => {
      if (
        x > cell.x &&
        x < cell.x + cellWidth &&
        y > cell.y &&
        y < cell.y + cellHeight &&
        !cell.isCorrect
      ) {
        return true
      }
    })[0]

    const index = copyCells.indexOf(cellToRemove)
    copyCells.splice(index, 1)
    copyCells.push(cellToRemove)

    if (cellToRemove) {
      const newSelectedCell = {
        ...cellToRemove,
        offset: {
          x: x - cellToRemove.x,
          y: y - cellToRemove.y,
        },
      }
      setSelectedCell({ ...newSelectedCell })
      setCells(copyCells)
      // drawCells(copyCells)
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const x = e.clientX
    const y = e.clientY
    if (selectedCell && SIZES) {
      const newCells = cells.map((cell) => {
        if (
          cell.colIndex === selectedCell.colIndex &&
          cell.rowIndex === selectedCell.rowIndex
        ) {
          return {
            ...cell,
            x: x - selectedCell.offset.x,
            y: y - selectedCell.offset.y,
          }
        } else {
          return cell
        }
      })
      setSelectedCell({
        ...selectedCell,
        x: x - selectedCell.offset.x,
        y: y - selectedCell.offset.y,
      })
      setCells(newCells)
      drawCells(newCells)
    }
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const x = e.clientX
    const y = e.clientY
    if (selectedCell) {
      const isClose = checkIsClose(
        { x: selectedCell?.x, y: selectedCell?.y },
        { x: selectedCell?.initX, y: selectedCell?.initY },
        cellWidth
      )
      const newCells = cells.map((cell) => {
        if (
          cell.rowIndex === selectedCell.rowIndex &&
          cell.colIndex === selectedCell.colIndex
        ) {
          return {
            ...selectedCell,
            x: isClose ? selectedCell.initX : x - selectedCell.offset.x,
            y: isClose ? selectedCell.initY : y - selectedCell.offset.y,
            isCorrect: isClose,
          }
        } else {
          return cell
        }
      })
      setCells(newCells)
      setSelectedCell(null)
      drawCells(newCells)
    }
  }

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  }
}

export default useDragging
