import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Vector3, Mesh } from 'three'
import { Room } from './Room'
import { CameraController } from './CameraController'
import { CameraDebugPanel } from './CameraDebugPanel'

export type ViewMode = 'room' | 'bookshelf' | 'monitor'

const DESK_CAMERA = { position: new Vector3(-0.15, 0.60, 1.80), target: new Vector3(0, 0.1, 0) }
const BOOKSHELF_CAMERA = { position: new Vector3(0.3, 0.3, 0.4), target: new Vector3(0.9, 0.3, 0.4) }
const MONITOR_CAMERA = { position: new Vector3(0, 0.4, 0.3), target: new Vector3(0, 0.4, -0.85) }

function OrbitTarget() {
  const ref = useRef<Mesh>(null)

  useFrame(({ controls }) => {
    if (ref.current && controls) {
      const target = (controls as any).target
      if (target) {
        ref.current.position.copy(target)
      }
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="#ff0000" />
    </mesh>
  )
}

export function Scene() {
  const [view, setView] = useState<ViewMode>('room')
  const [debugVisible, setDebugVisible] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'c' && !e.metaKey && !e.ctrlKey) {
        setDebugVisible(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const cameraConfig = view === 'room' ? DESK_CAMERA : view === 'bookshelf' ? BOOKSHELF_CAMERA : MONITOR_CAMERA

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, background: '#ffffff' }}>
      <Canvas shadows camera={{ position: [-0.15, 0.60, 1.80], fov: 50 }} onPointerMissed={() => { if (view !== 'room') setView('room') }}>
        <color attach="background" args={['#ffffff']} />
        <Environment preset="apartment" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[3, 5, 2]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <CameraController target={cameraConfig.target} position={cameraConfig.position} />
        <CameraDebugPanel visible={debugVisible} />
        <OrbitControls
          enabled={view === 'room'}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={0.5}
          maxDistance={6}
        />

        {debugVisible && <OrbitTarget />}
        <Room
          onBookshelfClick={() => setView('bookshelf')}
          onMonitorClick={() => setView('monitor')}
          onMissClick={() => { if (view !== 'room') setView('room') }}
        />
      </Canvas>

    </div>
  )
}
