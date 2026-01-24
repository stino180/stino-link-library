import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { SearchFilter } from '@/components/SearchFilter'
import { linkCards } from '@/data/cards'
import { useSEO, getCategorySEO, generateGalleryJsonLd } from '@/hooks/useSEO'
import { Gallery3D } from '@/components/Gallery3D'

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Dynamic SEO based on active category
  const seoContent = getCategorySEO(activeCategory)
  
  // Filter cards for JSON-LD
  const filteredCards = useMemo(() => {
    return linkCards.filter(card => 
      activeCategory === 'All' || activeCategory === 'Contact' || card.category === activeCategory
    )
  }, [activeCategory])

  // Generate JSON-LD structured data
  const jsonLd = useMemo(() => generateGalleryJsonLd(filteredCards), [filteredCards])

  // Apply SEO
  useSEO({
    title: seoContent.title,
    description: seoContent.description,
    jsonLd,
  })

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      {/* Search and Filters - Fixed overlay, responsive for mobile */}
      <div className="absolute top-16 md:top-20 left-0 right-0 z-40 px-3 md:px-6 lg:px-12 py-2 md:py-4">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* 3D Gallery - Full screen - handles its own lazy loading */}
      <main className="flex-1 relative">
        <Gallery3D
          cards={linkCards}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      </main>
    </div>
  )
}

export default Index
