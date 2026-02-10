export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-12">
        <span className="text-xs tracking-[0.2em] text-muted">ABOUT</span>
        <h1 className="font-display text-4xl md:text-5xl font-light mt-2 italic">Our Story</h1>
      </div>

      <div className="space-y-6 font-body text-base text-foreground/80 leading-[1.8]">
        <p className="drop-cap">
          CHOC is an editorial platform and curated shop. We tell stories about the people,
          ideas, and objects that shape how we live — and we offer a small, intentional selection
          of goods that reflect those values.
        </p>
        <p>
          We believe in quality over quantity, craft over convenience, and curiosity over certainty.
          Every article we publish and every product we carry has been chosen with care.
        </p>
        <p>
          Founded in 2026, CHOC started as a simple idea: what if a journal and a shop
          could exist in the same space, each enriching the other?
        </p>
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs tracking-[0.15em] text-muted">GET IN TOUCH</h2>
          <div className="flex-1 border-t border-border-light" />
        </div>
        <p className="text-sm text-muted">
          For editorial inquiries, collaborations, or wholesale — reach out at{" "}
          <a href="mailto:hello@choc.com" className="text-foreground hover:text-accent transition-colors border-b border-border-light">
            hello@choc.com
          </a>
        </p>
      </div>
    </div>
  );
}
