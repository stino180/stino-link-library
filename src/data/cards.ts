// iTunes-style Link Hub Card Data
// Edit this file to add/remove/modify cards

export interface LinkCard {
  id: string
  title: string
  subtitle: string
  href: string
  image: string
  category: 'All' | 'Music' | 'Video' | 'Portfolio' | 'Social' | 'Projects' | 'Contact'
  badge?: 'New' | 'WIP' | 'Drop'
  external?: boolean
}

export const linkCards: LinkCard[] = [
  {
    id: 'music-site',
    title: 'My music',
    subtitle: 'Stream my latest tracks & releases.',
    href: 'https://untd.io/stino',
    image: 'music',
    category: 'Music',
    badge: 'New',
    external: true,
  },
  {
    id: 'youtube',
    title: '180 Recordings LLC',
    subtitle: 'Label info and merch.',
    href: 'https://youtube.com/@stino180',
    image: 'youtube',
    category: 'Video',
    external: true,
  },
  {
    id: 'portfolio',
    title: 'Freelance Portfolio',
    subtitle: 'Web design/dev work for clients.',
    href: 'https://example.com/portfolio',
    image: 'portfolio',
    category: 'Portfolio',
    external: true,
  },
  {
    id: 'booking',
    title: 'Booking & Inquiries',
    subtitle: 'Shows, features, freelance gigs.',
    href: 'mailto:booking@example.com',
    image: 'booking',
    category: 'Contact',
    external: false,
  },
  {
    id: 'merch',
    title: 'Merch / Tabby City',
    subtitle: 'Cat-themed tees & drops.',
    href: 'https://example.com/tabbycity',
    image: 'merch',
    category: 'Projects',
    badge: 'Drop',
    external: true,
  },
  {
    id: 'liquid-notes',
    title: 'Liquid Notes (NFT/DeFi)',
    subtitle: 'Project hub & docs.',
    href: 'https://example.com/liquid-notes',
    image: 'liquidnotes',
    category: 'Projects',
    external: true,
  },
  {
    id: 'bridge',
    title: 'Bridge App (WIP)',
    subtitle: 'Multi-chain routing demo.',
    href: 'https://example.com/bridge',
    image: 'bridge',
    category: 'Projects',
    badge: 'WIP',
    external: true,
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    subtitle: 'Snippets, freestyles, daily posts.',
    href: 'https://tiktok.com/@stino180',
    image: 'tiktok',
    category: 'Social',
    external: true,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Visuals, reels, announcements.',
    href: 'https://instagram.com/stino180',
    image: 'instagram',
    category: 'Social',
    external: true,
  },
  {
    id: 'twitter',
    title: 'X / Twitter',
    subtitle: 'Threads, drops, and updates.',
    href: 'https://x.com/stino180',
    image: 'twitter',
    category: 'Social',
    external: true,
  },
]

export const categories = ['All', 'Music', 'Video', 'Portfolio', 'Social', 'Projects', 'Contact'] as const