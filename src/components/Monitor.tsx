import { useScene } from './SceneContext'

interface MonitorProps {
  position: [number, number, number]
}

export function Monitor({ position }: MonitorProps) {
  const { setView } = useScene()

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); setView('monitor') }}>
      {/* Stand base — sits on desk */}
      <mesh position={[0, 0.0075, 0]}>
        <boxGeometry args={[0.4, 0.015, 0.2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Stand neck */}
      <mesh position={[0, 0.075, 0]}>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0.38, -0.01]}>
        <boxGeometry args={[1.34, 0.49, 0.02]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.3, 0.45, 0.03]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  )
}
