import { useState } from 'react'
import { Book } from './Book'
import type { ProjectData } from './types'
import { useScene } from './SceneContext'

const PROJECTS: ProjectData[] = [
  { title: 'Snake AI', color: '#6fc3df', description: 'AI that learns to play Snake', url: 'https://github.com/FrankWan27/SnakeAI', image: 'projects/snake.png', video: 'projects/snake.mp4' },
  { title: 'Non-Euclidean', color: '#8b5cf6', description: 'Non-euclidean-esque world where space is not what it seems', url: 'https://github.com/FrankWan27/non-euclidean-esque', demo: 'https://frankwan27.github.io/non-euclid/', image: 'projects/noneuclid.png', video: 'projects/noneuclid.mp4' },
  { title: 'Tetris AI', color: '#e63946', description: 'AI that learns to play Tetris', url: 'https://github.com/FrankWan27/TetrisAI', image: 'projects/tetris.png', video: 'projects/tetris.mp4' },
  { title: 'Boids', color: '#f4a261', description: 'Multiplayer boids simulator', url: 'https://github.com/FrankWan27/Boids', demo: 'https://boids.fly.dev/', image: 'projects/boids.png', video: 'projects/boids.mp4' },
  { title: 'Agar.AI', color: '#2a9d8f', description: 'AI that learns to play Agar.io using NEAT', url: 'https://github.com/FrankWan27/Agar.AI', demo: 'https://frankwan27.github.io/agar.ai/', image: 'projects/agar.png', video: 'projects/agar.mp4' },
  { title: 'Pathfinding Vis', color: '#6fc3df', description: '3D pathfinding visualizer built in Unity', url: 'https://github.com/FrankWan27/PathfindingVis', demo: 'https://frankwan27.github.io/pathfinding-vis/', image: 'projects/pathfinding.jpg', video: 'projects/pathfinding.mp4' },
  { title: 'Image Ascii', color: '#4a5568', description: 'Image to ASCII converter built with Godot and Rust', url: 'https://github.com/FrankWan27/ImageAscii', image: 'projects/bunny.png', video: 'projects/bunny.mp4' },
  { title: 'Blink Reminder', color: '#f4a261', description: 'Facial recognition model to remind you to blink', url: 'https://github.com/FrankWan27/BlinkReminder', image: 'projects/blink.png', video: 'projects/blink.mp4' },
  { title: 'Pacman', color: '#8b5cf6', description: 'Pacman-like game built for Android', url: 'https://github.com/FrankWan27/PacmanPrototype', demo: 'https://frankwan27.github.io/pacman/', image: 'projects/pacman.png', video: 'projects/pacman.mp4' },
  { title: 'Blitz Minesweeper', color: '#e63946', description: 'Fast-paced multiplayer minesweeper', url: 'https://github.com/FrankWan27/Blitz-Minesweeper', demo: 'https://blitz.up.railway.app/', image: 'projects/minesweeper.png', video: 'projects/minesweeper.mp4' },
  { title: 'Determination', color: '#6fc3df', description: 'Mobile rhythm game developed in Unity', url: 'https://github.com/FrankWan27/Determination', image: 'projects/determination.png', video: 'projects/determination.mp4' },
  { title: 'Rotato Potato', color: '#e9c46a', description: '2D puzzle platformer using rotation, built with PixiJS', url: 'https://github.com/FrankWan27/rotato-potato', demo: 'https://frankwan27.github.io/rotato-potato/', image: 'projects/rotato.jpg', video: 'projects/rotato.mp4' },
  { title: 'Finding Friends', color: '#6fc3df', description: 'Multiplayer chinese card game (找朋友) in Unity', url: 'https://github.com/FrankWan27/FindingFriends', image: 'projects/findingfriends.png' },
  { title: 'Hardcore Ninja', color: '#f4a261', description: 'Fast-paced multiplayer game inspired by Dota 2, built in Unity', url: 'https://github.com/FrankWan27/HardcoreNinja', image: 'projects/ninja.png', video: 'projects/ninja.mp4' },
]

const BOOKS_PER_SHELF = 5
const SHELF_POSITIONS = [-0.7, -0.2, 0.3, 0.8]

export function Bookshelf() {
  const [hovered, setHovered] = useState(false)
  const { view, setView, selectedProject, setSelectedProject } = useScene()

  return (
    <group
      position={[0.9, 0.3, 0.9]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={[0.3, 0.3, 0.3]}
      onPointerOver={() => { if (view === 'room') setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (view === 'room') setView('bookshelf')
      }}
    >
      {/* Frame - left */}
      <mesh position={[-0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 2.0, 0.4]} />
        <meshStandardMaterial color={hovered && view === 'room' ? '#7a5230' : '#5c3a1e'} />
      </mesh>
      {/* Frame - right */}
      <mesh position={[0.55, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 2.0, 0.4]} />
        <meshStandardMaterial color={hovered && view === 'room' ? '#7a5230' : '#5c3a1e'} />
      </mesh>
      {/* Frame - back */}
      <mesh position={[0, 0, -0.18]} castShadow>
        <boxGeometry args={[1.1, 2.0, 0.04]} />
        <meshStandardMaterial color={hovered && view === 'room' ? '#7a5230' : '#5c3a1e'} />
      </mesh>

      {/* Shelves */}
      {SHELF_POSITIONS.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <boxGeometry args={[1.05, 0.04, 0.4]} />
          <meshStandardMaterial color="#3d2510" />
        </mesh>
      ))}

      {/* Books — hide the selected one */}
      {PROJECTS.map((project, i) => {
        const shelf = Math.floor(i / BOOKS_PER_SHELF)
        const slot = i % BOOKS_PER_SHELF
        const shelfY = SHELF_POSITIONS[shelf] ?? SHELF_POSITIONS[SHELF_POSITIONS.length - 1]
        const isSelected = selectedProject?.title === project.title
        if (isSelected) return null
        return (
          <Book
            key={project.title}
            project={project}
            position={[-0.4 + slot * 0.2, shelfY + 0.2, 0]}
            onClick={() => {
              if (selectedProject) return
              if (view === 'room') {
                setView('bookshelf')
              } else {
                setSelectedProject(project)
              }
            }}
          />
        )
      })}
    </group>
  )
}
