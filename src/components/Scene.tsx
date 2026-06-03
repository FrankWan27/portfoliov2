import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Vector3 } from 'three'
import { Room } from './Room'
import { CameraController } from './CameraController'
import { CameraDebugPanel } from './CameraDebugPanel'
import { OpenBook } from './OpenBook'
import { SceneProvider, useScene } from './SceneContext'

const DESK_CAMERA = { position: new Vector3(-0.15, 0.60, 1.80), target: new Vector3(0, 0.1, 0) }
const BOOKSHELF_CAMERA = { position: new Vector3(0.3, 0.3, 0.7), target: new Vector3(0.9, 0.3, 0.4) }
const MONITOR_CAMERA = { position: new Vector3(0, 0.4, 0.3), target: new Vector3(0, 0.4, -0.85) }

function SceneContent() {
  const { view, setView, selectedProject } = useScene()

  const cameraConfig = view === 'room' ? DESK_CAMERA : view === 'bookshelf' ? BOOKSHELF_CAMERA : MONITOR_CAMERA

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <Environment preset="apartment" />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[0, 4, 0]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-radius={8}
        shadow-bias={-0.0005}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      <CameraController target={cameraConfig.target} position={cameraConfig.position} />
      <OrbitControls
        enabled={view === 'room'}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minDistance={0.5}
        maxDistance={6}
      />

      <Room />

      {/* Open book floating in front of camera when selected */}
      {selectedProject && (
        <group position={[0.55, 0.3, 0.55]} scale={[0.6, 0.6, 0.6]} rotation={[0, Math.atan2(-0.6, 0.3), 0]}>
          <OpenBook project={selectedProject} />
        </group>
      )}
    </>
  )
}

export function Scene() {
  return (
    <SceneProvider>
      <SceneInner />
    </SceneProvider>
  )
}

function SceneInner() {
  const { view, setView, selectedProject, setSelectedProject } = useScene()
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

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, background: '#ffffff' }}>
      <Canvas
        shadows
        camera={{ position: [-0.15, 0.60, 1.80], fov: 50 }}
        onPointerMissed={() => {
          if (selectedProject) {
            setSelectedProject(null)
          } else if (view !== 'room') {
            setView('room')
          }
        }}
      >
        <SceneContent />
        <CameraDebugPanel visible={debugVisible} />
      </Canvas>
    </div>
  )
}
