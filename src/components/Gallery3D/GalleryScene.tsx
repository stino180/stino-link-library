import React, { useRef, useMemo, useEffect, useCallback } from 'react'
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

function CameraController({ cardsCount, controlsRef }: { cardsCount: number, controlsRef: React.MutableRefObject<any> }) {
  const { camera } = useThree()
  const targetX = useRef(0)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  useFrame(() => {
    if (controlsRef.current) {
      // Smooth camera follow - always active for smooth movement
      const lerpSpeed = 0.1
      const currentX = camera.position.x
      const newX = currentX + (targetX.current - currentX) * lerpSpeed
      
      // Only update if there's a meaningful change
      if (Math.abs(newX - currentX) > 0.001) {
        camera.position.x = newX
        
        // Update OrbitControls target to follow camera for better control feel
        const currentTarget = controlsRef.current.target
        controlsRef.current.target.set(
          targetX.current,
          currentTarget.y,
          currentTarget.z
        )
        controlsRef.current.update()
      }
    }
  })

  // Handle scroll to move camera horizontally
  const handleWheel = useCallback((e: WheelEvent) => {
    // Let OrbitControls handle zoom when Ctrl/Cmd is held or when shift is held
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      return // Let OrbitControls handle zoom/pan
    }
    
    // Check if this is primarily a horizontal scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
      return // Let OrbitControls handle horizontal pan
    }
    
    // Only handle vertical scroll for horizontal navigation
    // Check if we're over the canvas area (not over UI elements)
    const target = e.target as HTMLElement
    if (target && !target.closest('canvas') && !target.closest('[class*="absolute"]')) {
      return // Don't intercept scroll if over UI elements
    }
    
    // Prevent default scroll behavior for navigation
    e.preventDefault()
    e.stopPropagation()
    
    isScrolling.current = true
    const maxX = (cardsCount - 1) * 4
    const scrollSensitivity = 0.025 // Slightly increased for better responsiveness
    targetX.current = Math.max(-2, Math.min(maxX + 2, targetX.current + e.deltaY * scrollSensitivity))
    
    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }
    
    // Stop scrolling after a delay
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false
    }, 200)
  }, [cardsCount])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      isScrolling.current = true
      const maxX = (cardsCount - 1) * 4
      const step = 2
      const direction = e.key === 'ArrowLeft' ? -1 : 1
      targetX.current = Math.max(-2, Math.min(maxX + 2, targetX.current + direction * step))
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 150)
    }
  }, [cardsCount])

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [handleWheel, handleKeyDown])

  return null
}

interface GallerySceneProps {
  cards: LinkCardType[]
  onCardClick: (card: LinkCardType) => void
}

export function GalleryScene({ cards, onCardClick }: GallerySceneProps) {
  const controlsRef = useRef<any>(null)
  
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
        
        <CameraController cardsCount={cards.length} controlsRef={controlsRef} />
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={3}
          maxDistance={12}
          target={[0, 0.5, 0]}
          // Improved sensitivity and damping for better responsiveness
          rotateSpeed={0.8}
          zoomSpeed={0.8}
          panSpeed={0.8}
          dampingFactor={0.05}
          enableDamping={true}
          // Allow more freedom in rotation
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
        />
        
        <Environment preset="studio" />
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 text-xs bg-white/10 rounded">Scroll</kbd>
            <span>to move</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 text-xs bg-white/10 rounded">Drag</kbd>
            <span>to look</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 text-xs bg-white/10 rounded">← →</kbd>
            <span>keys to navigate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 text-xs bg-white/10 rounded">Click</kbd>
            <span>artwork to visit</span>
          </span>
        </div>
      </div>
    </div>
  )
}
