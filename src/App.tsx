import { SimulationControls, SimulationGrid } from './components'

function App() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen text-white bg-gray-800">
      <SimulationGrid />
      <SimulationControls />
    </div>
  )
}

export default App
