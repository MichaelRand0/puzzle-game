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
          // drawing tabs

          // tab sizes
          const sz = Math.min(cellWidth, cellHeight)
          const neck = 0.1 * sz
          const tabWidth = 0.2 * sz
          const tabHeight = 0.2 * sz

          // from top left
          ctx.moveTo(cell.x, cell.y)

          // to top right
          if (cell.topTab > 0 || cell.topTab < 0) {
            ctx.lineTo(
              cell.x + cellWidth * Math.abs(cell.topTab) - neck,
              cell.y
            )
            ctx.bezierCurveTo(
              cell.x + cellWidth * Math.abs(cell.topTab) - neck,
              cell.y - tabHeight * Math.sign(cell.topTab) * 0.2,
              cell.x + cellWidth * Math.abs(cell.topTab) - tabWidth,
              cell.y - tabHeight * Math.sign(cell.topTab),
              cell.x + cellWidth * Math.abs(cell.topTab),
              cell.y - tabHeight * Math.sign(cell.topTab)
            )

            ctx.bezierCurveTo(
              cell.x + cellWidth * Math.abs(cell.topTab) + tabWidth,
              cell.y - tabHeight * Math.sign(cell.topTab),
              cell.x + cellWidth * Math.abs(cell.topTab) + neck,
              cell.y - tabHeight * Math.sign(cell.topTab) * 0.2,
              cell.x + cellWidth * Math.abs(cell.topTab) + neck,
              cell.y
            )
          }
          ctx.lineTo(cell.x + cellWidth, cell.y)

          // to bottom right
          if (cell.rightTab > 0 || cell.rightTab < 0) {
            ctx.lineTo(
              cell.x + cellWidth,
              cell.y + cellHeight * Math.abs(cell.rightTab) - neck
            )

            ctx.bezierCurveTo(
              cell.x + cellWidth - tabHeight * Math.sign(cell.rightTab) * 0.2,
              cell.y + cellHeight * Math.abs(cell.rightTab) - neck,
              cell.x + cellWidth - tabHeight * Math.sign(cell.rightTab),
              cell.y + cellHeight * Math.abs(cell.rightTab) - tabWidth,
              cell.x + cellWidth - tabHeight * Math.sign(cell.rightTab),
              cell.y + cellHeight * Math.abs(cell.rightTab)
            )

            ctx.bezierCurveTo(
              cell.x + cellWidth - tabHeight * Math.sign(cell.rightTab),
              cell.y + cellHeight * Math.abs(cell.rightTab) + tabWidth,
              cell.x + cellWidth - tabHeight * Math.sign(cell.rightTab) * 0.2,
              cell.y + cellHeight * Math.abs(cell.rightTab) + neck,
              cell.x + cellWidth,
              cell.y + cellHeight * Math.abs(cell.rightTab) + neck
            )
          }
          ctx.lineTo(cell.x + cellWidth, cell.y + cellHeight)

          //to bottom left
          if (cell.bottomTab > 0 || cell.bottomTab < 0) {
            ctx.lineTo(
              cell.x + cellWidth * Math.abs(cell.bottomTab) + neck,
              cell.y + cellHeight
            )

            ctx.bezierCurveTo(
              cell.x + cellWidth * Math.abs(cell.bottomTab) + neck,
              cell.y + cellHeight + tabHeight * Math.sign(cell.bottomTab) * 0.2,
              cell.x + cellWidth * Math.abs(cell.bottomTab) + tabWidth,
              cell.y + cellHeight + tabHeight * Math.sign(cell.bottomTab),
              cell.x + cellWidth * Math.abs(cell.bottomTab),
              cell.y + cellHeight + tabHeight * Math.sign(cell.bottomTab)
            )

            ctx.bezierCurveTo(
              cell.x + cellWidth * Math.abs(cell.bottomTab) - tabWidth,
              cell.y + cellHeight + tabHeight * Math.sign(cell.bottomTab),
              cell.x + cellWidth * Math.abs(cell.bottomTab) - neck,
              cell.y + cellHeight + tabHeight * Math.sign(cell.bottomTab) * 0.2,
              cell.x + cellWidth * Math.abs(cell.bottomTab) - neck,
              cell.y + cellHeight
            )
          }
          ctx.lineTo(cell.x, cell.y + cellHeight)

          // to top left
          if (cell.leftTab > 0 || cell.leftTab < 0) {
            ctx.lineTo(
              cell.x,
              cell.y + cellHeight * Math.abs(cell.leftTab) + neck
            )

            ctx.bezierCurveTo(
              cell.x + tabHeight * Math.sign(cell.leftTab) * 0.2,
              cell.y + cellHeight * Math.abs(cell.leftTab) + neck,

              cell.x + tabHeight * Math.sign(cell.leftTab),
              cell.y + cellHeight * Math.abs(cell.leftTab) + tabWidth,

              cell.x + tabHeight * Math.sign(cell.leftTab),
              cell.y + cellHeight * Math.abs(cell.leftTab)
            )

            ctx.bezierCurveTo(
              cell.x + tabHeight * Math.sign(cell.leftTab),
              cell.y + cellHeight * Math.abs(cell.leftTab) - tabWidth,

              cell.x + tabHeight * Math.sign(cell.leftTab) * 0.2,
              cell.y + cellHeight * Math.abs(cell.leftTab) - neck,

              cell.x,
              cell.y + cellHeight * Math.abs(cell.leftTab) - neck
            )
          }
          ctx.lineTo(cell.x, cell.y)

          ctx.save()
          ctx.clip()

          const scaledTabHeight =
            (Math.min(
              imgRef.current.width / cols,
              imgRef.current.height / rows
            ) *
              tabHeight) /
            sz

          ctx.drawImage(
            imgRef.current,
            (cell.colIndex * imgRef.current.width) / cols - scaledTabHeight,
            (cell.rowIndex * imgRef.current.height) / rows - scaledTabHeight,
            imgRef.current.width / cols + scaledTabHeight * 2,
            imgRef.current.height / rows + scaledTabHeight * 2,
            cell.x - tabHeight,
            cell.y - tabHeight,
            cellWidth + tabHeight * 2,
            cellHeight + tabHeight * 2
          )

          ctx.restore()

          // ctx.rect(cell.x, cell.y, cellWidth, cellHeight)
          // ctx.strokeStyle = "purple"
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
