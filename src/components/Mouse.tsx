export function Mouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.015, 0]} castShadow>
        <boxGeometry args={[0.06, 0.03, 0.1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0, 0.031, -0.02]}>
        <boxGeometry args={[0.002, 0.002, 0.04]} />
        <meshStandardMaterial color="#999" />
      </mesh>
    </group>
  )
}
