import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/cards'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card/50 border-chrome-border backdrop-blur-sm focus:ring-apple-blue focus:border-apple-blue transition-all"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`transition-all ${
              activeCategory === category
                ? 'bg-apple-blue hover:bg-apple-blue-hover text-white shadow-glow'
                : 'hover:bg-card-hover border border-chrome-border/50'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}