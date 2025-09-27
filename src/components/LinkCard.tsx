import { ExternalLink, Mail } from 'lucide-react'
import { Badge } from './Badge'
import { Button } from '@/components/ui/button'
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
    <div
      className="group relative bg-card border border-chrome-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ease-card hover:bg-card-hover animate-fade-in-up backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)'
      }}
    >
      {/* Badge */}
      {card.badge && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge variant={card.badge.toLowerCase() as 'new' | 'wip' | 'drop'}>
            {card.badge}
          </Badge>
        </div>
      )}

      {/* Card Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={card.title}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground group-hover:text-apple-blue transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{card.subtitle}</p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleClick}
          className="w-full bg-apple-blue hover:bg-apple-blue-hover text-white shadow-sm hover:shadow-glow transition-all group-hover:animate-glow-pulse"
          size="sm"
        >
          <div className="flex items-center gap-2">
            {card.href.startsWith('mailto:') ? (
              <Mail className="h-4 w-4" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
            <span>
              {card.href.startsWith('mailto:') ? 'Contact' : 'Open Link'}
            </span>
          </div>
        </Button>
      </div>
    </div>
  )
}