import { FunctionComponent, useState } from 'react'

export const SimulationGrid: FunctionComponent = () => {
  const numCols = 20
  const numRows = numCols

  const generateEmptyGrid = () => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
  }

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            className="w-8 h-8 bg-gray-600 active:bg-sky-800 rounded-md transition-all hover:scale-105"
            key={`${i}-${k}`}
          />
        ))
      )}
    </div>
  )
}
