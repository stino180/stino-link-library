export function Footer() {
  return (
    <footer className="mt-32 py-16 border-t border-border/30">
      <div className="container px-6 md:px-12">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <h2 className="font-serif text-xl font-medium text-foreground">
            Stino 180
          </h2>
          
          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <a
              href="mailto:legal@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Terms
            </a>
            <span className="text-border">·</span>
            <a
              href="mailto:legal@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Privacy
            </a>
            <span className="text-border">·</span>
            <a
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Contact
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60 tracking-wider">
            © 2024 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}