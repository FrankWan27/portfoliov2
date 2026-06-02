import { useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

const sliderStyle: React.CSSProperties = { width: 100 }
const inputStyle: React.CSSProperties = { width: 50, background: '#222', color: '#0f0', border: '1px solid #444', borderRadius: 3, padding: '2px 4px', fontFamily: 'monospace', fontSize: 11 }
const labelStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6 }

export function CameraDebugPanel({ visible }: { visible: boolean }) {
  const { camera } = useThree()
  const [info, setInfo] = useState({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 })

  useFrame(() => {
    if (visible) {
      setInfo({
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        rx: camera.rotation.x,
        ry: camera.rotation.y,
        rz: camera.rotation.z,
      })
    }
  })

  if (!visible) return null

  return (
    <Html fullscreen style={{ pointerEvents: 'none' }}>
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: 'rgba(0,0,0,0.85)',
        color: '#0f0',
        padding: '12px 16px',
        borderRadius: 6,
        fontFamily: 'monospace',
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        pointerEvents: 'auto',
      }}>
        <div>pos: {info.x.toFixed(2)}, {info.y.toFixed(2)}, {info.z.toFixed(2)}</div>
        <div>rot: {info.rx.toFixed(2)}, {info.ry.toFixed(2)}, {info.rz.toFixed(2)}</div>
        <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '4px 0' }} />
        <div style={labelStyle}>
          <span>px</span>
          <input type="range" min={-5} max={5} step={0.05} value={info.x} onChange={e => { camera.position.x = +e.target.value }} style={sliderStyle} />
          <input type="number" step={0.05} value={info.x} onChange={e => { camera.position.x = +e.target.value }} style={inputStyle} />
        </div>
        <div style={labelStyle}>
          <span>py</span>
          <input type="range" min={0} max={5} step={0.05} value={info.y} onChange={e => { camera.position.y = +e.target.value }} style={sliderStyle} />
          <input type="number" step={0.05} value={info.y} onChange={e => { camera.position.y = +e.target.value }} style={inputStyle} />
        </div>
        <div style={labelStyle}>
          <span>pz</span>
          <input type="range" min={-5} max={5} step={0.05} value={info.z} onChange={e => { camera.position.z = +e.target.value }} style={sliderStyle} />
          <input type="number" step={0.05} value={info.z} onChange={e => { camera.position.z = +e.target.value }} style={inputStyle} />
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '4px 0' }} />
        <div style={labelStyle}>
          <span>rx</span>
          <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={info.rx} onChange={e => { camera.rotation.x = +e.target.value }} style={sliderStyle} />
          <input type="number" step={0.01} value={info.rx} onChange={e => { camera.rotation.x = +e.target.value }} style={inputStyle} />
        </div>
        <div style={labelStyle}>
          <span>ry</span>
          <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={info.ry} onChange={e => { camera.rotation.y = +e.target.value }} style={sliderStyle} />
          <input type="number" step={0.01} value={info.ry} onChange={e => { camera.rotation.y = +e.target.value }} style={inputStyle} />
        </div>
        <div style={labelStyle}>
          <span>rz</span>
          <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={info.rz} onChange={e => { camera.rotation.z = +e.target.value }} style={sliderStyle} />
          <input type="number" step={0.01} value={info.rz} onChange={e => { camera.rotation.z = +e.target.value }} style={inputStyle} />
        </div>
      </div>
    </Html>
  )
}
