import React, { FunctionComponent, ReactNode } from 'react'
import { IconPlay } from '../icons'

export const SimulationControls: FunctionComponent<{
  onClear: () => void
  onRandom: () => void
}> = ({ onClear, onRandom }) => {
  return (
    <div className="flex gap-4">
      <SimulationControlButton onClick={onClear}>Clear</SimulationControlButton>
      <SimulationControlButton onClick={() => null}>
        <IconPlay className="text-white fill-current" />
      </SimulationControlButton>
      <SimulationControlButton onClick={onRandom}>
        Random
      </SimulationControlButton>
    </div>
  )
}

const SimulationControlButton: React.FC<{
  children: ReactNode
  onClick: () => void
}> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center py-2 px-3 w-24 text-white bg-blue-600 active:bg-blue-800 rounded-lg transition-all hover:scale-105 active:scale-100"
    >
      {children}
    </button>
  )
}
