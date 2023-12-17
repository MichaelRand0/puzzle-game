import { RefObject, useEffect } from "react"
import { Cell } from "../models/Cell"
import { useCanvas } from "./canvas"
import { useDimensions } from "./dimensions"
import { useSettings } from "./settings"
import useGame from "./game"
import shuffleArray from "../utils/shuffleArray"
import sortByCentralCoordinates from "../utils/sortByCentralCoords"
import getCellCoords from "../utils/getCellCoords"

const useDraw = (imgRef: RefObject<HTMLImageElement>) => {
  const { cells, setCells, ctx, isReady, img } = useCanvas()
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

      ctx.save()
      ctx.clip()
      const imgWidth = imgRef.current.width
      const imgHeight = imgRef.current.height
      const imgSumSize = imgWidth + imgHeight
      const scaledTabHeight =
        (Math.min(imgWidth / cols, imgHeight / rows) * tabHeight) / sz

      ctx.drawImage(
        imgRef.current,
        ((cell.colIndex * imgWidth) / cols - scaledTabHeight), // +
        ((cell.rowIndex * imgHeight) / rows - scaledTabHeight), // +
        (imgWidth / cols + scaledTabHeight * 2),
        (imgHeight / rows + scaledTabHeight * 2),
        (x - tabHeight),
        (y - tabHeight),
        (cellWidth + tabHeight * 2),
        (cellHeight + tabHeight * 2)
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

  let coords: Coord[] = []
  let coordIndex = 0

  const animate = (cell: Cell, list: Cell[]) => {
    if (coords[coordIndex]) {
      const newCell = {
        ...cell,
        x: coords[coordIndex] ? coords[coordIndex].x : cell.x,
        y: coords[coordIndex] ? coords[coordIndex].y : cell.y,
      }

      draw(newCell, list, true)
      coordIndex++
      if (coords[coordIndex]) {
        requestAnimationFrame(() => animate(cell, list))
      } else {
        const nextCell = list[list.indexOf(cell) + 1]
        coordIndex = 0
        if (nextCell) {
          coords = getCellCoords(nextCell)

          const indexOf = list.indexOf(nextCell)
          const newCells = list.map((item, i) => {
            if (i < indexOf || indexOf + 1 === list.length) {
              return {
                ...item,
                x: item.initX,
                y: item.initY,
              }
            } else {
              return item
            }
          })
          setCells(newCells)
          requestAnimationFrame(() => animate(nextCell, list))
        } else {
          setIsDrawing(false)
        }
      }
    }
  }

  const draw = (
    cell: Cell | null = null,
    list: Cell[] = cells,
    isAutoDraw = false
  ) => {
    // console.log('imgRef.current',imgRef.current)
    // console.log('SIZES',SIZES)
    const image = new Image()
    image.src = img
    image.onload = () => {
      if (ctx && SIZES && imgRef.current) {
        ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)
        ctx.globalAlpha = 0.2
        ctx.drawImage(
          imgRef.current,
          SIZES.tableX,
          SIZES.tableY,
          SIZES.tableHeight,
          SIZES.tableHeight
        )
      }
      if (cell) {
        list.forEach((item, i) => {
          const cellFromCells = list.filter(
            (item2) =>
              item2.rowIndex === cell.rowIndex && item2.colIndex === cell.colIndex
          )[0]
          const indexOf = list.indexOf(cellFromCells)
          if (
            item.rowIndex === cell.rowIndex &&
            item.colIndex === cell.colIndex
          ) {
            drawCanvas(cell, cell.x, cell.y)
          } else {
            if (i < indexOf && isAutoDraw) {
              drawCanvas(item, item.initX, item.initY)
            } else {
              drawCanvas(item, item.x, item.y)
            }
          }
        })
      } else {
        list.forEach((item) => {
          drawCanvas(item, item.x, item.y)
        })
      }
    }
  }

  const updateDraw = (newCells: Cell[] = cells) => {
    if (newCells[0]) {
      coords = getCellCoords(newCells[0])
      animate(newCells[0], newCells)
      setIsDrawing(true)
    }
  }

  const pushCells = (newCells: Cell[]) => {
    updateDraw(newCells)
    return newCells
  }

  const autoDraw = () => {
    const randomisedCells =
      direction === "random" ? shuffleArray(randomDraw()) : randomDraw()
    if (SIZES && ctx && imgRef.current) {
      let newCells =
        direction === "bottomRight"
          ? randomisedCells.reverse()
          : randomisedCells

      switch (direction) {
        case "center":
          const sortedCells = sortByCentralCoordinates([...newCells])
          newCells = pushCells(sortedCells)
          break

        case "topLeft":
          newCells = pushCells(newCells)
          break

        case "random":
          newCells = pushCells(newCells)
          break

        case "bottomRight":
          newCells = pushCells(newCells)
        default:
          break
      }
    }
  }

  const randomDraw = () => {
    if (SIZES && ctx) {
      ctx.clearRect(0, 0, SIZES.innerWidth, SIZES.innerHeight)

      const resettedCells = resetDraw()

      const newCells = resettedCells.map((cell) => {
        const randomX =
          Math.random() * (SIZES.tableWidth / 4 - cellWidth) +
          SIZES.tableX * 2.2
        const randomY =
          Math.random() * (SIZES.tableHeight / 2 - cellHeight) +
          SIZES.tableY * 1.8

        return {
          ...cell,
          x: randomX,
          y: randomY,
          isCorrect: false,
        }
      })

      return newCells
    }
    return cells
  }

  useEffect(() => {
    if (isReady) {
      draw(null, cells)
    }
  }, [isReady])

  return {
    resetDraw,
    randomDraw,
    autoDraw,
    updateDraw,
    isDrawing,
    draw,
    isGame,
    animate,
  }
}

export default useDraw
