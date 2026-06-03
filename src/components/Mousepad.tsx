export function Mousepad({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={[position[0], position[1] + 0.005, position[2]]} castShadow>
      <boxGeometry args={[0.4, 0.01, 0.3]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>
  )
}
