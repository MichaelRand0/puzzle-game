import { RefObject, useEffect, useState } from "react"
import { useSettings } from "../hooks/settings"
import convertMsToTime from "../utils/msToTime"
import useDraw from "../hooks/draw"

interface Props extends React.ComponentProps<"div"> {
  disabled?: boolean
  imgRef: RefObject<HTMLImageElement>
}

const Panel = (props: Props) => {
  const { children, disabled = false, imgRef } = props
  const { setCols, setRows, setSpeed, cols, rows, speed } = useSettings()
  const { isGame } = useDraw(imgRef)

  const [totalTime, setTotalTime] = useState("")

  useEffect(() => {
    setTotalTime(convertMsToTime(cols * rows * speed))
  }, [cols, rows, speed])

  const [rowsValue, setRowsValue] = useState("5")
  const [colsValue, setColsValue] = useState("8")

  const [timer, setTimer] = useState()

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
  }, [colsValue, rowsValue])

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
    <header className="fixed w-full left-10 top-5 flex items-center">
      <div className="mr-10 w-[340px]">
        {children}
        {isGame ? (
          ""
        ) : (
          <div>
            Время авто. сборки:{" "}
            <span className="text-lime-600 font-medium">{totalTime}</span>
          </div>
        )}
        <div>
          Количество паззлов:{" "}
          <span className="text-lime-600 font-medium">{rows * cols}</span>
        </div>
      </div>
      {isGame ? (
        ""
      ) : (
        <div className="flex">
          <div className="flex flex-col mr-10">
            <span className="mb-1">Количество строк</span>
            <input
              disabled={disabled}
              max={100}
              onChange={(val) =>
                onRowsChange(
                  validateNumber(Number(val.currentTarget.value), 100)
                )
              }
              value={rowsValue}
              type="number"
              className="text-[black] text-lg p-2 text-lime-600 font-medium"
              placeholder={rows.toString()}
            />
          </div>
          <div className="flex flex-col mr-10">
            <span className="mb-1">Количество колоннок</span>
            <input
              disabled={disabled}
              onChange={(val) =>
                onColsChange(
                  validateNumber(Number(val.currentTarget.value), 100)
                )
              }
              type="number"
              value={colsValue}
              className="text-[black] text-lg p-2 text-lime-600 font-medium"
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
              className="text-[black] text-lg p-2 text-lime-600 font-medium"
              placeholder={speed.toString()}
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Panel
