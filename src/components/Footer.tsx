export function Footer() {
  return (
    <footer className="mt-16 border-t border-chrome-border bg-chrome-header/50 backdrop-blur-glass">
      <div className="container px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            © 2024 Stino 180. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="mailto:legal@example.com"
              className="hover:text-apple-blue transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:legal@example.com"
              className="hover:text-apple-blue transition-colors"
            >
              Privacy
            </a>
            <a
              href="mailto:contact@example.com"
              className="hover:text-apple-blue transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}