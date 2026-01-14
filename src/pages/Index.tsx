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
          {/* Ceiling rail */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-muted/60 to-muted/20 shadow-sm" />
          <div className="absolute top-3 left-0 right-0 h-px bg-border/40" />
          
          {/* Gallery Wall Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/30" />
          
          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(30,20%,25%)] via-[hsl(30,15%,35%)] to-[hsl(30,10%,50%)]" />
          <div className="absolute bottom-20 left-0 right-0 h-px bg-border/50" />
          {/* Floor reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-transparent to-white/5" />
          
          {/* Horizontal Scrolling Gallery */}
          <div className="h-full pt-0 pb-24 overflow-x-auto overflow-y-hidden scrollbar-gallery">
            <div className="h-full px-12 min-w-max flex items-start">
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