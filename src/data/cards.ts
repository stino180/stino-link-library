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
    id: 'recordings',
    title: '180 Recordings LLC',
    subtitle: 'Label info and merch.',
    href: 'https://180recordings.org',
    image: 'recordings',
    category: 'Video',
    external: true,
  },
  {
    id: 'vizi',
    title: 'Vizi',
    subtitle: 'Clothing brand by Justin',
    href: 'https://vizi.studio',
    image: 'booking',
    category: 'Projects',
    external: true,
  },
  {
    id: 'portfolio',
    title: 'Freelance Portfolio',
    subtitle: 'Eols, birthchart app & more.',
    href: 'https://example.com/portfolio',
    image: 'portfolio',
    category: 'Portfolio',
    external: true,
  },
  {
    id: 'zmove',
    title: 'Zmove',
    subtitle: 'Sports clip app.',
    href: 'https://zmove.xyz',
    image: 'merch',
    category: 'Projects',
    external: true,
  },
  {
    id: 'mozze',
    title: 'Mozze',
    subtitle: 'Artist friendly streaming site.',
    href: 'https://mozze.xyz',
    image: 'mozze',
    category: 'Projects',
    external: true,
  },
  {
    id: 'stino',
    title: 'Stino 180',
    subtitle: 'My personal artist site.',
    href: 'https://stino180.com',
    image: 'stino',
    category: 'Music',
    external: true,
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    subtitle: 'Music and crypto content.',
    href: 'https://tiktok.com/@stino180',
    image: 'tiktok',
    category: 'Social',
    external: true,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Music and crypto content.',
    href: 'https://instagram.com/stino180',
    image: 'instagram',
    category: 'Social',
    external: true,
  },
  {
    id: 'twitter',
    title: 'X / Twitter',
    subtitle: 'Updates on my music content.',
    href: 'https://x.com/stino180',
    image: 'twitter',
    category: 'Social',
    external: true,
  },
  {
    id: 'youtube',
    title: 'YouTube',
    subtitle: 'Watch my music videos and mini films.',
    href: 'https://youtube.com/@stino180',
    image: 'youtube',
    category: 'Video',
    external: true,
  },
  {
    id: 'stackflow',
    title: 'Stack Flow',
    subtitle: 'DCA crypto app for easy crypto purchasing.',
    href: 'https://dripbuy.vercel.app/dca',
    image: 'stackflow',
    category: 'Projects',
    external: true,
  },
]

export const categories = ['All', 'Music', 'Video', 'Portfolio', 'Social', 'Projects', 'Contact'] as const