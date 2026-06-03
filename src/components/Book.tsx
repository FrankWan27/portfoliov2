import { useState, useRef, useEffect, Suspense } from 'react'
import { Group, VideoTexture, Texture } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import type { ProjectData } from './types'

interface BookProps {
  project: ProjectData
  position: [number, number, number]
  onClick?: () => void
}

function useVideoOnHover(src: string | undefined, hovered: boolean) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [texture, setTexture] = useState<VideoTexture | null>(null)

  useEffect(() => {
    if (!src || videoRef.current) return
    if (!hovered) return

    const video = document.createElement('video')
    video.src = src
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.load()
    videoRef.current = video

    video.addEventListener('canplay', () => {
      const tex = new VideoTexture(video)
      setTexture(tex)
      video.play()
    }, { once: true })
  }, [src, hovered])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (hovered) {
      video.play()
    } else {
      video.pause()
    }
  }, [hovered])

  return texture
}

export function Book({ project, position, onClick }: BookProps) {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  const staticTexture = useTexture(project.image)
  const videoTexture = useVideoOnHover(project.video, hovered)

  const activeTexture: Texture = hovered && videoTexture ? videoTexture : staticTexture

  useFrame(() => {
    if (!group.current) return
    const targetZ = hovered ? 0.08 : 0
    group.current.position.z += (targetZ - group.current.position.z) * 0.1
  })

  return (
    <group
      ref={group}
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
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.35, 0.25]} />
        <meshStandardMaterial color={project.color} />
      </mesh>
      {/* Cover image on the front face (+X side) */}
      <mesh position={[0.061, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.23, 0.33]} />
        <meshStandardMaterial map={activeTexture} />
      </mesh>
      {/* Title on spine (+Z face) */}
      <Text
        position={[0, 0, 0.13]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={0.03}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.3}
      >
        {project.title}
      </Text>
    </group>
  )
}
