export function Speaker({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.125, 0]} castShadow>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0.125, 0.065]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}
