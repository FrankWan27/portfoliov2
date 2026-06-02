import { Desk } from './Desk'
import { Bookshelf } from './Bookshelf'

interface RoomProps {
  onBookshelfClick: () => void
  onMonitorClick: () => void
  onMissClick: () => void
}

export function Room({ onBookshelfClick, onMonitorClick, onMissClick }: RoomProps) {
  return (
    <group position={[0, 0, -0.5]}>
      {/* Infinite white ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow onClick={onMissClick}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <Desk onMonitorClick={onMonitorClick} />
      <Bookshelf onClick={onBookshelfClick} />
    </group>
  )
}
