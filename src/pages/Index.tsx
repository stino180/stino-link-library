import { useState } from 'react'
import { Menu } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { AppSidebar } from '@/components/AppSidebar'
import { SearchFilter } from '@/components/SearchFilter'
import { CardGrid } from '@/components/CardGrid'
import { Footer } from '@/components/Footer'
import { linkCards } from '@/data/cards'

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full bg-background-gradient">
        <Header />
        
        <div className="flex w-full">
          <AppSidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <main className="flex-1 min-h-screen">
            {/* Mobile Sidebar Trigger */}
            <div className="md:hidden p-4 border-b border-chrome-border">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SidebarTrigger>
            </div>

            <div className="container px-6 py-8">
              {/* Search and Filters */}
              <SearchFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Cards Grid */}
              <CardGrid
                cards={linkCards}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
              />
            </div>
            
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index
