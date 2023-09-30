import { RefObject, useEffect, useState } from "react"
import { useSettings } from "../hooks/settings"
import convertMsToTime from "../utils/msToTime"
import { Direction } from "../models/Settings"

interface Props extends React.ComponentProps<"div"> {
  disabled?: boolean
  imgRef: RefObject<HTMLImageElement>
}

const Panel = (props: Props) => {
  const { children, disabled = false, imgRef } = props
  const { setCols, setRows, setSpeed, direction, setDirection, cols, rows, speed } =
    useSettings()

  const [totalTime, setTotalTime] = useState("")

  useEffect(() => {
    setTotalTime(convertMsToTime(cols * rows * speed))
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

  return (
    <header className="fixed w-full left-10 top-5 flex">
      <div className="mr-10 flex flex-col">
        <div>
          <div className="text-black">
            Время авто. сборки:{" "}
            <span className="text-red-600 font-bold">{totalTime}</span>
          </div>

          <div className="text-black">
            Количество паззлов:{" "}
            <span className="text-red-600 font-bold">{rows * cols}</span>
          </div>
        </div>
        {children}
      </div>
      <div className="flex">
        <div className="flex flex-col mr-10">
          <span className="mb-1">Количество строк</span>
          <input
            disabled={disabled}
            max={100}
            onChange={(val) =>
              onRowsChange(validateNumber(Number(val.currentTarget.value), 100))
            }
            value={rowsValue}
            type="number"
            className=" text-lg p-2 text-lime-600 font-medium"
            placeholder={rows.toString()}
          />
        </div>
        <div className="flex flex-col mr-10">
          <span className="mb-1">Количество колоннок</span>
          <input
            disabled={disabled}
            onChange={(val) =>
              onColsChange(validateNumber(Number(val.currentTarget.value), 100))
            }
            type="number"
            value={colsValue}
            className=" text-lg p-2 text-lime-600 font-medium"
            placeholder={cols.toString()}
          />
        </div>
        <div className="flex flex-col mr-10">
          <span className="mb-1">Скорость сборки одного паззла(в мс)</span>
          <input
            disabled={disabled}
            onChange={(val) => setSpeed(Number(val.currentTarget.value))}
            type="number"
            defaultValue={speed}
            className=" text-lg p-2 text-lime-600 font-medium"
            placeholder={speed.toString()}
          />
        </div>
        <div className="flex flex-col mr-10">
          <span className="mb-1">Направление авто. сборки</span>
          <select
            onChange={(e: any) => setDirectionValue(e.target.value)}
            value={directionValue}
            className="text-black"
          >
            <option value="topLeft">С верхнего левого края</option>
            <option value="topBottom">Сверху и снизу</option>
            <option value="center">С центра</option>
            <option value="random">Случайно</option>
            <option value="leftRight">Слева и справа</option>
            <option value="bottomRight">С нижнего правого края</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Panel
