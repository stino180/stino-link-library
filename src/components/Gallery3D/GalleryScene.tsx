import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  useTexture, 
  Environment,
  SpotLight,
  MeshReflectorMaterial
} from '@react-three/drei'
import * as THREE from 'three'
import { LinkCard as LinkCardType } from '@/data/cards'

// Import all card images
import musicImg from '@/assets/music.jpg'
import youtubeImg from '@/assets/youtube.jpg'
import portfolioImg from '@/assets/portfolio.jpg'
import bookingImg from '@/assets/booking.jpg'
import merchImg from '@/assets/merch.jpg'
import liquidnotesImg from '@/assets/liquidnotes.jpg'
import bridgeImg from '@/assets/bridge.jpg'
import tiktokImg from '@/assets/tiktok.jpg'
import instagramImg from '@/assets/instagram.jpg'
import twitterImg from '@/assets/twitter.jpg'

const imageMap: Record<string, string> = {
  music: musicImg,
  youtube: youtubeImg,
  portfolio: portfolioImg,
  booking: bookingImg,
  merch: merchImg,
  liquidnotes: liquidnotesImg,
  bridge: bridgeImg,
  tiktok: tiktokImg,
  instagram: instagramImg,
  twitter: twitterImg,
}

interface ArtworkFrameProps {
  card: LinkCardType
  position: [number, number, number]
  onClick: () => void
}

function ArtworkFrame({ card, position, onClick }: ArtworkFrameProps) {
  const meshRef = useRef<THREE.Group>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const imageUrl = imageMap[card.image] || musicImg
  const texture = useTexture(imageUrl)
  
  // Configure texture
  texture.colorSpace = THREE.SRGBColorSpace
  
  const frameWidth = 2
  const frameHeight = 2.5
  const frameDepth = 0.08
  const borderWidth = 0.12

  useFrame((state) => {
    if (frameRef.current) {
      // Subtle hover animation
      const time = state.clock.elapsedTime
      frameRef.current.position.y = Math.sin(time * 0.5 + position[0]) * 0.01
    }
  })

  return (
    <group ref={meshRef} position={position} onClick={onClick}>
      {/* Frame border */}
      <mesh position={[0, 0, -frameDepth / 2]} castShadow>
        <boxGeometry args={[frameWidth + borderWidth * 2, frameHeight + borderWidth * 2, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* White matte inside frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[frameWidth + 0.05, frameHeight + 0.05, 0.02]} />
        <meshStandardMaterial color="#fafafa" roughness={0.9} />
      </mesh>
      
      {/* Artwork canvas */}
      <mesh ref={frameRef} position={[0, 0, 0.02]} castShadow>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.4}
          metalness={0}
        />
      </mesh>
      
      {/* Placard */}
      <group position={[0, -frameHeight / 2 - 0.4, 0.01]}>
        <mesh>
          <planeGeometry args={[1.2, 0.3]} />
          <meshStandardMaterial color="#fafafa" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

function GalleryRoom({ cards, onCardClick }: { cards: LinkCardType[], onCardClick: (card: LinkCardType) => void }) {
  const roomWidth = cards.length * 4 + 10
  const roomHeight = 6
  const roomDepth = 8

  return (
    <group>
      {/* Floor with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[roomWidth / 2 - 5, -2, 0]} receiveShadow>
        <planeGeometry args={[roomWidth + 20, roomDepth * 2]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={0.5}
          roughness={0.8}
          depthScale={0.8}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#8b7355"
          metalness={0.1}
          mirror={0.3}
        />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[roomWidth / 2 - 5, roomHeight / 2 - 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth + 20, roomHeight + 4]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.95} />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[roomWidth / 2 - 5, roomHeight - 2, 0]}>
        <planeGeometry args={[roomWidth + 20, roomDepth * 2]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
      </mesh>

      {/* Track lighting rail */}
      <mesh position={[roomWidth / 2 - 5, roomHeight - 2.1, -1]} castShadow>
        <boxGeometry args={[roomWidth + 10, 0.08, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Spotlights for each artwork */}
      {cards.map((card, index) => {
        const xPos = index * 4
        return (
          <SpotLight
            key={card.id}
            position={[xPos, roomHeight - 2.2, 1]}
            angle={0.4}
            penumbra={0.5}
            intensity={50}
            distance={8}
            color="#fff8f0"
            castShadow
            target-position={[xPos, 0, -roomDepth / 2 + 0.5]}
          />
        )
      })}

      {/* Artworks */}
      {cards.map((card, index) => (
        <ArtworkFrame
          key={card.id}
          card={card}
          position={[index * 4, 0.5, -roomDepth / 2 + 0.5]}
          onClick={() => onCardClick(card)}
        />
      ))}
    </group>
  )
}

function CameraController({ cardsCount }: { cardsCount: number }) {
  const { camera } = useThree()
  const targetX = useRef(0)
  
  useFrame(() => {
    // Smooth camera follow
    camera.position.x += (targetX.current - camera.position.x) * 0.05
  })

  // Handle scroll to move camera
  const handleWheel = (e: WheelEvent) => {
    const maxX = (cardsCount - 1) * 4
    targetX.current = Math.max(-2, Math.min(maxX + 2, targetX.current + e.deltaY * 0.01))
  }

  // Set up wheel listener
  useMemo(() => {
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [cardsCount])

  return null
}

interface GallerySceneProps {
  cards: LinkCardType[]
  onCardClick: (card: LinkCardType) => void
}

export function GalleryScene({ cards, onCardClick }: GallerySceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 1, 5], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.3} />
        
        {/* Main gallery lighting */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={0.5} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <GalleryRoom cards={cards} onCardClick={onCardClick} />
        
        <CameraController cardsCount={cards.length} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
          target={[0, 0.5, 0]}
        />
        
        <Environment preset="studio" />
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        Scroll to navigate • Drag to look around • Click artwork to visit
      </div>
    </div>
  )
}
