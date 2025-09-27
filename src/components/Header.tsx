import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { Button } from '@/components/ui/button'
import musicLogo from '@/assets/music.jpg'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-chrome-border bg-chrome-header backdrop-blur-glass">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={musicLogo}
            alt="Stino 180 Logo"
            className="h-8 w-8 rounded-lg shadow-card border border-white/10"
          />
        </div>

        {/* Center Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Stino 180 — Dashboard
          </h1>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <div className="flex rounded-lg border border-chrome-border bg-glass-bg/50 p-1 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('light')}
              className={`h-7 w-7 p-0 transition-all ${
                theme === 'light'
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('dark')}
              className={`h-7 w-7 p-0 transition-all ${
                theme === 'dark'
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}