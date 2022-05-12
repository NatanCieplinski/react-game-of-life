export function generateEmptyGrid(
  rowsAmount: number,
  columnAmount: number
): number[][] {
  return [...Array(rowsAmount)].map(() => Array(columnAmount).fill(0))
}

export function generateRandomGrid(
  rowsAmount: number,
  columnAmount: number
): number[][] {
  return [...Array(rowsAmount)].map(() =>
    Array.from(Array(columnAmount), () => (Math.random() > 0.5 ? 1 : 0))
  )
}
