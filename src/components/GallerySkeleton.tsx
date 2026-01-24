import { linkCards } from '@/data/cards'

// Image imports for skeleton preview
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

interface GallerySkeletonProps {
  onReady?: () => void
}

/**
 * Fast 2D skeleton that renders instantly while 3D loads
 * Designed to provide immediate FCP and good LCP
 */
export function GallerySkeleton({ onReady }: GallerySkeletonProps) {
  // Show first 3 cards as static preview
  const previewCards = linkCards.slice(0, 3)

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Simplified gallery preview - static cards */}
      <div className="flex gap-6 md:gap-8 items-end px-4">
        {previewCards.map((card, index) => {
          const imageUrl = imageMap[card.image] || musicImg
          return (
            <div
              key={card.id}
              className="relative animate-pulse"
              style={{
                animationDelay: `${index * 100}ms`,
                transform: `scale(${1 - index * 0.05})`,
              }}
            >
              {/* Frame */}
              <div className="bg-[#1a1a1a] p-2 rounded-sm shadow-2xl">
                {/* Image placeholder with actual image for LCP */}
                <div className="w-32 h-40 md:w-40 md:h-52 bg-neutral-800 overflow-hidden">
                  {index === 0 ? (
                    // First image loads eagerly for LCP
                    <img
                      src={imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                    />
                  ) : (
                    // Other images lazy load
                    <img
                      src={imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                {/* Placard */}
                <div className="mt-2 bg-white/90 p-2 rounded-sm">
                  <div className="text-xs font-medium text-neutral-900 truncate">
                    {card.title}
                  </div>
                  <div className="text-[10px] text-neutral-600 truncate">
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-white/60 text-sm font-light tracking-wide">
          Entering gallery...
        </p>
      </div>

      {/* Fade overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-30 pointer-events-none" />
    </div>
  )
}
