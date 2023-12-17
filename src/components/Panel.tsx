import { ChangeEvent, RefObject, useEffect, useState } from "react"
import { useSettings } from "../hooks/settings"
import convertMsToTime from "../utils/msToTime"
import { Direction } from "../models/Settings"
import useDraw from "../hooks/draw"
import { useCanvas } from "../hooks/canvas"
import shuffleArray from "../utils/shuffleArray"
import useGame from "../hooks/game"

interface Props extends React.ComponentProps<"div"> {
  disabled?: boolean
  imgRef: RefObject<HTMLImageElement>
}

const Panel = (props: Props) => {
  const { children, disabled = false, imgRef } = props
  const { setCols, setRows, direction, setDirection, cols, rows, speed } =
    useSettings()

    const {isGame} = useGame()

  const { img, setImg, setCells } = useCanvas()

  const { draw, resetDraw, randomDraw } = useDraw(imgRef)

  const [totalTime, setTotalTime] = useState("")

  useEffect(() => {
    setTotalTime(convertMsToTime(cols * rows * 1000))
  }, [cols, rows, speed])

  const [rowsValue, setRowsValue] = useState(rows.toString())
  const [colsValue, setColsValue] = useState(cols.toString())

  const [directionValue, setDirectionValue] = useState<Direction>(direction)

  const validateNumber = (val: number, max: number) => {
    const numberVal = Number(val)
    const numberMax = Number(max)
    if (numberVal < numberMax) {
      return val
    }
    return max
  }

  useEffect(() => {
    setCols(Number(colsValue))
    setRows(Number(rowsValue))
    setDirection(directionValue)
  }, [colsValue, rowsValue, directionValue])

  const onRowsChange = (val: number) => {
    const newVal =
      Math.floor(val) % 2 === 0
        ? Math.floor(val).toString()
        : Math.floor(val).toString()
    setRowsValue(newVal)
    setColsValue((Number(newVal) * 2).toString())
  }

  const onColsChange = (val: number) => {
    const newVal =
      Math.floor(val) % 2 === 0
        ? Math.floor(val).toString()
        : Math.floor(val).toString()
    setColsValue(newVal)
    setRowsValue((Number(newVal) / 2).toString())
  }

  const onFileSelect = (val: ChangeEvent<HTMLInputElement>) => {
    const file = val.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = function (event) {
        if (event.target && imgRef.current) {
          imgRef.current.src = event.target.result?.toString() ?? ""
          setTimeout(() => {
            // draw(null, resetDraw())
            const res = shuffleArray(randomDraw())
            draw(null, res)
            setCells(res)
          }, 1)
          setImg(imgRef.current["src"])
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <header className="fixed w-full left-10 top-5 flex">
      <div className="mr-10 flex flex-col">
        <div>
          {/* <div className="text-black">
            Время авто. сборки:{" "}
            <span className="text-red-600 font-bold">{totalTime}</span>
          </div> */}

          <div className="text-black">
            Количество паззлов:{" "}
            <span className="text-red-600 font-bold">{rows * cols}</span>
          </div>
        </div>
        {children}
      </div>
      <div className="flex items-center">
        <div className="flex flex-col mr-10">
          <span className="mb-1">Количество строк</span>
          <input
            disabled={disabled || isGame}
            max={100}
            onChange={(val) =>
              onRowsChange(validateNumber(Number(val.currentTarget.value), 100))
            }
            value={rowsValue}
            type="number"
            className="w-32 text-lg p-2 text-lime-600 font-medium"
            placeholder={rows.toString()}
          />
        </div>
        {/* <div className="flex flex-col mr-10">
          <span className="mb-1">Количество колоннок</span>
          <input
            disabled={disabled}
            onChange={(val) =>
              onColsChange(validateNumber(Number(val.currentTarget.value), 100))
            }
            type="number"
            value={colsValue}
            className="w-32 text-lg p-2 text-lime-600 font-medium"
            placeholder={cols.toString()}
          />
        </div> */}
        {/* <div className="flex flex-col mr-10">
          <span className="mb-1">Скорость сборки одного паззла(в мс)</span>
          <input
            disabled={disabled}
            onChange={(val) => setSpeed(Number(val.currentTarget.value))}
            type="number"
            defaultValue={speed}
            className=" text-lg p-2 text-lime-600 font-medium"
            placeholder={speed.toString()}
          />
        </div> */}
        {isGame ? '' : <div className="flex flex-col mr-10">
          <label
            className="h-1/2 text-center cursor-pointer flex items-center bg-slate-600 text-white p-2 rounded mr-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity
      -50"
            htmlFor="img"
          >
            Выбрать картинку
          </label>
          <input
            disabled={disabled || isGame}
            id="img"
            onChange={(val) => onFileSelect(val)}
            type="file"
            className="hidden text-transparent p-2 w-64 font-medium placeholder:hidden"
          />
        </div>}
      </div>
    </header>
  )
}

export default Panel
