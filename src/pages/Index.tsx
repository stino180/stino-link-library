import { useState, lazy, Suspense } from 'react'
import { Header } from '@/components/Header'
import { SearchFilter } from '@/components/SearchFilter'
import { linkCards } from '@/data/cards'

// Lazy load Gallery3D to reduce initial bundle size
// This ensures Three.js and related libraries only load when the gallery is rendered
const Gallery3D = lazy(() => import('@/components/Gallery3D').then(module => ({ default: module.Gallery3D })))

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

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

      {/* 3D Gallery - Full screen */}
      <main className="flex-1 relative">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-serif text-lg text-muted-foreground">Loading gallery...</p>
            </div>
          </div>
        }>
          <Gallery3D
            cards={linkCards}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </Suspense>
      </main>
    </div>
  )
}

export default Index
