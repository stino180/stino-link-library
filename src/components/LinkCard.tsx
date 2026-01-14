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
      className="group relative shrink-0 opacity-0 animate-gallery-fade-in cursor-pointer artwork-spotlight"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {/* Wall-Mounted Frame */}
      <div className="relative w-[280px] md:w-[320px] wall-mounted-frame overflow-hidden transition-all duration-500 ease-museum group-hover:scale-[1.02] group-hover:shadow-2xl">
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

      {/* Museum Placard - Small label below artwork */}
      <div className="mt-6 space-y-1 text-center max-w-[280px] md:max-w-[320px]">
        <h2 className="font-serif text-base md:text-lg font-medium text-foreground group-hover:text-foreground/80 transition-colors">
          {card.title}
        </h2>
        <p className="text-xs tracking-wide text-muted-foreground font-light">
          {card.subtitle}
        </p>
        <div className="pt-0.5">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60">
            {card.category}
          </span>
        </div>
      </div>
    </article>
  )
}