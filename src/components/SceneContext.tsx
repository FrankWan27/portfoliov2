import { createContext, useContext, useState } from 'react'
import type { ProjectData } from './types'

export type ViewMode = 'room' | 'bookshelf' | 'monitor'

interface SceneContextType {
  view: ViewMode
  setView: (view: ViewMode) => void
  selectedProject: ProjectData | null
  setSelectedProject: (project: ProjectData | null) => void
}

const SceneContext = createContext<SceneContextType>(null!)

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewMode>('room')
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  return (
    <SceneContext.Provider value={{ view, setView, selectedProject, setSelectedProject }}>
      {children}
    </SceneContext.Provider>
  )
}

export function useScene() {
  return useContext(SceneContext)
}
