import { useState } from 'react'
import { Book } from './Book'
import type { ProjectData } from './types'

const PROJECTS: ProjectData[] = [
  { title: 'Project A', color: '#e63946', description: 'A cool project' },
  { title: 'Project B', color: '#457b9d', description: 'Another project' },
  { title: 'Project C', color: '#2a9d8f', description: 'Yet another project' },
  { title: 'Project D', color: '#e9c46a', description: 'One more project' },
  { title: 'Project E', color: '#f4a261', description: 'Final project' },
]

export function Bookshelf({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={[0.9, 0.3, 0.9]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={[0.3, 0.3, 0.3]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {/* Frame - left */}
      <mesh position={[-0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 2.0, 0.4]} />
        <meshStandardMaterial color={hovered ? '#7a5230' : '#5c3a1e'} />
      </mesh>
      {/* Frame - right */}
      <mesh position={[0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 2.0, 0.4]} />
        <meshStandardMaterial color={hovered ? '#7a5230' : '#5c3a1e'} />
      </mesh>
      {/* Frame - back */}
      <mesh position={[0, 0, -0.18]} castShadow>
        <boxGeometry args={[1.1, 2.0, 0.04]} />
        <meshStandardMaterial color={hovered ? '#7a5230' : '#5c3a1e'} />
      </mesh>

      {/* Shelves */}
      {[-0.7, -0.2, 0.3, 0.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[1.05, 0.04, 0.4]} />
          <meshStandardMaterial color="#3d2510" />
        </mesh>
      ))}

      {/* Books on each shelf */}
      {PROJECTS.map((project, i) => (
        <Book
          key={project.title}
          project={project}
          position={[-0.3 + i * 0.18, -0.45 + Math.floor(i / 3) * 0.5, 0]}
        />
      ))}
    </group>
  )
}
