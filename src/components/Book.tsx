import { useState, useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import type { ProjectData } from './types'

interface BookProps {
  project: ProjectData
  position: [number, number, number]
}

export function Book({ project, position }: BookProps) {
  const mesh = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (!mesh.current) return
    const targetZ = hovered ? 0.08 : 0
    mesh.current.position.z += (targetZ - mesh.current.position.z) * 0.1
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      castShadow
    >
      <boxGeometry args={[0.12, 0.35, 0.25]} />
      <meshStandardMaterial color={project.color} />
    </mesh>
  )
}
