import { Suspense, useState, useEffect, useCallback, lazy } from 'react'
import { LinkCard as LinkCardType } from '@/data/cards'
import { GallerySkeleton } from '@/components/GallerySkeleton'
import { Gallery2D } from '@/components/Gallery2D'

// Lazy load GalleryScene to defer Three.js bundle - only for desktop
const GalleryScene = lazy(() => 
  import('./GalleryScene').then(module => ({ default: module.GalleryScene }))
)

interface Gallery3DProps {
  cards: LinkCardType[]
  searchQuery: string
  activeCategory: string
}

// Detect if device should use 2D mode (mobile/slow devices)
function shouldUse2DMode(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check for mobile/tablet via screen width
  const isMobileScreen = window.innerWidth < 768
  
  // Check for low-end device via hardware concurrency
  const isLowEndDevice = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4
  
  // Check for slow connection
  const connection = (navigator as any).connection
  const isSlowConnection = connection && (
    connection.saveData === true ||
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.effectiveType === '3g'
  )
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Use 2D on mobile screens, slow connections, or if user prefers reduced motion
  return isMobileScreen || isSlowConnection || prefersReducedMotion
}

function LoadingScreen() {
  return <GallerySkeleton />
}

export function Gallery3D({ cards, searchQuery, activeCategory }: Gallery3DProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [use2DMode, setUse2DMode] = useState(false)
  const [modeChecked, setModeChecked] = useState(false)

  // Check device capabilities on mount
  useEffect(() => {
    const use2D = shouldUse2DMode()
    setUse2DMode(use2D)
    setModeChecked(true)
    
    // If using 2D mode, skip 3D loading entirely
    if (use2D) {
      setIsTransitioning(true)
      return
    }
    
    // For 3D mode, defer loading until after initial paint
    const loadAfterIdle = () => {
      const timer = setTimeout(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setShouldLoad3D(true)
        }, 100)
      }, 50)
      return () => clearTimeout(timer)
    }

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(loadAfterIdle, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback(id)
    } else {
      const timer = setTimeout(loadAfterIdle, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // Filter cards
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === '' ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory =
      activeCategory === 'All' || 
      activeCategory === 'Contact' || 
      card.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleCardClick = useCallback((card: LinkCardType) => {
    if (card.href.startsWith('mailto:')) {
      window.location.href = card.href
    } else if (card.external) {
      window.open(card.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = card.href
    }
  }, [])

  // Don't show "No works found" for Contact category
  if (filteredCards.length === 0 && activeCategory !== 'Contact') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-serif text-2xl text-muted-foreground font-light italic">
            No works found
          </p>
          <p className="mt-4 text-sm text-muted-foreground/60 tracking-wide">
            Try adjusting your search or filter
          </p>
        </div>
      </div>
    )
  }

  // Wait until mode is checked
  if (!modeChecked) {
    return <LoadingScreen />
  }

  // Use lightweight 2D gallery on mobile/slow devices
  if (use2DMode) {
    return (
      <div className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
        <Gallery2D
          cards={cards}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      </div>
    )
  }

  // Show skeleton until 3D is ready to load
  if (!shouldLoad3D) {
    return <LoadingScreen />
  }

  return (
    <div className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
      <Suspense fallback={<LoadingScreen />}>
        <GalleryScene 
          cards={filteredCards} 
          onCardClick={handleCardClick}
          activeCategory={activeCategory}
        />
      </Suspense>
    </div>
  )
}