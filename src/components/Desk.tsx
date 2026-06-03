export function Desk({ onMonitorClick }: { onMonitorClick: () => void }) {
  return (
    <group name="desk"position={[0, 0, 0]}>
      {/* L-shaped desktop - main surface */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.0]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>

      {/* L-shaped desktop - side extension (right wing, flush with front edge of main) */}
      <mesh position={[0.9, 0, 0.9]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>

      {/* Legs */}
      {[[-1.1, -0.4, 0], [1.1, -0.4, 0], [0.9, -0.4, 1.2]].map(
        ([x, y, z], i) => (
          <mesh key={`leg-${i}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.06, 0.8, 0.06]} />
            <meshStandardMaterial color="#3d2510" />
          </mesh>
        )
      )}

      {/* Monitor */}
      <group position={[0, 0.4, -0.35]} onClick={(e) => { e.stopPropagation(); onMonitorClick() }}>
        {/* Screen */}
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.45, 0.03]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Bezel */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[1.34, 0.49, 0.02]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Stand neck */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.06, 0.12, 0.06]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Stand base */}
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[0.4, 0.015, 0.2]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Mousepad */}
      <mesh position={[0.5, 0.05, 0.2]} castShadow>
        <boxGeometry args={[0.4, 0.01, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Mouse */}
      <group position={[0.55, 0.07, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.03, 0.1]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        {/* Left/right click divider line */}
        <mesh position={[0, 0.016, -0.02]}>
          <boxGeometry args={[0.002, 0.002, 0.04]} />
          <meshStandardMaterial color="#999" />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[-0.1, 0.06, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.18]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>

      {/* Speaker - left */}
      <group position={[-0.8, 0.2, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.25, 0.12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Driver cone */}
        <mesh position={[0, 0, 0.065]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Speaker - right */}
      <group position={[0.8, 0.2, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.25, 0.12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Driver cone */}
        <mesh position={[0, 0, 0.065]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

    </group>
  )
}
