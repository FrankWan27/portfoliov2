import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

interface CameraControllerProps {
  position: Vector3
  target: Vector3
}

export function CameraController({ position, target }: CameraControllerProps) {
  const { camera } = useThree()
  const currentTarget = useRef(new Vector3().copy(target))

  useFrame(() => {
    camera.position.lerp(position, 0.03)
    currentTarget.current.lerp(target, 0.03)
    camera.lookAt(currentTarget.current)
  })

  return null
}
