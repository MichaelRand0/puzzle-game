export type Cell = {
  rowIndex: number
  colIndex: number
  x: number
  y: number
  initX: number
  initY: number
  isCorrect: boolean
}

export type SelectedCell = {
  offset: {
    x: number
    y: number
  }
} & Cell