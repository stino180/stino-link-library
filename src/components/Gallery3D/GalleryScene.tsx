import React, { useRef, useMemo, useEffect, useCallback, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  useTexture, 
  Environment,
  SpotLight,
  MeshReflectorMaterial,
  Text
} from '@react-three/drei'
import * as THREE from 'three'
import { LinkCard as LinkCardType } from '@/data/cards'
import { ChevronLeft, ChevronRight, RotateCcw, ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react'

// Import all card images
import musicImg from '@/assets/music.jpg'
import youtubeImg from '@/assets/youtube.png'
import recordingsImg from '@/assets/180recordings.jpg'
import portfolioImg from '@/assets/portfolio.jpg'
import merchImg from '@/assets/merch.jpg'
import tiktokImg from '@/assets/tiktok.png'
import instagramImg from '@/assets/ig.jfif'
import twitterImg from '@/assets/twitter.jpg'
// New images
import mozzeImg from '@/assets/mozze.png'
import viziImg from '@/assets/vizi_test.png'
import stackflowImg from '@/assets/dca.png'
import stinoImg from '@/assets/stino logo.png'

const imageMap: Record<string, string> = {
  music: musicImg,
  youtube: youtubeImg, // For YouTube card
  recordings: recordingsImg, // For 180 Recordings card
  portfolio: portfolioImg,
  booking: viziImg, // Vizi uses booking image key
  merch: merchImg,
  tiktok: tiktokImg,
  instagram: instagramImg,
  twitter: twitterImg,
  mozze: mozzeImg,
  stino: stinoImg,
  stackflow: stackflowImg,
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
  const lastClickTime = useRef(0)
  
  // Configure texture for performance - optimized
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = 2 // Further reduced for better performance
  
  const frameWidth = 2
  const frameHeight = 2.5
  const frameDepth = 0.08
  const borderWidth = 0.12

  // Disabled subtle animation for better performance - can re-enable if needed
  // useFrame((state) => {
  //   if (frameRef.current && state.camera) {
  //     const distance = frameRef.current.position.distanceTo(state.camera.position)
  //     if (distance < 15) {
  //       const time = state.clock.elapsedTime
  //       frameRef.current.position.y = Math.sin(time * 0.5 + position[0]) * 0.01
  //     }
  //   }
  // })

  // Single click handler that prevents multiple triggers
  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    // Debounce: prevent multiple clicks within 500ms
    const now = Date.now()
    if (now - lastClickTime.current < 500) {
      return
    }
    lastClickTime.current = now
    onClick()
  }, [onClick])

  // Cursor pointer handlers
  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto'
  }, [])

  return (
    <group 
      ref={meshRef} 
      position={position} 
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Frame border */}
      <mesh position={[0, 0, -frameDepth / 2]} castShadow={false}>
        <boxGeometry args={[frameWidth + borderWidth * 2, frameHeight + borderWidth * 2, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* White matte inside frame */}
      <mesh position={[0, 0, 0]} castShadow={false}>
        <boxGeometry args={[frameWidth + 0.05, frameHeight + 0.05, 0.02]} />
        <meshStandardMaterial color="#fafafa" roughness={0.9} />
      </mesh>
      
      {/* Artwork canvas - self-illuminated, not affected by spotlights */}
      <mesh ref={frameRef} position={[0, 0, 0.02]} castShadow={false}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.8}
          metalness={0}
          // Make artwork more self-contained, less affected by spotlights
          emissive="#ffffff"
          emissiveIntensity={0.3}
          emissiveMap={texture}
        />
      </mesh>
      
      {/* Enhanced placard background - wider to fit longer text */}
      <group position={[0, -frameHeight / 2 - 0.5, 0.01]}>
        {/* Subtle shadow layer for depth */}
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[2.1, 0.7]} />
          <meshStandardMaterial color="#000000" opacity={0.2} transparent />
        </mesh>
        {/* Main placard - wider to accommodate longer titles and subtitles */}
        <mesh>
          <planeGeometry args={[2.0, 0.65]} />
          <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.1} 
            metalness={0.05}
            emissive="#ffffff"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Subtle border for definition */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[2.0, 0.65]} />
          <meshStandardMaterial 
            color="#e0e0e0" 
            opacity={0.3} 
            transparent
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      
      {/* Title text - centered */}
      <Text
        position={[0, -frameHeight / 2 - 0.36, 0.02]}
        fontSize={0.16}
        color="#0a0a0a"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.85}
        outlineWidth={0.04}
        outlineColor="#ffffff"
        fontWeight="bold"
        renderOrder={3}
        letterSpacing={0.015}
      >
        {card.title}
      </Text>
      
      {/* Subtitle text - centered */}
      <Text
        position={[0, -frameHeight / 2 - 0.56, 0.02]}
        fontSize={0.11}
        color="#2a2a2a"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.85}
        outlineWidth={0.03}
        outlineColor="#ffffff"
        renderOrder={3}
        letterSpacing={0.008}
      >
        {card.subtitle}
      </Text>
    </group>
  )
}

function BioPlaque({ roomDepth }: { roomDepth: number }) {
  const bioText = `"I create music, build digital experiences, and develop platforms that bring ideas to life. Here you'll find my music, social channels, and web projects for both personal brands and clients."`
  const authorText = `-Justin`
  const emailText = `jstrongmgmt@gmail.com`
  
  // Handle email click
  const handleEmailClick = useCallback(() => {
    window.location.href = 'mailto:jstrongmgmt@gmail.com'
  }, [])
  
  // Cursor change on hover
  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'auto'
  }, [])
  
  return (
    <group position={[-4, 0.5, -roomDepth / 2 + 0.5]}>
      {/* Plaque background - museum style, larger to fit bigger text */}
      <group position={[0, 0, 0.01]}>
        {/* Main plaque */}
        <mesh>
          <planeGeometry args={[3.8, 2.5]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        {/* Border frame */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[3.8, 2.5]} />
          <meshStandardMaterial 
            color="#ffffff" 
            opacity={0.1} 
            transparent
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      
      {/* Bio text - white, clean font, larger size with more line spacing */}
      <Text
        position={[0, 0.7, 0.02]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="top"
        maxWidth={3.5}
        outlineWidth={0.02}
        outlineColor="#000000"
        renderOrder={3}
        letterSpacing={0.01}
        lineHeight={1.75}
      >
        {bioText}
      </Text>
      
      {/* Author signature - positioned lower and to the right, under "clients" */}
      <Text
        position={[1.4, -1.15, 0.02]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        renderOrder={3}
        letterSpacing={0.02}
      >
        {authorText}
      </Text>
      
      {/* Email - larger, centered, and clickable - moved down further from signature */}
      <group 
        position={[0, -1.75, 0.02]}
        onClick={handleEmailClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Clickable area behind email text */}
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[3.2, 0.35]} />
          <meshStandardMaterial 
            color="#ffffff" 
            opacity={0} 
            transparent
          />
        </mesh>
        
        {/* Email text - much larger and centered */}
        <Text
          position={[0, 0, 0.001]}
          fontSize={0.20}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
          renderOrder={4}
          letterSpacing={0.02}
        >
          {emailText}
        </Text>
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
          blur={[50, 20]}
          resolution={128}
          mixBlur={0.4}
          mixStrength={0.25}
          roughness={0.8}
          depthScale={0.8}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#8b7355"
          metalness={0.1}
          mirror={0.1}
        />
      </mesh>
      
      {/* Back wall - darker for more contrast */}
      <mesh position={[roomWidth / 2 - 5, roomHeight / 2 - 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth + 20, roomHeight + 4]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.95} />
      </mesh>
      
      {/* Ceiling - darker for more intimacy */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[roomWidth / 2 - 5, roomHeight - 2, 0]}>
        <planeGeometry args={[roomWidth + 20, roomDepth * 2]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.9} />
      </mesh>

      {/* Track lighting rail */}
      <mesh position={[roomWidth / 2 - 5, roomHeight - 2.1, -1]} castShadow>
        <boxGeometry args={[roomWidth + 10, 0.08, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Spotlight for bio plaque */}
      <SpotLight
        position={[-4, roomHeight - 2.2, 1]}
        angle={0.4}
        penumbra={0.7}
        intensity={25}
        distance={8}
        color="#fff4e0"
        castShadow={false}
        target-position={[-4, 0.5, -roomDepth / 2 + 0.3]}
      />
      
      {/* Bio Plaque - positioned before first artwork */}
      <BioPlaque roomDepth={roomDepth} />

      {/* Spotlights for each artwork - visual beam only, doesn't light artwork */}
      {cards.map((card, index) => {
        const xPos = index * 4
        return (
          <group key={card.id}>
            {/* Visual spotlight beam - lights environment but not artwork directly */}
            <SpotLight
              position={[xPos, roomHeight - 2.2, 1]}
              angle={0.5}
              penumbra={0.8}
              intensity={20}
              distance={8}
              color="#fff4e0"
              castShadow={false}
              target-position={[xPos, -0.5, -roomDepth / 2 + 0.3]}
              // Target below artwork to light floor/wall area
            />
          </group>
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

function CameraController({ 
  cardsCount, 
  controlsRef,
  moveCameraRef,
  resetCameraRef,
  resetTrigger,
  joystickRotationRef,
  moveToBioPlaqueRef
}: { 
  cardsCount: number
  controlsRef: React.MutableRefObject<any>
  moveCameraRef: React.MutableRefObject<((direction: number) => void) | null>
  resetCameraRef: React.MutableRefObject<(() => void) | null>
  resetTrigger?: number
  joystickRotationRef?: React.MutableRefObject<{ azimuth: number; polar: number }>
  moveToBioPlaqueRef?: React.MutableRefObject<(() => void) | null>
}) {
  const { camera } = useThree()
  const targetX = useRef(0)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  // Default camera position - defined outside useEffect so it's accessible everywhere
  const defaultPosition = useRef({ x: 0, y: 1.2, z: 5.5 })
  const defaultTarget = useRef({ x: 0, y: 0.5, z: 0 })
  
  // Expose move and reset functions via ref
  useEffect(() => {
    const moveCamera = (direction: number) => {
      const maxX = (cardsCount - 1) * 4
      const step = 1.5 // Increased for more responsive button movement
      const newTargetX = targetX.current + direction * step
      // Ensure we can move in both directions equally
      targetX.current = Math.max(-2, Math.min(maxX + 2, newTargetX))
      
      // Force immediate update by triggering scrolling state
      isScrolling.current = true
      
      // Also directly update camera position slightly for immediate feedback
      if (controlsRef.current && controlsRef.current.target) {
        const controls = controlsRef.current
        const immediateStep = step * 0.3 // Immediate visual feedback
        camera.position.x += direction * immediateStep
        controls.target.x += direction * immediateStep
        controls.update()
      }
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 150)
    }
    
    const moveToBioPlaque = () => {
      // Bio plaque is at position [-4, 0.5, -3.5] (roomDepth is 8, so -8/2 + 0.5 = -3.5)
      // Position camera in front of it
      const bioPlaqueX = -4
      const bioPlaqueY = 0.5
      const bioPlaqueZ = -3.5
      
      // Camera position in front of plaque
      targetX.current = bioPlaqueX
      camera.position.set(bioPlaqueX, 1.2, bioPlaqueZ + 5.5)
      
      // Set OrbitControls target to the plaque
      if (controlsRef.current) {
        const controls = controlsRef.current
        controls.target.set(bioPlaqueX, bioPlaqueY, bioPlaqueZ)
        controls.update()
      }
      
      isScrolling.current = true
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 200)
    }
    
    const resetCamera = () => {
      // Stop any ongoing movement first
      isScrolling.current = false
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
        scrollTimeout.current = null
      }
      
      // Reset target position used by the horizontal controller
      targetX.current = defaultTarget.current.x
      
      // Reset camera position immediately
      camera.position.set(defaultPosition.current.x, defaultPosition.current.y, defaultPosition.current.z)
      camera.lookAt(defaultTarget.current.x, defaultTarget.current.y, defaultTarget.current.z)
      
      // Reset OrbitControls
      if (controlsRef.current) {
        const controls = controlsRef.current
        controls.target.set(defaultTarget.current.x, defaultTarget.current.y, defaultTarget.current.z)
        controls.update()
        
        // Force additional updates
        requestAnimationFrame(() => {
          if (controlsRef.current) {
            controlsRef.current.update()
          }
        })
      }
    }
    
    moveCameraRef.current = moveCamera
    resetCameraRef.current = resetCamera
    if (moveToBioPlaqueRef) {
      moveToBioPlaqueRef.current = moveToBioPlaque
    }
    
    return () => {
      moveCameraRef.current = null
      resetCameraRef.current = null
      if (moveToBioPlaqueRef) {
        moveToBioPlaqueRef.current = null
      }
    }
  }, [cardsCount, moveCameraRef, resetCameraRef, moveToBioPlaqueRef, camera, controlsRef])
  
  // Handle reset trigger - this runs when resetTrigger changes
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      console.log('🔄 Reset trigger activated!', resetTrigger)
      
      // Stop any ongoing movement
      isScrolling.current = false
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
        scrollTimeout.current = null
      }
      
      // Reset target position
      targetX.current = defaultTarget.current.x
      console.log('✅ Reset targetX to', targetX.current)
      
      // Reset camera position
      camera.position.set(defaultPosition.current.x, defaultPosition.current.y, defaultPosition.current.z)
      camera.lookAt(defaultTarget.current.x, defaultTarget.current.y, defaultTarget.current.z)
      console.log('✅ Reset camera position to', camera.position)
      
      // Reset OrbitControls
      if (controlsRef.current) {
        const controls = controlsRef.current
        controls.target.set(defaultTarget.current.x, defaultTarget.current.y, defaultTarget.current.z)
        console.log('✅ Reset controls target to', controls.target)
        controls.update()
        
        // Force additional updates on next frames
        requestAnimationFrame(() => {
          if (controlsRef.current) {
            controlsRef.current.update()
            requestAnimationFrame(() => {
              if (controlsRef.current) {
                controlsRef.current.update()
                console.log('✅ Final controls update complete')
              }
            })
          }
        })
      } else {
        console.error('❌ controlsRef.current is null during reset')
      }
    }
  }, [resetTrigger, camera, controlsRef])
  
  const isUserInteracting = useRef(false)
  const frameSkip = useRef(0)
  const lastCameraX = useRef(camera.position.x)
  
  // Initialize lastCameraX on mount
  useEffect(() => {
    lastCameraX.current = camera.position.x
  }, [camera])
  
  // Optimized camera movement - only update when needed, with frame skipping for performance
  useFrame(() => {
    if (!controlsRef.current) return
    
    // Skip frames for better performance (update every other frame)
    frameSkip.current = (frameSkip.current + 1) % 2
    if (frameSkip.current !== 0) return
    
    try {
      const controls = controlsRef.current
      if (!controls || !controls.target) return
      
      // Apply joystick rotation if active
      if (joystickRotationRef && joystickRotationRef.current) {
        const { azimuth, polar } = joystickRotationRef.current
        if (Math.abs(azimuth) > 0.001 || Math.abs(polar) > 0.001) {
          // Store current target X before rotation
          const desiredX = targetX.current
          
          // Get current spherical coordinates
          const spherical = new THREE.Spherical()
          spherical.setFromVector3(
            camera.position.clone().sub(controls.target)
          )
          
          // Apply joystick rotation - reduced sensitivity for smoother control
          spherical.theta += azimuth * 0.025 // Horizontal rotation
          spherical.phi += polar * 0.025 // Vertical rotation
          
          // Clamp phi to prevent flipping
          spherical.phi = Math.max(Math.PI / 6, Math.min(Math.PI / 2.1, spherical.phi))
          
          // Update camera position
          const newPosition = new THREE.Vector3()
          newPosition.setFromSpherical(spherical)
          newPosition.add(controls.target)
          camera.position.copy(newPosition)
          
          // Compensate to maintain horizontal position - adjust both camera and target
          const currentX = camera.position.x
          const deltaX = desiredX - currentX
          if (Math.abs(deltaX) > 0.001) {
            camera.position.x = desiredX
            controls.target.x += deltaX
          }
          
          controls.update()
          
          // Decay joystick rotation - smoother decay
          joystickRotationRef.current.azimuth *= 0.94
          joystickRotationRef.current.polar *= 0.94
          
          lastCameraX.current = camera.position.x
        }
      }
      
      const currentX = camera.position.x
      const isRotating = isUserInteracting.current && !isScrolling.current
      
      // If user is rotating, continuously compensate to prevent horizontal drift
      if (isRotating) {
        // OrbitControls is rotating the camera, which changes its X position
        // Compensate by adjusting both camera and target to maintain targetX
        const desiredX = targetX.current
        const deltaX = desiredX - currentX
        
        // Only compensate if there's a meaningful difference
        if (Math.abs(deltaX) > 0.005) {
          // Adjust camera X to desired position
          camera.position.x = desiredX
          // Adjust target X by the same amount to maintain rotation
          controls.target.x += deltaX
          controls.update()
          lastCameraX.current = desiredX
        } else {
          lastCameraX.current = currentX
        }
        // Skip horizontal movement lerp while rotating
        return
      }
      
      // Normal horizontal movement (when not rotating)
      const isActive = (controls.enabled !== false) && (isScrolling.current || !isUserInteracting.current)
      
      if (isActive) {
        const lerpSpeed = isScrolling.current ? 0.08 : 0.04 // Faster lerp when actively scrolling/button pressing
        const delta = targetX.current - currentX
        
        // Only update if there's a meaningful change (increased threshold for performance)
        if (Math.abs(delta) > 0.01) {
          const newX = currentX + delta * lerpSpeed
          const actualDeltaX = newX - currentX
          
          camera.position.x = newX
          
          // Update OrbitControls target - batch updates
          if (controls.target && Math.abs(actualDeltaX) > 0.001) {
            controls.target.x += actualDeltaX
            // Only call update once per frame
            controls.update()
          }
          
          lastCameraX.current = newX
        }
      } else {
        // When not active, track the X position
        lastCameraX.current = currentX
      }
    } catch (error) {
      // Silently handle errors
    }
  })
  
  // Track user interaction with OrbitControls
  useEffect(() => {
    let cleanup: (() => void) | null = null
    
    // Wait a bit for OrbitControls to mount
    const timeout = setTimeout(() => {
      if (!controlsRef.current) return
      
      const controls = controlsRef.current
      if (!controls.domElement) return
      
      const handleStart = () => {
        isUserInteracting.current = true
      }
      const handleEnd = () => {
        // Small delay to prevent immediate camera movement after interaction
        setTimeout(() => {
          isUserInteracting.current = false
        }, 100)
      }
      
      // Listen to OrbitControls events
      const domElement = controls.domElement
      domElement.addEventListener('pointerdown', handleStart)
      domElement.addEventListener('pointerup', handleEnd)
      domElement.addEventListener('pointercancel', handleEnd)
      
      cleanup = () => {
        domElement.removeEventListener('pointerdown', handleStart)
        domElement.removeEventListener('pointerup', handleEnd)
        domElement.removeEventListener('pointercancel', handleEnd)
      }
    }, 100)
    
    return () => {
      clearTimeout(timeout)
      if (cleanup) cleanup()
    }
  }, [controlsRef])

  // Handle scroll to move camera horizontally - improved version
  const handleWheel = useCallback((e: WheelEvent) => {
    // Let OrbitControls handle zoom when Ctrl/Cmd is held
    if (e.ctrlKey || e.metaKey) {
      return // Let OrbitControls handle zoom
    }
    
    // Check if we're over UI elements - don't intercept if over buttons/controls
    const target = e.target as HTMLElement
    if (target) {
      // Don't intercept if over buttons, inputs, or other interactive elements
      if (target.closest('button') || target.closest('input') || target.closest('select') || target.closest('textarea')) {
        return
      }
      // Only intercept if over canvas or the main container
      if (!target.closest('canvas') && !target.closest('[class*="relative"]')) {
        return
      }
    }
    
    // Only handle vertical scroll for horizontal navigation
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 2) {
      return // Let browser handle primarily horizontal scroll
    }
    
    // Prevent default scroll behavior for navigation
    e.preventDefault()
    e.stopPropagation()
    
    isScrolling.current = true
    const maxX = (cardsCount - 1) * 4
    const scrollSensitivity = 0.012 // Reduced for smoother, less sensitive scrolling
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
  activeCategory?: string
}

export function GalleryScene({ cards, onCardClick, activeCategory }: GallerySceneProps) {
  const controlsRef = useRef<any>(null)
  const moveCameraRef = useRef<((direction: number) => void) | null>(null)
  const resetCameraRef = useRef<(() => void) | null>(null)
  const moveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isMovingRef = useRef(false)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)
  const moveToBioPlaqueRef = useRef<(() => void) | null>(null)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [isWebGLContextLost, setIsWebGLContextLost] = useState(false)

  // Check WebGL support on mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setIsWebGLSupported(false)
      }
    } catch {
      setIsWebGLSupported(false)
    }
  }, [])

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                            window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])
  
  // Joystick state
  const joystickRef = useRef<HTMLDivElement>(null)
  const [joystickActive, setJoystickActive] = useState(false)
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 })
  const joystickRotationRef = useRef({ azimuth: 0, polar: 0 })
  
  // Move camera to bio plaque when Contact category is selected
  useEffect(() => {
    if (activeCategory === 'Contact' && moveToBioPlaqueRef.current) {
      moveToBioPlaqueRef.current()
    }
  }, [activeCategory])
  
  const handleMoveLeft = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (moveCameraRef.current) {
      moveCameraRef.current(-1)
    }
  }, [])
  
  const handleMoveRight = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (moveCameraRef.current) {
      moveCameraRef.current(1)
    }
  }, [])
  
  const handleResetCamera = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    console.log('🔄 handleResetCamera called!', { 
      resetTrigger, 
      hasResetRef: !!resetCameraRef.current,
      hasControls: !!controlsRef.current 
    })
    
    // Trigger reset via state - this ensures it happens in the Canvas context
    setResetTrigger(prev => {
      const newVal = prev + 1
      console.log('✅ Setting resetTrigger to', newVal)
      return newVal
    })
    
    // Also try direct reset as backup
    if (resetCameraRef.current) {
      console.log('✅ Calling resetCameraRef.current()')
      try {
        resetCameraRef.current()
      } catch (error) {
        console.error('❌ Error calling resetCameraRef:', error)
      }
    } else {
      console.warn('⚠️ resetCameraRef.current is null')
    }
  }, [resetTrigger])
  
  const startMoving = (direction: number) => {
    if (isMovingRef.current && moveIntervalRef.current) {
      // Already moving, just update direction if needed
      return
    }
    isMovingRef.current = true
    
    // Move immediately - more aggressive for better responsiveness
    if (moveCameraRef.current) {
      moveCameraRef.current(direction)
      // Double tap for immediate feedback
      setTimeout(() => {
        if (moveCameraRef.current) {
          moveCameraRef.current(direction * 0.5)
        }
      }, 50)
    }
    
    // Then continue moving while held - slightly faster interval
    moveIntervalRef.current = setInterval(() => {
      if (moveCameraRef.current) {
        moveCameraRef.current(direction)
      }
    }, 120) // Reduced interval for more responsive continuous movement
  }
  
  const stopMoving = () => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current)
      moveIntervalRef.current = null
    }
    isMovingRef.current = false
  }
  
  // Joystick handler - simplified to handle the actual event types we receive
  const handleJoystickMove = useCallback((e: React.MouseEvent | React.TouchEvent | MouseEvent) => {
    if (!joystickRef.current) return
    
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    let clientX: number
    let clientY: number
    
    // Handle React TouchEvent
    if ('touches' in e && e.touches?.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ('clientX' in e) {
      // MouseEvent (React or native)
      clientX = e.clientX
      clientY = e.clientY
    } else {
      // Fallback
      clientX = centerX
      clientY = centerY
    }
    
    const deltaX = clientX - centerX
    const deltaY = clientY - centerY
    
    const maxDistance = rect.width / 2 - 20 // Account for handle size
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxDistance)
    const angle = Math.atan2(deltaY, deltaX)
    
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    
    setJoystickPosition({ x, y })
    
    // Normalize to -1 to 1 range
    const normalizedX = x / maxDistance
    const normalizedY = y / maxDistance
    
    // Update rotation ref (azimuth = horizontal, polar = vertical)
    if (joystickRotationRef) {
      joystickRotationRef.current = {
        azimuth: normalizedX,
        polar: normalizedY
      }
    }
  }, [joystickRotationRef])
  
  // Global mouse/touch move listener for joystick
  useEffect(() => {
    if (!joystickActive) return
    
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (joystickActive && joystickRef.current) {
        // Pass the native event directly - handleJoystickMove can handle both types
        handleJoystickMove(e as unknown as React.MouseEvent | React.TouchEvent | MouseEvent)
      }
    }
    
    const handleGlobalEnd = () => {
      setJoystickActive(false)
      setJoystickPosition({ x: 0, y: 0 })
      if (joystickRotationRef) {
        joystickRotationRef.current = { azimuth: 0, polar: 0 }
      }
    }
    
    window.addEventListener('mousemove', handleGlobalMove)
    window.addEventListener('mouseup', handleGlobalEnd)
    window.addEventListener('touchmove', handleGlobalMove)
    window.addEventListener('touchend', handleGlobalEnd)
    window.addEventListener('touchcancel', handleGlobalEnd)
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMove)
      window.removeEventListener('mouseup', handleGlobalEnd)
      window.removeEventListener('touchmove', handleGlobalMove)
      window.removeEventListener('touchend', handleGlobalEnd)
      window.removeEventListener('touchcancel', handleGlobalEnd)
    }
  }, [joystickActive, handleJoystickMove])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
      }
    }
  }, [])
  
  // Show fallback if WebGL is not supported
  if (!isWebGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <p className="font-serif text-xl text-muted-foreground">3D Gallery requires WebGL</p>
          <p className="mt-2 text-sm text-muted-foreground/60">Please enable WebGL or try a different browser</p>
        </div>
      </div>
    )
  }

  // Some browsers/devices can lose the WebGL context (shows as a blank screen).
  // When that happens, show a clear recovery message instead of rendering nothing.
  if (isWebGLContextLost) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <p className="font-serif text-xl text-muted-foreground">3D view paused</p>
          <p className="mt-2 text-sm text-muted-foreground/60">Your browser lost the WebGL context. Please refresh the page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative" style={{ minHeight: '100vh' }}>
      {/* Reset Camera Button - Only show when controls visible */}
      {controlsVisible && (
        <div className="fixed top-24 right-4 md:right-8 z-[9999] pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleResetCamera(e)
            }}
            className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/70 backdrop-blur-md border-2 border-white/40 text-white hover:bg-black/90 hover:text-white hover:border-white/60 active:scale-90 transition-[transform,background-color,border-color] duration-200 flex items-center justify-center touch-manipulation select-none cursor-pointer shadow-2xl will-change-transform"
            aria-label="Reset camera position"
            title="Reset camera"
            type="button"
          >
            <RotateCcw className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      )}

      <Canvas
        shadows={!isMobile}
        camera={{
          position: [0, 1.2, 5.5],
          fov: isMobile ? 60 : 50,
        }}
        gl={{
          antialias: !isMobile,
          toneMapping: THREE.ACESFilmicToneMapping,
          // More stable defaults across browsers (some combinations here can lead to blank canvases)
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          alpha: false,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={isMobile ? 1 : [1, 1.5]}
        performance={{ min: isMobile ? 0.3 : 0.5 }}
        frameloop="always"
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-background">
            <div className="text-center">
              <p className="font-serif text-xl text-muted-foreground">WebGL not supported</p>
              <p className="mt-2 text-sm text-muted-foreground/60">Please try a different browser</p>
            </div>
          </div>
        }
        onCreated={(state) => {
          const canvas = state.gl.domElement

          const handleLost = (e: Event) => {
            // Prevent default so the browser may attempt to restore the context
            e.preventDefault?.()
            setIsWebGLContextLost(true)
          }

          const handleRestored = () => {
            setIsWebGLContextLost(false)
          }

          canvas.addEventListener('webglcontextlost', handleLost as EventListener)
          canvas.addEventListener('webglcontextrestored', handleRestored as EventListener)
        }}
      >
        <color attach="background" args={['#0a0a0a']} />

        {/* Ambient light for overall illumination - provides base lighting for artwork */}
        <ambientLight intensity={0.25} />

        {/* Main gallery lighting - gentle, doesn't whitewash */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={0.15} 
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-camera-far={20}
          shadow-radius={2}
          color="#fff5e6"
        />
        
        {/* Additional gentle fill light for artwork visibility */}
        <directionalLight 
          position={[0, 2, 3]} 
          intensity={0.1} 
          color="#ffffff"
        />

        <GalleryRoom cards={cards} onCardClick={onCardClick} />
        
        <CameraController 
          cardsCount={cards.length} 
          controlsRef={controlsRef} 
          moveCameraRef={moveCameraRef} 
          resetCameraRef={resetCameraRef}
          resetTrigger={resetTrigger}
          joystickRotationRef={joystickRotationRef}
          moveToBioPlaqueRef={moveToBioPlaqueRef}
        />
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={4}
          maxDistance={12}
          target={[0, 0.5, 0]}
          rotateSpeed={isMobile ? 0.4 : 0.3}
          zoomSpeed={isMobile ? 0.6 : 0.5}
          panSpeed={0.4}
          dampingFactor={isMobile ? 0.15 : 0.18}
          enableDamping={true}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          autoRotate={false}
          autoRotateSpeed={0}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
        />
        
        {/* Environment removed for better performance - using simple lighting instead */}
      </Canvas>
      
      {/* Joystick for Camera Rotation - responsive for mobile */}
      {controlsVisible && (
        <div className={`fixed ${isMobile ? 'bottom-20 right-3' : 'bottom-24 right-6 md:right-8'} z-[9998] pointer-events-none`}>
          <div
            ref={joystickRef}
            className={`relative ${isMobile ? 'w-20 h-20' : 'w-24 h-24 md:w-28 md:h-28'} pointer-events-auto`}
            onMouseDown={(e) => {
              e.preventDefault()
              setJoystickActive(true)
              handleJoystickMove(e.nativeEvent)
            }}
            onMouseMove={(e) => {
              if (joystickActive) {
                e.preventDefault()
                handleJoystickMove(e.nativeEvent)
              }
            }}
            onMouseUp={(e) => {
              e.preventDefault()
              setJoystickActive(false)
              setJoystickPosition({ x: 0, y: 0 })
              if (joystickRotationRef) {
                joystickRotationRef.current = { azimuth: 0, polar: 0 }
              }
            }}
            onTouchStart={(e) => {
              e.preventDefault()
              setJoystickActive(true)
              handleJoystickMove(e)
            }}
            onTouchMove={(e) => {
              if (joystickActive && e.touches[0]) {
                e.preventDefault()
                handleJoystickMove(e)
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault()
              setJoystickActive(false)
              setJoystickPosition({ x: 0, y: 0 })
              if (joystickRotationRef) {
                joystickRotationRef.current = { azimuth: 0, polar: 0 }
              }
            }}
            onTouchCancel={(e) => {
              e.preventDefault()
              setJoystickActive(false)
              setJoystickPosition({ x: 0, y: 0 })
              if (joystickRotationRef) {
                joystickRotationRef.current = { azimuth: 0, polar: 0 }
              }
            }}
          >
            {/* Joystick base */}
            <div className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30" />
            {/* Joystick handle */}
            <div
              className={`absolute ${isMobile ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'} rounded-full bg-white/40 backdrop-blur-sm border-2 border-white/60 transition-transform duration-150 ease-out will-change-transform`}
              style={{
                transform: `translate(calc(-50% + ${joystickPosition.x}px), calc(-50% + ${joystickPosition.y}px))`,
                left: '50%',
                top: '50%',
              }}
            />
          </div>
        </div>
      )}
      
      {/* Onscreen Joystick/DPad Controls - responsive for mobile */}
      {controlsVisible && (
        <div className={`fixed ${isMobile ? 'bottom-20 left-3' : 'bottom-24 left-6 md:left-8'} z-[9998] pointer-events-none`}>
          <div className={`pointer-events-auto flex flex-col items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
            {/* Up button - Zoom in */}
            <button
              onClick={() => {
                if (controlsRef.current) {
                  const controls = controlsRef.current
                  controls.dollyIn(0.5)
                  controls.update()
                }
              }}
              className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30 text-white hover:bg-black/80 active:scale-90 transition-[transform,background-color] duration-150 flex items-center justify-center touch-manipulation will-change-transform`}
              aria-label="Zoom in"
            >
              <ChevronUp className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
            </button>
            
            {/* Left/Center/Right row */}
            <div className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleMoveLeft(e)
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  startMoving(-1)
                }}
                onMouseUp={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  stopMoving()
                }}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  startMoving(-1)
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  stopMoving()
                }}
                className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30 text-white hover:bg-black/80 active:scale-90 transition-[transform,background-color] duration-150 flex items-center justify-center touch-manipulation will-change-transform`}
                aria-label="Move left"
              >
                <ChevronLeft className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </button>
              
              <button
                onClick={() => {
                  if (controlsRef.current) {
                    const controls = controlsRef.current
                    controls.dollyOut(0.5)
                    controls.update()
                  }
                }}
                className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30 text-white hover:bg-black/80 active:scale-90 transition-[transform,background-color] duration-150 flex items-center justify-center touch-manipulation will-change-transform`}
                aria-label="Zoom out"
              >
                <ChevronDown className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleMoveRight(e)
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  startMoving(1)
                }}
                onMouseUp={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  stopMoving()
                }}
                onTouchStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  startMoving(1)
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  stopMoving()
                }}
                className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30 text-white hover:bg-black/80 active:scale-90 transition-[transform,background-color] duration-150 flex items-center justify-center touch-manipulation will-change-transform`}
                aria-label="Move right"
              >
                <ChevronRight className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hide/Show Controls Toggle - responsive for mobile */}
      <div className={`fixed ${isMobile ? 'bottom-3 right-3' : 'bottom-6 right-6 md:right-8'} z-[9999] pointer-events-none`}>
        <button
          onClick={() => setControlsVisible(!controlsVisible)}
          className={`pointer-events-auto ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30 text-white hover:bg-black/80 active:scale-90 transition-[transform,background-color] duration-150 flex items-center justify-center shadow-lg touch-manipulation will-change-transform`}
          aria-label={controlsVisible ? "Hide controls" : "Show controls"}
          title={controlsVisible ? "Hide controls" : "Show controls"}
        >
          {controlsVisible ? <EyeOff className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} /> : <Eye className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />}
        </button>
      </div>
      
      {/* Instructions overlay - hidden on mobile to save space */}
      {controlsVisible && !isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 z-20">
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
              <kbd className="px-2 py-1 text-xs bg-white/10 rounded">Reset</kbd>
              <span>button</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-xs">or use</span>
              <span className="text-xs font-semibold">onscreen controls</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
