import { ArrowUpRight } from 'lucide-react'
import { Badge } from './Badge'
import { LinkCard as LinkCardType } from '@/data/cards'

// Import all card images
import musicImg from '@/assets/music.jpg'
import youtubeImg from '@/assets/youtube.jpg'
import portfolioImg from '@/assets/portfolio.jpg'
import bookingImg from '@/assets/booking.jpg'
import merchImg from '@/assets/merch.jpg'
import liquidnotesImg from '@/assets/liquidnotes.jpg'
import bridgeImg from '@/assets/bridge.jpg'
import tiktokImg from '@/assets/tiktok.jpg'
import instagramImg from '@/assets/instagram.jpg'
import twitterImg from '@/assets/twitter.jpg'

const imageMap = {
  music: musicImg,
  youtube: youtubeImg,
  portfolio: portfolioImg,
  booking: bookingImg,
  merch: merchImg,
  liquidnotes: liquidnotesImg,
  bridge: bridgeImg,
  tiktok: tiktokImg,
  instagram: instagramImg,
  twitter: twitterImg,
}

interface LinkCardProps {
  card: LinkCardType
  index: number
}

export function LinkCard({ card, index }: LinkCardProps) {
  const handleClick = () => {
    if (card.href.startsWith('mailto:')) {
      window.location.href = card.href
    } else if (card.external) {
      window.open(card.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = card.href
    }
  }

  const imageUrl = imageMap[card.image as keyof typeof imageMap] || musicImg

  return (
    <article
      className="group relative shrink-0 w-[320px] md:w-[400px] opacity-0 animate-gallery-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {/* Artwork on Wall */}
      <div className="relative">
        {/* Wall shadow effect */}
        <div className="absolute -inset-4 bg-gradient-to-b from-foreground/5 via-transparent to-foreground/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* The Frame */}
        <div className="relative artwork-frame overflow-hidden bg-card shadow-frame">
          {/* Badge */}
          {card.badge && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant={card.badge.toLowerCase() as 'new' | 'wip' | 'drop'}>
                {card.badge}
              </Badge>
            </div>
          )}

          {/* Artwork Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={imageUrl}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-museum group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            
            {/* View Arrow */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-background/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg">
                <ArrowUpRight className="h-4 w-4 text-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Museum Placard */}
        <div className="mt-5 space-y-1.5 text-center">
          <h2 className="font-serif text-xl md:text-2xl font-medium text-foreground group-hover:text-foreground/80 transition-colors">
            {card.title}
          </h2>
          <p className="text-sm tracking-wide text-muted-foreground font-light">
            {card.subtitle}
          </p>
          <div className="pt-1">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60">
              {card.category}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}