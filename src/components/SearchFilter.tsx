import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const categories = ['All', 'Music', 'Video', 'Portfolio', 'Social', 'Projects', 'Contact']

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (value: string) => void
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
    <div className="flex flex-col items-center gap-8 mb-20">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search the gallery..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 h-12 bg-background border-border/50 rounded-full text-sm placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground/20"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-full border ${
              activeCategory === category
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border/50 hover:border-foreground/30 hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}