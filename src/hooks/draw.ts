import { RefObject, useEffect, useState } from "react"
import { Cell } from "../models/Cell"
import { useCanvas } from "./canvas"
import { useDimensions } from "./dimensions"
import { useSettings } from "./settings"
import useGame from "./game"

const useDraw = (imgRef: RefObject<HTMLImageElement>) => {
  const { cells, setCells, ctx } = useCanvas()
  const { SIZES, cellHeight, cellWidth } = useDimensions()
  const { cols, rows, speed } = useSettings()
  const { isGame, isDrawing, setIsDrawing } = useGame()

  const resetDraw = () => {
    const newCells = cells.map((cell) => {
      return {
        ...cell,
        x: cell.initX,
        y: cell.initY,
        isCorrect: false
      }
    })
    newCells.sort((a, b) => {
      if (a.rowIndex === b.rowIndex) {
        return a.colIndex - b.colIndex // Если значения `x` равны, сортируем по значению `y`
      } else {
        return a.rowIndex - b.rowIndex // Иначе сортируем по значению `x`
      }
    })

    setCells(newCells)
    return newCells
  }

  const updateDraw = (newCells: Cell[] = cells) => {
    if (ctx && SIZES) {
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)
    }
    if (isGame && ctx && SIZES) {
      if (imgRef.current) {
        ctx.globalAlpha = 0.2
        ctx.drawImage(
          imgRef.current,
          SIZES.tableX,
          SIZES.tableY,
          SIZES.tableWidth,
          SIZES.tableHeight
        )
      }
    }
    newCells.forEach((cell, i) => {
      if (ctx) {
        ctx.beginPath()
        ctx.globalAlpha = 1

        if (imgRef.current) {
          ctx.drawImage(
            imgRef.current,
            (cell.colIndex * imgRef.current.width) / cols,
            (cell.rowIndex * imgRef.current.height) / rows,
            imgRef.current.width / cols,
            imgRef.current.height / rows,
            cell.x,
            cell.y,
            cellWidth,
            cellHeight
          )
          ctx.rect(cell.x, cell.y, cellWidth, cellHeight)
          ctx.strokeStyle = "black"
          ctx.stroke()
        }
      }
    })
  }

  const autoDraw = () => {
    if (SIZES && ctx) {
      setIsDrawing(true)
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)
      cells.forEach((cell, i) => {
        ctx.beginPath()
        setTimeout(() => {
          if (imgRef.current) {
            ctx.drawImage(
              imgRef.current,
              (cell.colIndex * imgRef.current.width) / cols,
              (cell.rowIndex * imgRef.current.height) / rows,
              imgRef.current.width / cols,
              imgRef.current.height / rows,
              cell.initX,
              cell.initY,
              cellWidth,
              cellHeight
            )
            ctx.rect(cell.initX, cell.initY, cellWidth, cellHeight)
            ctx.strokeStyle = "black"
            ctx.stroke()
          }
          if (i + 1 === cells.length) {
            setIsDrawing(false)
          }
        }, speed * (i + 1))
      })
    }
    resetDraw()
  }

  const randomDraw = () => {
    if (SIZES && ctx) {
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)

      const newCells = cells.map((cell) => {
        const randomX =
          Math.random() * (SIZES.tableWidth - cellWidth) + SIZES.tableX
        const randomY =
          Math.random() * (SIZES.tableHeight - cellHeight) + SIZES.tableY

        return {
          ...cell,
          x: randomX,
          y: randomY,
          isCorrect: false,
        }
      })
      setCells(newCells)
      newCells.forEach((cell) => {
        ctx.beginPath()
        ctx.globalAlpha = 1

        if (imgRef.current) {
          ctx.drawImage(
            imgRef.current,
            (cell.colIndex * imgRef.current.width) / cols,
            (cell.rowIndex * imgRef.current.height) / rows,
            imgRef.current.width / cols,
            imgRef.current.height / rows,
            cell.x,
            cell.y,
            cellWidth,
            cellHeight
          )
          ctx.rect(cell.x, cell.y, cellWidth, cellHeight)
          ctx.strokeStyle = "black"
          ctx.stroke()
        }
      })
      updateDraw(newCells)
    }
  }

  useEffect(() => {
    if (isGame) {
      randomDraw()
    } else {
      const newCells = resetDraw()
      updateDraw(newCells)
    }
  }, [isGame])

  return {
    resetDraw,
    randomDraw,
    autoDraw,
    updateDraw,
    isDrawing,
    isGame,
  }
}

export default useDraw
