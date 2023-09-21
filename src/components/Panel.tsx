import { useSettings } from "../hooks/settings"

interface Props {}

const Panel = (props: Props) => {
  const {setCols, setRows, setSpeed} = useSettings()
  
  return (
    <header className="fixed w-full left-10 top-5 flex items-center">
      <button className="mr-10">Начать сборку</button>
      <div className="flex flex-col">
        <span className="mb-1">Количество строк</span>
        <input onChange={val => setRows(Number(val.currentTarget.value))} type='number' className="text-[black] text-lg p-2 mr-10" placeholder="5" />
      </div>
      <div className="flex flex-col">
        <span className="mb-1">Количество колоннок</span>
        <input onChange={val => setCols(Number(val.currentTarget.value))} type='number' className="text-[black] text-lg p-2 mr-10" placeholder="8" />
      </div>
      <div className="flex flex-col">
        <span className="mb-1">Скорость сборки(в мс)</span>
        <input onChange={val => setSpeed(Number(val.currentTarget.value))} type='number' className="text-[black] text-lg p-2 mr-10" placeholder="200" />
      </div>
    </header>
  )
}

export default Panel
