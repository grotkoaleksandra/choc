import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <ScrollReveal>
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-muted">ABOUT</span>
          <h1 className="font-display text-4xl md:text-5xl font-light mt-2 italic">Our Story</h1>
          <div className="gold-line w-16 mt-4" />
        </div>
      </ScrollReveal>

      <div className="space-y-6 font-body text-base text-foreground/80 leading-[1.8]">
        <ScrollReveal>
          <p className="drop-cap">
            CHOC is a chocolate journal and curated apothecary. We tell stories about cacao \u2014
            its origins, its makers, and the culture that surrounds it \u2014 and we offer a small,
            intentional selection of fine chocolates and cacao goods.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p>
            We believe chocolate is more than a sweet. It's one of the world's great craft ingredients,
            with a history spanning millennia and a complexity that rivals wine. Every bar we carry and
            every story we publish reflects that belief.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p>
            Founded in 2026, CHOC draws inspiration from the chocolate houses of old Europe, the cacao
            ceremonies of Mesoamerica, and the modern bean-to-bar movement. We're a place where the
            ancient and the contemporary meet \u2014 where a 3,000-year-old ingredient finds new expression.
          </p>
        </ScrollReveal>
      </div>

      {/* Values */}
      <ScrollReveal className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="float-slow inline-block text-2xl mb-3">&#127793;</div>
            <h3 className="text-xs tracking-[0.2em] mb-2">ORIGIN</h3>
            <p className="text-xs text-muted leading-relaxed">Every bean has a story. We trace our cacao to its source.</p>
          </div>
          <div className="text-center">
            <div className="float-slow inline-block text-2xl mb-3" style={{ animationDelay: "1s" }}>&#9878;</div>
            <h3 className="text-xs tracking-[0.2em] mb-2">CRAFT</h3>
            <p className="text-xs text-muted leading-relaxed">Small batch. Handmade. No shortcuts, no compromise.</p>
          </div>
          <div className="text-center">
            <div className="float-slow inline-block text-2xl mb-3" style={{ animationDelay: "2s" }}>&#10022;</div>
            <h3 className="text-xs tracking-[0.2em] mb-2">WONDER</h3>
            <p className="text-xs text-muted leading-relaxed">Chocolate is magic. We never want to lose sight of that.</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs tracking-[0.15em] text-muted">GET IN TOUCH</h2>
          <div className="flex-1 border-t border-border-light" />
        </div>
        <p className="text-sm text-muted">
          For editorial inquiries, wholesale, or just to talk chocolate \u2014 reach out at{" "}
          <a href="mailto:hello@choc.com" className="text-foreground hover:text-accent transition-colors link-fancy">
            hello@choc.com
          </a>
        </p>
      </ScrollReveal>
    </div>
  );
}
