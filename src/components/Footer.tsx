import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-sm tracking-[0.3em] font-medium mb-3">CHOC</h3>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              Chocolate, culture, and curated goods.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs tracking-[0.15em] text-muted mb-4">NAVIGATE</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/articles" className="hover:text-accent transition-colors duration-200">Journal</Link>
              <Link href="/shop" className="hover:text-accent transition-colors duration-200">Shop</Link>
              <Link href="/about" className="hover:text-accent transition-colors duration-200">About</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs tracking-[0.15em] text-muted mb-4">CONNECT</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:text-accent transition-colors duration-200">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors duration-200">Newsletter</a>
              <a href="mailto:hello@choc.com" className="hover:text-accent transition-colors duration-200">hello@choc.com</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-light">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} CHOC
          </p>
        </div>
      </div>
    </footer>
  );
}
