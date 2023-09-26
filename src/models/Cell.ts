export type Cell = {
  rowIndex: number
  colIndex: number
  x: number
  y: number
  initX: number
  initY: number
  isCorrect: boolean
  leftTab: number
  topTab: number
  rightTab: number
  bottomTab: number
}

export type SelectedCell = {
  offset: {
    x: number
    y: number
  }
} & Cell