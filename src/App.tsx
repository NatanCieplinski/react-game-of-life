import { useState } from 'react'
import { SimulationControls, SimulationGrid } from './components'
import { generateEmptyGrid, generateRandomGrid } from './utils'

function App() {
  const columnAmount = 15
  const rowsAmount = 15

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(rowsAmount, columnAmount)
  })

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-10 h-screen text-white bg-gray-800">
      <SimulationGrid grid={grid} setGrid={setGrid} />
      <SimulationControls
        onClear={() => {
          setGrid(generateEmptyGrid(rowsAmount, columnAmount))
        }}
        onRandom={() => {
          setGrid(generateRandomGrid(rowsAmount, columnAmount))
        }}
      />
    </div>
  )
}

export default App
