import React, { FunctionComponent, ReactNode } from 'react'
import { IconPlay } from '../icons'

export const SimulationControls: FunctionComponent = () => {
  return (
    <div className="flex gap-4">
      <SimulationControlButton>Clear</SimulationControlButton>
      <SimulationControlButton>
        <IconPlay className="text-white fill-current" />
      </SimulationControlButton>
      <SimulationControlButton>Random</SimulationControlButton>
    </div>
  )
}

const SimulationControlButton: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <button className="flex justify-center items-center py-2 px-3 w-24 text-white bg-blue-600 active:bg-blue-800 rounded-lg transition-all hover:scale-105 active:scale-100">
      {children}
    </button>
  )
}
