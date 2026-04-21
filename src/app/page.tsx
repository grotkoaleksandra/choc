import ArticleCard from "@/components/ArticleCard";
import HomeNav from "@/components/HomeNav";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const articles = [
  {
    slug: "bean-to-bar-revolution",
    title: "The Bean-to-Bar Revolution",
    excerpt: "How a new generation of chocolate makers is changing everything we know about flavor.",
    category: "Craft",
    date: "Feb 8, 2026",
    image: "/choc/img-2.png",
  },
  {
    slug: "chocolate-and-terroir",
    title: "Chocolate & Terroir",
    excerpt: "Why the same cacao bean tastes different depending on where it grows.",
    category: "Science",
    date: "Feb 5, 2026",
    image: "/choc/img-3.png",
  },
  {
    slug: "the-art-of-tempering",
    title: "The Art of Tempering",
    excerpt: "The alchemy behind that perfect snap and glossy sheen.",
    category: "Technique",
    date: "Feb 3, 2026",
    image: "/choc/img-4.png",
  },
];

const products = [
  { id: "dark-72", name: "Single Origin Dark", origin: "Chuao, Venezuela", percent: "72%", price: "$14" },
  { id: "sea-salt-caramel", name: "Sea Salt & Caramel", origin: "Piura, Peru", percent: "66%", price: "$16" },
  { id: "cacao-nibs", name: "Roasted Cacao Nibs", origin: "Tumbes Valley", percent: "100%", price: "$12" },
  { id: "drinking-choc", name: "Ceremonial Drinking", origin: "Oaxaca, México", percent: "Ceremonial", price: "$22" },
];

const marqueeItems = [
  "SYRENA CHOCOLATE",
  "BEAN · TO · BAR",
  "ATELIER WARSZAWA",
  "EDITION N°07",
  "LIMITED RUNS",
  "HANDCRAFTED",
  "SPRING MMXXVI",
];

export default function Home() {
  return (
    <main className="relative">
      <HomeNav />

      {/* ════════════════════════════════════════════════════════════════
          I. EDITORIAL HERO — massive typographic statement
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 md:px-12">
        {/* Vertical chapter label (left edge) */}
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-left">
          <span className="text-[9px] tracking-[0.5em] text-white/40">
            CHAPITRE I  ·  ATELIER
          </span>
        </div>

        {/* Edition marker (right edge) */}
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right">
          <span className="text-[9px] tracking-[0.5em] text-white/40">
            EDITION  ·  MMXXVI  ·  N°07
          </span>
        </div>

        {/* Top meta row */}
        <ScrollReveal>
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/50">
              <span className="inline-block w-6 h-px bg-white/30" />
              <span>A CHOCOLATE JOURNAL</span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/50">
              <span>EST.  ·  WARSAW</span>
              <span className="inline-block w-6 h-px bg-white/30" />
            </div>
          </div>
        </ScrollReveal>

        {/* Main typographic block */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="mb-2 text-[10px] tracking-[0.4em] text-white/40">
                <span className="text-gold">✦</span>  I.  INTRODUCTION
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <h1 className="font-display italic font-light text-white leading-[0.85] tracking-tight text-[18vw] md:text-[15vw] lg:text-[13vw]">
                Syrena.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="mt-6 md:mt-10 grid grid-cols-12 gap-4 items-end">
                <div className="col-span-12 md:col-span-5 md:col-start-2">
                  <p className="font-body text-base md:text-lg text-white/70 leading-[1.5]">
                    A studio for fine chocolate, born in Warsaw. We work
                    slowly, with single-origin cacao, letting terroir and
                    craft speak louder than any recipe.
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col items-start md:items-end gap-3">
                  <Link
                    href="/shop"
                    className="group text-[11px] tracking-[0.3em] text-white/80 hover:text-white transition-colors"
                  >
                    <span className="relative">
                      ENTER THE ATELIER
                      <span className="block h-px w-full bg-white/60 mt-2 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
                    </span>
                  </Link>
                  <span className="text-[10px] tracking-[0.3em] text-white/30">↓  SCROLL</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom meta row */}
        <ScrollReveal delay={400}>
          <div className="flex items-end justify-between w-full text-[10px] tracking-[0.3em] text-white/40">
            <span>N°01 — COMMENCEMENT</span>
            <span className="hidden md:inline">→  CONTINUE</span>
            <span>SYRENA · MMXXVI</span>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          II. MARQUEE — kinetic ticker
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-10 border-y border-white/10 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 3 }).map((_, rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {marqueeItems.map((item, i) => (
                <span key={`${rep}-${i}`} className="flex items-center">
                  <span className="font-display italic text-4xl md:text-6xl text-white/80 px-10 whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-gold text-2xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          III. MANIFESTO — single large statement
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.4em] text-white/40">
                II. MANIFESTO
              </span>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ScrollReveal delay={120}>
              <p className="font-display italic font-light text-white leading-[1.15] text-3xl md:text-5xl lg:text-6xl">
                Chocolate is not a confection. It is a language —
                <span className="text-white/50"> a record of soil, of weather,
                of patient hands</span>, translated through fire and time.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={280}>
              <div className="mt-12 gold-line w-24" />
              <p className="mt-6 text-[11px] tracking-[0.3em] text-white/50">
                — A.G.  ·  FOUNDER & MAKER
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          IV. FEATURED EDITION — hero product
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-16 md:mb-24">
              <span className="text-[10px] tracking-[0.4em] text-white/40">
                III.  FEATURED EDITION
              </span>
              <span className="text-[10px] tracking-[0.3em] text-white/30">
                N°07 · SPRING
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Large number */}
            <ScrollReveal delay={150} className="col-span-12 md:col-span-2">
              <span className="block font-display font-light text-white/20 text-[180px] md:text-[240px] leading-none -ml-3">
                07
              </span>
            </ScrollReveal>

            {/* Product title block */}
            <div className="col-span-12 md:col-span-6">
              <ScrollReveal delay={240}>
                <p className="text-[10px] tracking-[0.4em] text-gold mb-4">
                  LIMITED  ·  48 EDITIONS
                </p>
                <h2 className="font-display italic font-light text-white leading-[0.95] text-6xl md:text-8xl">
                  Chuao,
                  <br />
                  Unsweetened
                </h2>
                <p className="mt-8 font-body text-base text-white/60 max-w-md leading-relaxed">
                  A bar made from a single harvest on Venezuela&rsquo;s
                  Chuao peninsula — fermented nine days, aged slowly, and
                  finished unsweetened so the fruit of the bean carries the
                  whole composition.
                </p>
              </ScrollReveal>
            </div>

            {/* Specs column */}
            <ScrollReveal delay={340} className="col-span-12 md:col-span-4">
              <div className="border-l border-white/15 pl-6 md:pl-10 font-mono text-[11px] tracking-[0.15em] text-white/50">
                <dl className="space-y-5">
                  <div className="flex justify-between">
                    <dt className="text-white/30">ORIGIN</dt>
                    <dd className="text-white/80 text-right">CHUAO · VE</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/30">HARVEST</dt>
                    <dd className="text-white/80 text-right">2025 · AUT.</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/30">FERMENT</dt>
                    <dd className="text-white/80 text-right">9 DAYS</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/30">CACAO</dt>
                    <dd className="text-white/80 text-right">100%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/30">EDITION</dt>
                    <dd className="text-white/80 text-right">48 BARS</dd>
                  </div>
                  <div className="flex justify-between pt-5 border-t border-white/10">
                    <dt className="text-white/30">PRICE</dt>
                    <dd className="text-gold text-right">$38</dd>
                  </div>
                </dl>

                <Link
                  href="/shop"
                  className="mt-10 block text-center text-[11px] tracking-[0.3em] py-4 border border-white/40 text-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  ACQUIRE
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          V. INDEX — asymmetric shop grid
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-16">
              <span className="text-[10px] tracking-[0.4em] text-white/40">
                IV.  THE INDEX
              </span>
              <Link
                href="/shop"
                className="text-[10px] tracking-[0.3em] text-white/60 hover:text-white transition-colors link-fancy"
              >
                SEE ALL → 32 ITEMS
              </Link>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <Link
                  href="/shop"
                  className="group grid grid-cols-12 gap-6 py-8 md:py-10 items-baseline hover:pl-3 transition-[padding] duration-500"
                >
                  <span className="col-span-1 font-mono text-[11px] tracking-[0.2em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-12 md:col-span-5 -mt-1">
                    <h3 className="font-display italic font-light text-white text-3xl md:text-5xl leading-[0.95] group-hover:text-gold transition-colors duration-500">
                      {p.name}
                    </h3>
                  </div>
                  <div className="col-span-6 md:col-span-3 text-[11px] tracking-[0.2em] font-mono text-white/50">
                    {p.origin}
                  </div>
                  <div className="col-span-3 md:col-span-2 text-[11px] tracking-[0.2em] font-mono text-white/50">
                    {p.percent}
                  </div>
                  <div className="col-span-3 md:col-span-1 text-right text-[13px] font-mono text-white group-hover:text-gold transition-colors duration-500">
                    {p.price}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          VI. JOURNAL — editorial magazine grid
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-16">
              <span className="text-[10px] tracking-[0.4em] text-white/40">
                V.  THE JOURNAL
              </span>
              <Link
                href="/articles"
                className="text-[10px] tracking-[0.3em] text-white/60 hover:text-white transition-colors link-fancy"
              >
                ALL ESSAYS →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-8 md:gap-10">
            {/* Feature article — spans wide */}
            <ScrollReveal delay={120} className="col-span-12 md:col-span-7">
              <Link href={`/articles/${articles[0].slug}`} className="group block">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-gold">
                    01 — FEATURE
                  </span>
                  <span className="flex-1 h-px bg-white/15" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
                    {articles[0].date}
                  </span>
                </div>
                <h3 className="font-display italic font-light text-white text-5xl md:text-7xl leading-[0.95] group-hover:text-gold transition-colors duration-500">
                  {articles[0].title}
                </h3>
                <p className="mt-6 text-white/60 leading-relaxed max-w-lg">
                  {articles[0].excerpt}
                </p>
                <span className="mt-6 inline-block text-[10px] tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
                  READ ESSAY  →
                </span>
              </Link>
            </ScrollReveal>

            {/* Secondary articles — narrow column */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-8 md:gap-10 md:pl-10 md:border-l md:border-white/10">
              {articles.slice(1).map((a, i) => (
                <ScrollReveal key={a.slug} delay={220 + i * 100}>
                  <ArticleCard {...a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          VII. COLOPHON — closing statement & contact
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-5">
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.4em] text-white/40">
                  VI.  COLOPHON
                </span>
                <h2 className="mt-6 font-display italic font-light text-white text-4xl md:text-6xl leading-[1.0]">
                  A correspondence,
                  <br />
                  not a transaction.
                </h2>
                <p className="mt-8 text-white/60 leading-relaxed max-w-sm">
                  Collaborations, press, and private commissions. Write to
                  us — we answer every letter.
                </p>
                <div className="mt-10 space-y-3 font-mono text-[11px] tracking-[0.2em] text-white/60">
                  <div className="flex gap-6">
                    <span className="text-white/30 w-20">STUDIO</span>
                    <span>Mokotowska 12 · Warszawa</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-white/30 w-20">CORRESP.</span>
                    <a href="mailto:hello@syrenachocolate.com" className="text-white hover:text-gold transition-colors">
                      hello@syrenachocolate.com
                    </a>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-white/30 w-20">INSTAGRAM</span>
                    <a href="#" className="text-white hover:text-gold transition-colors">@syrenachocolate</a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <ScrollReveal delay={200}>
                <form className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/40 mb-2">
                      01  ·  NAME
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/30 py-2 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/40 mb-2">
                      02  ·  CORRESPONDENCE
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-white/30 py-2 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/40 mb-2">
                      03  ·  MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b border-white/30 py-2 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 self-start text-[11px] tracking-[0.3em] text-white border border-white/40 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    SEND LETTER →
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════ */}
      <footer className="relative border-t border-white/10 px-6 md:px-12 py-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <h3 className="font-display italic font-light text-white text-2xl">Syrena</h3>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-white/40">
              A CHOCOLATE ATELIER · EST. MMXX
            </p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] text-white/30 mb-3">INDEX</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/articles" className="text-white/70 hover:text-gold transition-colors">Journal</Link>
              <Link href="/shop" className="text-white/70 hover:text-gold transition-colors">Shop</Link>
              <Link href="/about" className="text-white/70 hover:text-gold transition-colors">About</Link>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] text-white/30 mb-3">CORRESPONDENCE</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a href="mailto:hello@syrenachocolate.com" className="text-white/70 hover:text-gold transition-colors">hello@syrenachocolate.com</a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">Instagram</a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="text-[10px] tracking-[0.3em] text-white/30">
              © MMXXVI  ·  WARSZAWA
            </p>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-white/20">
              SITE BY SYRENA STUDIO
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
