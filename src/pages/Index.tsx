import { useState } from 'react'
import { Header } from '@/components/Header'
import { SearchFilter } from '@/components/SearchFilter'
import { CardGrid } from '@/components/CardGrid'
import { Footer } from '@/components/Footer'
import { linkCards } from '@/data/cards'

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Gallery Room Container */}
      <main className="flex-1 flex flex-col pt-24">
        {/* Search and Filters - Fixed at top */}
        <section className="px-6 md:px-12 py-6 border-b border-border/20">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Gallery Room */}
        <section className="flex-1 relative overflow-hidden">
          {/* Gallery Wall Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
          
          {/* Floor line */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/40 to-transparent" />
          <div className="absolute bottom-24 left-0 right-0 h-px bg-border/30" />
          
          {/* Horizontal Scrolling Gallery */}
          <div className="h-full py-12 overflow-x-auto overflow-y-hidden scrollbar-gallery">
            <div className="h-full px-12 min-w-max">
              <CardGrid
                cards={linkCards}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Index