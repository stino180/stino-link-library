import { useRef, useCallback } from 'react'
import { LinkCard as LinkCardType } from '@/data/cards'
import { ArrowUpRight } from 'lucide-react'

// Image imports
import musicImg from '@/assets/music.jpg'
import youtubeImg from '@/assets/youtube.png'
import recordingsImg from '@/assets/180recordings.jpg'
import portfolioImg from '@/assets/portfolio.jpg'
import merchImg from '@/assets/merch.jpg'
import tiktokImg from '@/assets/tiktok.png'
import instagramImg from '@/assets/ig.jfif'
import twitterImg from '@/assets/twitter.jpg'
import mozzeImg from '@/assets/mozze.png'
import viziImg from '@/assets/vizi_test.png'
import stackflowImg from '@/assets/dca.png'
import stinoImg from '@/assets/stino-logo.png'

const imageMap: Record<string, string> = {
  music: musicImg,
  youtube: youtubeImg,
  recordings: recordingsImg,
  portfolio: portfolioImg,
  booking: viziImg,
  merch: merchImg,
  tiktok: tiktokImg,
  instagram: instagramImg,
  twitter: twitterImg,
  mozze: mozzeImg,
  stino: stinoImg,
  stackflow: stackflowImg,
}

interface Gallery2DProps {
  cards: LinkCardType[]
  searchQuery: string
  activeCategory: string
}

/**
 * Lightweight 2D gallery for mobile devices
 * Avoids Three.js entirely for better performance
 */
export function Gallery2D({ cards, searchQuery, activeCategory }: Gallery2DProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Filter cards
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === '' ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory =
      activeCategory === 'All' || 
      activeCategory === 'Contact' || 
      card.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleCardClick = useCallback((card: LinkCardType) => {
    if (card.href.startsWith('mailto:')) {
      window.location.href = card.href
    } else if (card.external) {
      window.open(card.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = card.href
    }
  }, [])

  if (filteredCards.length === 0 && activeCategory !== 'Contact') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-serif text-2xl text-muted-foreground font-light italic">
            No works found
          </p>
          <p className="mt-4 text-sm text-muted-foreground/60 tracking-wide">
            Try adjusting your search or filter
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-background overflow-hidden">
      {/* Bio section for Contact category */}
      {activeCategory === 'Contact' && (
        <div className="px-4 py-6 border-b border-border/30">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic font-serif">
              "I create music, build digital experiences, and develop platforms that bring ideas to life."
            </p>
            <p className="mt-3 text-sm text-foreground font-medium">— Justin</p>
            <a 
              href="mailto:jstrongmgmt@gmail.com"
              className="inline-block mt-3 text-sm text-primary hover:underline"
            >
              jstrongmgmt@gmail.com
            </a>
          </div>
        </div>
      )}

      {/* Horizontal scroll gallery */}
      <div 
        ref={scrollRef}
        className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="h-full flex items-center gap-6 md:gap-8 px-6 py-8">
          {/* Leading spacer */}
          <div className="shrink-0 w-4" />

          {filteredCards.map((card, index) => {
            const imageUrl = imageMap[card.image] || musicImg
            const isPriority = index < 2

            return (
              <article
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Frame */}
                <div className="bg-[#1a1a1a] p-2.5 md:p-3 rounded-sm shadow-2xl transition-shadow duration-300 group-hover:shadow-3xl">
                  {/* Image */}
                  <div className="w-36 h-44 md:w-44 md:h-56 bg-neutral-800 overflow-hidden relative">
                    <img
                      src={imageUrl}
                      alt={card.title}
                      width={176}
                      height={224}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={isPriority ? 'eager' : 'lazy'}
                      decoding={isPriority ? 'sync' : 'async'}
                      fetchPriority={isPriority ? 'high' : 'auto'}
                    />
                    
                    {/* Badge */}
                    {card.badge && (
                      <div className="absolute top-2 right-2">
                        <span className={`
                          px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-wider
                          ${card.badge === 'New' ? 'bg-green-500/90 text-white' : ''}
                          ${card.badge === 'WIP' ? 'bg-yellow-500/90 text-black' : ''}
                          ${card.badge === 'Drop' ? 'bg-red-500/90 text-white' : ''}
                        `}>
                          {card.badge}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Arrow icon */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <div className="bg-white/90 rounded-full p-1.5 shadow-lg">
                        <ArrowUpRight className="h-3 w-3 text-neutral-900" />
                      </div>
                    </div>
                  </div>

                  {/* Placard - title only */}
                  <div className="mt-2 bg-white/95 p-2 rounded-sm">
                    <h2 className="text-sm md:text-base font-medium text-neutral-900 truncate text-center">
                      {card.title}
                    </h2>
                  </div>
                </div>
              </article>
            )
          })}

          {/* Trailing spacer */}
          <div className="shrink-0 w-4" />
        </div>
      </div>
    </div>
  )
}
