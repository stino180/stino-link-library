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
        <section className="flex-1 relative overflow-hidden gallery-room">
          {/* Ceiling with Track Lighting */}
          <div className="absolute top-0 left-0 right-0 z-20">
            {/* Ceiling surface */}
            <div className="h-8 bg-gradient-to-b from-[#f0f0f0] via-[#e8e8e8] to-[#e0e0e0] dark:from-[#1a1a1a] dark:via-[#151515] dark:to-[#101010]" />
            
            {/* Track rail */}
            <div className="h-3 track-lighting flex items-center justify-center">
              <div className="w-[95%] h-1 bg-[#1a1a1a] rounded-full" />
            </div>
            
            {/* Track lights */}
            <div className="absolute top-8 left-0 right-0 flex justify-around px-[10%]">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="track-light" />
              ))}
            </div>
          </div>
          
          {/* Gallery Wall */}
          <div className="absolute inset-0 top-11 bottom-[100px] gallery-wall" />
          
          {/* Floor baseboard */}
          <div className="absolute bottom-[100px] left-0 right-0 h-3 bg-gradient-to-b from-[#d0d0d0] to-[#b0b0b0] dark:from-[#2a2a2a] dark:to-[#1a1a1a] shadow-sm" />
          
          {/* Wood Plank Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] gallery-floor" />
          
          {/* Horizontal Scrolling Gallery */}
          <div className="h-full pt-[120px] pb-[130px] overflow-x-auto overflow-y-hidden scrollbar-gallery relative z-10">
            <div className="h-full px-16 min-w-max flex items-center">
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