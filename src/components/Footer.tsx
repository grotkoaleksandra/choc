import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-3">CHOC</h3>
            <p className="text-sm text-muted max-w-xs">
              A magazine for the curious. Stories, culture, and curated goods.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Navigate</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/articles" className="hover:text-foreground transition-colors">Articles</Link>
              <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Connect</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">Newsletter</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-foreground/10 text-sm text-muted">
          &copy; {new Date().getFullYear()} CHOC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
