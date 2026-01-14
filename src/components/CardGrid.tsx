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
      <div className="text-center py-24">
        <p className="font-serif text-2xl text-muted-foreground font-light italic">
          No works found
        </p>
        <p className="mt-4 text-sm text-muted-foreground/60 tracking-wide">
          Try adjusting your search or filter
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-24 md:space-y-32">
      {filteredCards.map((card, index) => (
        <LinkCard key={card.id} card={card} index={index} />
      ))}
    </div>
  )
}