import produce from 'immer'
import { useCallback, useRef, useState } from 'react'
import { SimulationControls, SimulationGrid } from './components'
import { generateEmptyGrid, generateRandomGrid } from './utils'

const columnAmount = 15
const rowsAmount = 15

const redundant = [
  [0.1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(rowsAmount, columnAmount)
  })

  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const runningRef = useRef(isSimulationRunning)
  runningRef.current = isSimulationRunning

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }
    setGrid((oldGrid) => {
      return produce(oldGrid, (gridCopy) => {
        for (let row = 0; row < rowsAmount; row++) {
          for (let column = 0; column < columnAmount; column++) {
            let neighbors = 0
            redundant.forEach(([x, y]) => {
              const newRow = row + x
              const newColumn = column + y
              if (
                newRow >= 0 &&
                newColumn >= 0 &&
                newRow < rowsAmount &&
                newColumn < columnAmount
              ) {
                neighbors += oldGrid[newRow][newColumn]
              }
            })
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[row][column] = 0
            } else if (oldGrid[row][column] === 0 && neighbors === 3) {
              gridCopy[row][column] = 1
            }
          }
        }
      })
    })
    setTimeout(runSimulation, 150)
  }, [])

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-10 h-screen text-white bg-gray-800">
      <SimulationGrid grid={grid} setGrid={setGrid} />
      <SimulationControls
        isSimulationRunning={isSimulationRunning}
        onClear={() => {
          setGrid(generateEmptyGrid(rowsAmount, columnAmount))
        }}
        onRandom={() => {
          setGrid(generateRandomGrid(rowsAmount, columnAmount))
        }}
        onSimulationRunClick={() => {
          setIsSimulationRunning(!isSimulationRunning)
          if (!isSimulationRunning) {
            runningRef.current = true
            runSimulation()
          }
        }}
      />
    </div>
  )
}

export default App
