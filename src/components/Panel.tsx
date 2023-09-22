import { useEffect, useState } from "react"
import { useSettings } from "../hooks/settings"
import convertMsToTime from "../utils/msToTime"

interface Props extends React.ComponentProps<"div"> {
  btnProps: React.ComponentProps<"button">
}

const Panel = (props: Props) => {
  const { btnProps } = props
  const { setCols, setRows, setSpeed, cols, rows, speed } = useSettings()

  const [totalTime, setTotalTime] = useState("")

  useEffect(() => {
    setTotalTime(convertMsToTime(cols * rows * speed))
  }, [cols, rows, speed])

  const [rowsValue, setRowsValue] = useState("5")
  const [colsValue, setColsValue] = useState("8")

  const validateNumber = (val: string, max: string) => {
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

  return (
    <header className="fixed w-full left-10 top-5 flex items-center">
      <div className="mr-10 w-[340px]">
      <button {...btnProps} disabled={Number(rowsValue) <= 0 || Number(colsValue) <= 0 || btnProps.disabled} className="bg-slate-600 text-white p-2 rounded mb-2 hover:bg-slate-400 hover:text-black transition disabled:hover:bg-slate-600 disabled:hover:text-white disabled:opacity-50">
        Начать сборку
      </button>
        <div>
          Время сборки: <span className="text-lime-600 font-medium">{totalTime}</span>
        </div>
        <div>
          Количество паззлов: <span className="text-lime-600 font-medium">{rows * cols}</span>
        </div>
      </div>
      <div className="flex flex-col mr-10">
        <span className="mb-1">Количество строк</span>
        <input
          disabled={btnProps.disabled}
          max={100}
          onChange={(val) =>
            setRowsValue(validateNumber(val.currentTarget.value, "100"))
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
          disabled={btnProps.disabled}
          onChange={(val) =>
            setColsValue(validateNumber(val.currentTarget.value, "100"))
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
          disabled={btnProps.disabled}
          onChange={(val) => setSpeed(Number(val.currentTarget.value))}
          type="number"
          defaultValue={speed}
          className="text-[black] text-lg p-2 text-lime-600 font-medium"
          placeholder={speed.toString()}
        />
      </div>
    </header>
  )
}

export default Panel
