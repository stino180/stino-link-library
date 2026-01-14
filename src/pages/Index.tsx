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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="container px-6 md:px-12 mb-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground">
              The Collection
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
              A curated exhibition of works, projects, and connections
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container px-6 md:px-12 mb-16">
          <div className="max-w-xs mx-auto border-t border-border/30" />
        </div>

        {/* Search and Filters */}
        <section className="container px-6 md:px-12">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Gallery Cards */}
          <CardGrid
            cards={linkCards}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Index