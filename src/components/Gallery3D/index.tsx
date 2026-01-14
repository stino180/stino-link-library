import { Suspense, useState } from 'react'
import { GalleryScene } from './GalleryScene'
import { LinkCard as LinkCardType } from '@/data/cards'

interface Gallery3DProps {
  cards: LinkCardType[]
  searchQuery: string
  activeCategory: string
}

function LoadingScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-serif text-lg text-muted-foreground">Entering gallery...</p>
      </div>
    </div>
  )
}

export function Gallery3D({ cards, searchQuery, activeCategory }: Gallery3DProps) {
  // Filter cards
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === '' ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory =
      activeCategory === 'All' || card.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleCardClick = (card: LinkCardType) => {
    if (card.href.startsWith('mailto:')) {
      window.location.href = card.href
    } else if (card.external) {
      window.open(card.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = card.href
    }
  }

  if (filteredCards.length === 0) {
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

  return (
    <Suspense fallback={<LoadingScreen />}>
      <GalleryScene cards={filteredCards} onCardClick={handleCardClick} />
    </Suspense>
  )
}
