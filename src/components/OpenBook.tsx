import { useState, useRef, useEffect } from 'react'
import { Group, MathUtils, VideoTexture } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import type { ProjectData } from './types'
import { useScene } from './SceneContext'

interface OpenBookProps {
  project: ProjectData
}

function useVideoTexture(src: string | undefined) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [texture, setTexture] = useState<VideoTexture | null>(null)

  useEffect(() => {
    if (!src) return

    const video = document.createElement('video')
    video.src = src
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.load()
    videoRef.current = video

    video.addEventListener('canplay', () => {
      video.play()
      setTexture(new VideoTexture(video))
    }, { once: true })

    return () => {
      video.pause()
      video.src = ''
      videoRef.current = null
    }
  }, [src])

  return texture
}

export function OpenBook({ project }: OpenBookProps) {
  const group = useRef<Group>(null)
  const progress = useRef(0)
  const [angle, setAngle] = useState(0)
  const [closing, setClosing] = useState(false)
  const { setSelectedProject } = useScene()
  const videoTex = useVideoTexture(project.video)
  const staticTex = useTexture(project.image)

  useFrame(() => {
    const target = closing ? 0 : 1
    progress.current = MathUtils.lerp(progress.current, target, closing ? 0.12 : 0.05)
    setAngle((1 - progress.current) * (Math.PI / 2))

    if (closing && progress.current < 0.01) {
      setSelectedProject(null)
    }
  })

  return (
    <group ref={group}>
      {/* Left cover — hinge at spine */}
      <group rotation={[0, angle, 0]}>
        {/* Cover */}
        <mesh position={[-0.125, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.35, 0.015]} />
          <meshStandardMaterial color={project.color} />
        </mesh>
        {/* White inner page */}
        <mesh position={[-0.125, 0, 0.008]}>
          <planeGeometry args={[0.24, 0.34]} />
          <meshStandardMaterial color="#f8f6f0" />
        </mesh>
        {/* Left page content */}
        <Text
          position={[-0.125, 0.08, 0.009]}
          fontSize={0.022}
          color="#222"
          anchorX="center"
          anchorY="top"
          maxWidth={0.22}
          fontWeight="bold"
        >
          {project.title}
        </Text>
        <Text
          position={[-0.125, -0.02, 0.009]}
          fontSize={0.015}
          color="#555"
          anchorX="center"
          anchorY="top"
          maxWidth={0.22}
        >
          {project.description}
        </Text>
        {/* Back button */}
        <Text
          position={[-0.125, -0.14, 0.009]}
          fontSize={0.016}
          color="#666"
          anchorX="center"
          anchorY="middle"
          onClick={(e) => { e.stopPropagation(); setClosing(true) }}
          onPointerOver={() => { document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'auto' }}
        >
          {'← Back'}
        </Text>
      </group>

      {/* Right cover — hinge at spine */}
      <group rotation={[0, -angle, 0]}>
        {/* Cover */}
        <mesh position={[0.125, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.35, 0.015]} />
          <meshStandardMaterial color={project.color} />
        </mesh>
        {/* White inner page */}
        <mesh position={[0.125, 0, 0.008]}>
          <planeGeometry args={[0.24, 0.34]} />
          <meshStandardMaterial color="#f8f6f0" />
        </mesh>
        {/* Right page content — video with border */}
        <mesh position={[0.125, 0.05, 0.0085]}>
          <planeGeometry args={[0.21, 0.16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0.125, 0.05, 0.009]}>
          <planeGeometry args={[0.2, 0.15]} />
          <meshStandardMaterial map={videoTex || staticTex} />
        </mesh>
        {/* GitHub link below */}
        {project.url && (
          <Text
            position={[0.125, -0.08, 0.009]}
            fontSize={0.014}
            color={project.color}
            anchorX="center"
            anchorY="middle"
            maxWidth={0.22}
            onClick={(e) => { e.stopPropagation(); window.open(project.url, '_blank') }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'auto' }}
          >
            {'View on GitHub →'}
          </Text>
        )}
      </group>
    </group>
  )
}
