import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { Button } from '@/components/ui/button'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo / Title */}
        <div className="flex items-center">
          <h1 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-foreground">
            Justin's portfolio
          </h1>
        </div>

        {/* Subtitle */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">
            Gallery
          </span>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-10 w-10 rounded-full hover:bg-accent"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}