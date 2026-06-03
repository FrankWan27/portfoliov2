export function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={[position[0], position[1] + 0.01, position[2]]} castShadow>
      <boxGeometry args={[0.5, 0.02, 0.18]} />
      <meshStandardMaterial color="#2d2d2d" />
    </mesh>
  )
}
