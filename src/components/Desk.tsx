import { Monitor } from './Monitor'
import { Speaker } from './Speaker'
import { Keyboard } from './Keyboard'
import { Mouse } from './Mouse'
import { Mousepad } from './Mousepad'

const DESK_WIDTH = 2.4
const DESK_DEPTH = 1.0
const DESK_THICKNESS = 0.08
const DESK_COLOR = '#5c3a1e'
const LEG_COLOR = '#36454f'

export function Desk() {
  return (
    <group name="desk">
      {/* Main surface — top is at y=0 */}
      <mesh position={[0, -DESK_THICKNESS / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[DESK_WIDTH, DESK_THICKNESS, DESK_DEPTH]} />
        <meshStandardMaterial color={DESK_COLOR} />
      </mesh>

      {/* Side surface */}
      <mesh position={[DESK_WIDTH / 2 - 0.3, -DESK_THICKNESS / 2, DESK_DEPTH / 2 + 0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.6, DESK_THICKNESS, 0.8]} />
        <meshStandardMaterial color={DESK_COLOR} />
      </mesh>

      {/* Legs */}
      {[[-DESK_WIDTH / 2 + 0.06, -DESK_THICKNESS - 0.4, 0], [DESK_WIDTH / 2 - 0.06, -DESK_THICKNESS - 0.4, 0], [DESK_WIDTH / 2 - 0.3, -DESK_THICKNESS - 0.4, DESK_DEPTH / 2 + 0.7]].map(
        ([x, y, z], i) => (
          <mesh key={`leg-${i}`} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.06, 0.8, 0.06]} />
            <meshStandardMaterial color={LEG_COLOR} />
          </mesh>
        )
      )}

      {/* Items on desk — y=0 is the surface */}
      <Monitor position={[0, 0, -DESK_DEPTH / 2 + 0.15]} />
      <Mousepad position={[0.5, 0, 0.2]} />
      <Mouse position={[0.55, 0, 0.2]} />
      <Keyboard position={[-0.1, 0, 0.2]} />
      <Speaker position={[-0.8, 0, -DESK_DEPTH / 2 + 0.3]} />
      <Speaker position={[0.8, 0, -DESK_DEPTH / 2 + 0.3]} />
    </group>
  )
}
