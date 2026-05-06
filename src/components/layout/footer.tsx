export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <a
            href="https://nextwork.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            NextWork
          </a>
        </p>
        <p className="text-xs text-muted-foreground/70">
          Built with NextWork Portfolio Generator
        </p>
      </div>
    </footer>
  );
}
