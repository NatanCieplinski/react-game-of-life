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
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rowsAmount; i++) {
          for (let k = 0; k < columnAmount; k++) {
            let neighbors = 0
            redundant.forEach(([x, y]) => {
              const newI = i + x
              const newK = k + y
              if (
                newI >= 0 &&
                newK >= 0 &&
                newI < rowsAmount &&
                newK < columnAmount
              ) {
                neighbors += g[newI][newK]
              }
            })
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1
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
