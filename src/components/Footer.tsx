import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-sm tracking-[0.3em] font-medium mb-3 hover-wiggle inline-block">SYRENA CHOCOLATE</h3>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              A chocolate journal and curated apothecary by Syrena Chocolate. Stories, craft, and fine chocolate.
            </p>
            <div className="gold-line w-12 mt-4" />
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs tracking-[0.15em] text-muted mb-4">NAVIGATE</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/articles" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Journal</Link>
              <Link href="/shop" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Shop</Link>
              <Link href="/about" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">About</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs tracking-[0.15em] text-muted mb-4">CONNECT</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Instagram</a>
              <a href="#" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Newsletter</a>
              <a href="mailto:hello@syrenachocolate.com" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">hello@syrenachocolate.com</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} SYRENA CHOCOLATE
          </p>
          <p className="text-xs text-muted/40">
            Made with &#127851; and intention
          </p>
        </div>
      </div>
    </footer>
  );
}
