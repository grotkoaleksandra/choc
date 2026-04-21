import ArticleCard from "@/components/ArticleCard";
import CollapsingHero from "@/components/CollapsingHero";
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
  "BEAN TO BAR",
  "ATELIER · WARSZAWA",
  "EDITION N°07",
  "LIMITED RUNS",
  "HANDCRAFTED",
  "SPRING MMXXVI",
];

export default function Home() {
  return (
    <main className="relative">
      <HomeNav />

      {/* I. HERO — full-screen video that collapses on scroll */}
      <CollapsingHero />

      {/* II. MARQUEE — kinetic ticker */}
      <section className="relative py-6 border-y border-white/10 overflow-hidden bg-black/20 backdrop-blur-sm">
        <div className="marquee-track">
          {Array.from({ length: 3 }).map((_, rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {marqueeItems.map((item, i) => (
                <span key={`${rep}-${i}`} className="flex items-center">
                  <span className="text-[11px] tracking-[0.4em] text-white/75 px-8 whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-gold text-xs">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* III. MANIFESTO */}
      <section className="relative py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.4em] text-white/45">
                I. MANIFESTO
              </span>
            </ScrollReveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <ScrollReveal delay={120}>
              <p
                className="font-display text-white leading-[1.1] tracking-[-0.015em] text-3xl md:text-5xl lg:text-[4rem]"
                style={{ fontWeight: 400 }}
              >
                Chocolate is not a confection.
                <span className="text-white/45"> It is a record of soil, weather, and patient hands </span>
                — translated through fire and time.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={280}>
              <div className="mt-12 gold-line w-24" />
              <p className="mt-6 text-[11px] tracking-[0.3em] text-white/50 font-mono">
                A.GROTKO  ·  FOUNDER
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* IV. FEATURED EDITION */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-16 md:mb-20">
              <span className="text-[10px] tracking-[0.4em] text-white/45">
                II.  FEATURED EDITION
              </span>
              <span className="text-[10px] tracking-[0.3em] text-white/35 font-mono">
                N°07 · SPRING
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-6 items-end">
            <ScrollReveal delay={150} className="col-span-12 md:col-span-2">
              <span
                className="block font-display text-white/15 leading-[0.8] -ml-2 text-[160px] md:text-[220px]"
                style={{ fontWeight: 400 }}
              >
                07
              </span>
            </ScrollReveal>

            <div className="col-span-12 md:col-span-6">
              <ScrollReveal delay={240}>
                <p className="text-[10px] tracking-[0.4em] text-gold mb-4 font-mono">
                  LIMITED  ·  48 EDITIONS
                </p>
                <h2
                  className="font-display text-white leading-[0.95] tracking-[-0.02em] text-6xl md:text-8xl"
                  style={{ fontWeight: 400 }}
                >
                  Chuao,
                  <br />
                  Unsweetened
                </h2>
                <p className="mt-8 text-base text-white/65 max-w-md leading-[1.6]">
                  A bar made from a single harvest on Venezuela&rsquo;s
                  Chuao peninsula — fermented nine days, aged slowly, and
                  finished unsweetened so the fruit of the bean carries the
                  whole composition.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={340} className="col-span-12 md:col-span-4">
              <div className="border-l border-white/15 pl-6 md:pl-10 font-mono text-[11px] tracking-[0.12em] text-white/55">
                <dl className="space-y-5">
                  <div className="flex justify-between">
                    <dt className="text-white/35">ORIGIN</dt>
                    <dd className="text-white/85 text-right">CHUAO · VE</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/35">HARVEST</dt>
                    <dd className="text-white/85 text-right">2025 · AUTUMN</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/35">FERMENT</dt>
                    <dd className="text-white/85 text-right">9 DAYS</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/35">CACAO</dt>
                    <dd className="text-white/85 text-right">100%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/35">EDITION</dt>
                    <dd className="text-white/85 text-right">48 BARS</dd>
                  </div>
                  <div className="flex justify-between pt-5 border-t border-white/10">
                    <dt className="text-white/35">PRICE</dt>
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

      {/* V. INDEX */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-12">
              <span className="text-[10px] tracking-[0.4em] text-white/45">
                III.  THE INDEX
              </span>
              <Link
                href="/shop"
                className="text-[10px] tracking-[0.3em] text-white/60 hover:text-white transition-colors link-fancy"
              >
                SEE ALL →
              </Link>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <Link
                  href="/shop"
                  className="group grid grid-cols-12 gap-6 py-7 md:py-9 items-baseline hover:pl-3 transition-[padding] duration-500"
                >
                  <span className="col-span-1 font-mono text-[11px] tracking-[0.2em] text-white/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-12 md:col-span-5 -mt-1">
                    <h3
                      className="font-display text-white text-3xl md:text-5xl leading-[1.0] tracking-[-0.015em] group-hover:text-gold transition-colors duration-500"
                      style={{ fontWeight: 400 }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <div className="col-span-6 md:col-span-3 text-[11px] tracking-[0.2em] font-mono text-white/55">
                    {p.origin}
                  </div>
                  <div className="col-span-3 md:col-span-2 text-[11px] tracking-[0.2em] font-mono text-white/55">
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

      {/* VI. JOURNAL */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-12">
              <span className="text-[10px] tracking-[0.4em] text-white/45">
                IV.  THE JOURNAL
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
            <ScrollReveal delay={120} className="col-span-12 md:col-span-7">
              <Link href={`/articles/${articles[0].slug}`} className="group block">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-gold">
                    01 — FEATURE
                  </span>
                  <span className="flex-1 h-px bg-white/15" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/45">
                    {articles[0].date}
                  </span>
                </div>
                <h3
                  className="font-display text-white text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] group-hover:text-gold transition-colors duration-500"
                  style={{ fontWeight: 400 }}
                >
                  {articles[0].title}
                </h3>
                <p className="mt-6 text-white/65 leading-[1.6] max-w-lg">
                  {articles[0].excerpt}
                </p>
                <span className="mt-6 inline-block text-[10px] tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
                  READ ESSAY  →
                </span>
              </Link>
            </ScrollReveal>

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

      {/* VII. COLOPHON */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-5">
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.4em] text-white/45">
                  V.  COLOPHON
                </span>
                <h2
                  className="mt-6 font-display text-white text-4xl md:text-6xl leading-[1.0] tracking-[-0.02em]"
                  style={{ fontWeight: 400 }}
                >
                  A correspondence,
                  <br />
                  not a transaction.
                </h2>
                <p className="mt-8 text-white/65 leading-[1.6] max-w-sm">
                  Collaborations, press, and private commissions. Write to
                  us — we answer every letter.
                </p>
                <div className="mt-10 space-y-3 font-mono text-[11px] tracking-[0.15em] text-white/65">
                  <div className="flex gap-6">
                    <span className="text-white/35 w-20">STUDIO</span>
                    <span>Mokotowska 12 · Warszawa</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-white/35 w-20">WRITE</span>
                    <a href="mailto:hello@syrenachocolate.com" className="text-white hover:text-gold transition-colors">
                      hello@syrenachocolate.com
                    </a>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-white/35 w-20">INSTAGRAM</span>
                    <a href="#" className="text-white hover:text-gold transition-colors">@syrenachocolate</a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <ScrollReveal delay={200}>
                <form className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/45 mb-2 font-mono">
                      01  ·  NAME
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/30 py-2 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/45 mb-2 font-mono">
                      02  ·  CORRESPONDENCE
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-white/30 py-2 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/45 mb-2 font-mono">
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

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 px-6 md:px-12 py-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-4">
            <h3 className="font-display text-white text-2xl" style={{ fontWeight: 400 }}>
              Syrena Chocolate
            </h3>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-white/40 font-mono">
              ATELIER · EST. MMXX
            </p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="text-[10px] tracking-[0.3em] text-white/35 mb-3 font-mono">INDEX</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/articles" className="text-white/75 hover:text-gold transition-colors">Journal</Link>
              <Link href="/shop" className="text-white/75 hover:text-gold transition-colors">Shop</Link>
              <Link href="/about" className="text-white/75 hover:text-gold transition-colors">About</Link>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] text-white/35 mb-3 font-mono">CORRESPONDENCE</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a href="mailto:hello@syrenachocolate.com" className="text-white/75 hover:text-gold transition-colors">hello@syrenachocolate.com</a>
              <a href="#" className="text-white/75 hover:text-gold transition-colors">Instagram</a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="text-[10px] tracking-[0.3em] text-white/35 font-mono">
              © MMXXVI  ·  WARSZAWA
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
