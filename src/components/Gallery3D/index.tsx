import { Suspense, useState, useEffect, useCallback, lazy } from 'react'
import { LinkCard as LinkCardType } from '@/data/cards'
import { GallerySkeleton } from '@/components/GallerySkeleton'

// Lazy load GalleryScene to defer Three.js bundle
const GalleryScene = lazy(() => 
  import('./GalleryScene').then(module => ({ default: module.GalleryScene }))
)

interface Gallery3DProps {
  cards: LinkCardType[]
  searchQuery: string
  activeCategory: string
}

function LoadingScreen() {
  return <GallerySkeleton />
}

export function Gallery3D({ cards, searchQuery, activeCategory }: Gallery3DProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Defer 3D loading until after initial paint using requestIdleCallback
  useEffect(() => {
    // Use requestIdleCallback to load 3D after browser is idle
    const loadAfterIdle = () => {
      // Small delay to ensure skeleton is painted first
      const timer = setTimeout(() => {
        setIsTransitioning(true)
        // Another small delay for transition effect
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
      // Fallback for Safari - load after 100ms
      const timer = setTimeout(loadAfterIdle, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // Filter cards - Contact category is special, it shows all cards but moves camera to bio plaque
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === '' ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Contact category doesn't filter - it just moves camera to bio plaque
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

  // Don't show "No works found" for Contact category - it's special
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