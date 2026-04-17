export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 px-6 text-center">
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} <span className="neon-text font-display font-semibold">Mysore College of Engineering and Management-MyCEM</span>. All rights reserved.
      </p>
    </footer>
  );
}
