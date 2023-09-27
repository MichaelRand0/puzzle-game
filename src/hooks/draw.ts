import { RefObject, useEffect, useState } from "react"
import { Cell } from "../models/Cell"
import { useCanvas } from "./canvas"
import { useDimensions } from "./dimensions"
import { useSettings } from "./settings"
import useGame from "./game"
import shuffleArray from "../utils/shuffleArray"

const useDraw = (imgRef: RefObject<HTMLImageElement>) => {
  const { cells, setCells, ctx } = useCanvas()
  const { SIZES, cellHeight, cellWidth } = useDimensions()
  const { cols, rows, speed, direction } = useSettings()
  const { isGame, isDrawing, setIsDrawing } = useGame()

  const drawCanvas = (cell: Cell, x: number, y: number) => {
    if (ctx && imgRef.current) {
      ctx.beginPath()
      ctx.globalAlpha = 1
      // drawing tabs

      // tab sizes
      const sz = Math.min(cellWidth, cellHeight)
      const neck = 0.08 * sz
      const tabWidth = 0.16 * sz
      const tabHeight = 0.16 * sz

      // from top left
      ctx.moveTo(x, y)

      // to top right
      if (cell.topTab > 0 || cell.topTab < 0) {
        ctx.lineTo(x + cellWidth * Math.abs(cell.topTab) - neck, y)
        ctx.bezierCurveTo(
          x + cellWidth * Math.abs(cell.topTab) - neck,
          y - tabHeight * Math.sign(cell.topTab) * 0.2,
          x + cellWidth * Math.abs(cell.topTab) - tabWidth,
          y - tabHeight * Math.sign(cell.topTab),
          x + cellWidth * Math.abs(cell.topTab),
          y - tabHeight * Math.sign(cell.topTab)
        )

        ctx.bezierCurveTo(
          x + cellWidth * Math.abs(cell.topTab) + tabWidth,
          y - tabHeight * Math.sign(cell.topTab),
          x + cellWidth * Math.abs(cell.topTab) + neck,
          y - tabHeight * Math.sign(cell.topTab) * 0.2,
          x + cellWidth * Math.abs(cell.topTab) + neck,
          y
        )
      }
      ctx.lineTo(x + cellWidth, y)

      // to bottom right
      if (cell.rightTab > 0 || cell.rightTab < 0) {
        ctx.lineTo(
          x + cellWidth,
          y + cellHeight * Math.abs(cell.rightTab) - neck
        )

        ctx.bezierCurveTo(
          x + cellWidth - tabHeight * Math.sign(cell.rightTab) * 0.2,
          y + cellHeight * Math.abs(cell.rightTab) - neck,
          x + cellWidth - tabHeight * Math.sign(cell.rightTab),
          y + cellHeight * Math.abs(cell.rightTab) - tabWidth,
          x + cellWidth - tabHeight * Math.sign(cell.rightTab),
          y + cellHeight * Math.abs(cell.rightTab)
        )

        ctx.bezierCurveTo(
          x + cellWidth - tabHeight * Math.sign(cell.rightTab),
          y + cellHeight * Math.abs(cell.rightTab) + tabWidth,
          x + cellWidth - tabHeight * Math.sign(cell.rightTab) * 0.2,
          y + cellHeight * Math.abs(cell.rightTab) + neck,
          x + cellWidth,
          y + cellHeight * Math.abs(cell.rightTab) + neck
        )
      }
      ctx.lineTo(x + cellWidth, y + cellHeight)

      //to bottom left
      if (cell.bottomTab > 0 || cell.bottomTab < 0) {
        ctx.lineTo(
          x + cellWidth * Math.abs(cell.bottomTab) + neck,
          y + cellHeight
        )

        ctx.bezierCurveTo(
          x + cellWidth * Math.abs(cell.bottomTab) + neck,
          y + cellHeight + tabHeight * Math.sign(cell.bottomTab) * 0.2,
          x + cellWidth * Math.abs(cell.bottomTab) + tabWidth,
          y + cellHeight + tabHeight * Math.sign(cell.bottomTab),
          x + cellWidth * Math.abs(cell.bottomTab),
          y + cellHeight + tabHeight * Math.sign(cell.bottomTab)
        )

        ctx.bezierCurveTo(
          x + cellWidth * Math.abs(cell.bottomTab) - tabWidth,
          y + cellHeight + tabHeight * Math.sign(cell.bottomTab),
          x + cellWidth * Math.abs(cell.bottomTab) - neck,
          y + cellHeight + tabHeight * Math.sign(cell.bottomTab) * 0.2,
          x + cellWidth * Math.abs(cell.bottomTab) - neck,
          y + cellHeight
        )
      }
      ctx.lineTo(x, y + cellHeight)

      // to top left
      if (cell.leftTab > 0 || cell.leftTab < 0) {
        ctx.lineTo(x, y + cellHeight * Math.abs(cell.leftTab) + neck)

        ctx.bezierCurveTo(
          x + tabHeight * Math.sign(cell.leftTab) * 0.2,
          y + cellHeight * Math.abs(cell.leftTab) + neck,

          x + tabHeight * Math.sign(cell.leftTab),
          y + cellHeight * Math.abs(cell.leftTab) + tabWidth,

          x + tabHeight * Math.sign(cell.leftTab),
          y + cellHeight * Math.abs(cell.leftTab)
        )

        ctx.bezierCurveTo(
          x + tabHeight * Math.sign(cell.leftTab),
          y + cellHeight * Math.abs(cell.leftTab) - tabWidth,

          x + tabHeight * Math.sign(cell.leftTab) * 0.2,
          y + cellHeight * Math.abs(cell.leftTab) - neck,

          x,
          y + cellHeight * Math.abs(cell.leftTab) - neck
        )
      }
      ctx.lineTo(x, y)

      // console.log('scaledTabHeight', scaledTabHeight)

      ctx.save()
      ctx.clip()
      const scaledTabHeight =
        (Math.min(imgRef.current.width / cols, imgRef.current.height / rows) *
          tabHeight) /
        sz

      ctx.drawImage(
        imgRef.current,
        (cell.colIndex * imgRef.current.width) / cols - scaledTabHeight,
        (cell.rowIndex * imgRef.current.height) / rows - scaledTabHeight,
        imgRef.current.width / cols + scaledTabHeight * 2,
        imgRef.current.height / rows + scaledTabHeight * 2,
        x - tabHeight,
        y - tabHeight,
        cellWidth + tabHeight * 2,
        cellHeight + tabHeight * 2
      )

      ctx.restore()

      ctx.stroke()
    }
  }

  const resetDraw = () => {
    const newCells = cells.map((cell) => {
      return {
        ...cell,
        x: cell.initX,
        y: cell.initY,
        isCorrect: false,
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
    if (ctx && SIZES && imgRef.current) {
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)
      ctx.globalAlpha = 0.2
      ctx.drawImage(
        imgRef.current,
        SIZES.tableX,
        SIZES.tableY,
        SIZES.tableWidth,
        SIZES.tableHeight
      )
    }

    newCells.forEach((cell, i) => {
      if (ctx) {
        if (imgRef.current) {
          drawCanvas(cell, cell.x, cell.y)
        }
      }
    })
  }

  const autoDraw = () => {
    const randomisedCells = direction === 'random' ? shuffleArray(randomDraw()) : randomDraw()
    if (SIZES && ctx && imgRef.current) {
      let newCells = randomisedCells
      randomisedCells.forEach((cell, i) => {
        setTimeout(() => {
          const fixedRandomisedCells = newCells.map((randomCell) => {
            if (
              randomCell.colIndex === cell.colIndex &&
              randomCell.rowIndex === cell.rowIndex
            ) {
              return {
                ...randomCell,
                x: randomCell.initX,
                y: randomCell.initY,
              }
            } else {
              return randomCell
            }
          })
          newCells = fixedRandomisedCells
          setCells(newCells)
          updateDraw(newCells)
        }, (i === 0 ? 1 : speed) * (i + 1))
      })
    }
  }

  const randomDraw = () => {
    if (SIZES && ctx) {
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)

      const resettedCells = resetDraw()

      const newCells = resettedCells.map((cell) => {
        const randomX =
          Math.random() * (SIZES.tableWidth / 4 - cellWidth) + SIZES.tableX * 5.4
        const randomY =
          Math.random() * (SIZES.tableHeight / 2 - cellHeight) + SIZES.tableY * 2

        return {
          ...cell,
          x: randomX,
          y: randomY,
          isCorrect: false,
        }
      })
      setCells(newCells)
      // updateDraw(newCells)
      return newCells
    }
    return cells
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
