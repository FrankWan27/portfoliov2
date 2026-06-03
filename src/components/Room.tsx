import { Desk } from './Desk'
import { Bookshelf } from './Bookshelf'
import { useScene } from './SceneContext'

export function Room() {
  const { view, setView } = useScene()

  return (
    <group position={[0, 0, -0.5]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.8, 0]}
        receiveShadow
        onClick={() => { if (view !== 'room') setView('room') }}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Desk />
      <Bookshelf />
    </group>
  )
}
