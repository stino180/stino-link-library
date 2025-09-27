import { LinkCard } from './LinkCard'
import { LinkCard as LinkCardType } from '@/data/cards'

interface CardGridProps {
  cards: LinkCardType[]
  searchQuery: string
  activeCategory: string
}

export function CardGrid({ cards, searchQuery, activeCategory }: CardGridProps) {
  // Filter cards based on search and category
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === '' ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory =
      activeCategory === 'All' || card.category === activeCategory

    return matchesSearch && matchesCategory
  })

  if (filteredCards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No links found</div>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {filteredCards.map((card, index) => (
        <LinkCard key={card.id} card={card} index={index} />
      ))}
    </div>
  )
}