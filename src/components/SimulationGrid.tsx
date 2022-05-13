import classNames from 'classnames'
import produce from 'immer'
import { FunctionComponent } from 'react'

export const SimulationGrid: FunctionComponent<{
  grid: number[][]
  setGrid: (grid: number[][]) => void
}> = ({ grid, setGrid }) => {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            className={classNames(
              grid[i][k] ? 'bg-sky-500' : 'bg-gray-600',
              'w-9 h-9 active:bg-sky-800 rounded-md transition-all hover:scale-105 active:scale-100'
            )}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1
              })
              setGrid(newGrid)
            }}
            key={`${i}-${k}`}
          />
        ))
      )}
    </div>
  )
}
