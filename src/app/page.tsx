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
  { id: "dark-72", name: "Single Origin Dark", origin: "Chuao · Venezuela", percent: "72%", price: "$14", notes: "Plum, tobacco, red fruit" },
  { id: "sea-salt-caramel", name: "Sea Salt & Caramel", origin: "Piura · Peru", percent: "66%", price: "$16", notes: "Butter, salt bloom, honey" },
  { id: "cacao-nibs", name: "Roasted Cacao Nibs", origin: "Tumbes Valley", percent: "100%", price: "$12", notes: "Espresso, oak, bitter cherry" },
  { id: "drinking-choc", name: "Ceremonial Drinking", origin: "Oaxaca · México", percent: "Ceremonial", price: "$22", notes: "Chili, maize, copal smoke" },
];

export default function Home() {
  return (
    <main className="relative">
      <HomeNav />

      {/* I. HERO — full-screen video that collapses on scroll */}
      <CollapsingHero />

      {/* II. MANIFESTO — broken grid with ghost numeral & rotated marginalia */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        {/* Rotated edge label */}
        <div className="hidden md:block absolute left-4 top-40">
          <span className="vert-text label-brut">§ 01 — MANIFESTO / THESIS</span>
        </div>

        {/* Ghost numeral behind composition */}
        <div className="absolute right-[-4vw] top-10 pointer-events-none select-none">
          <span className="ghost-numeral">I</span>
        </div>

        <div className="relative max-w-[1500px] mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 md:col-start-2">
            <ScrollReveal>
              <p className="section-plaque">Chapter One — What it is</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p
                className="mt-10 text-[color:var(--bone)] leading-[0.96] tracking-[-0.025em] text-[11vw] md:text-[7.5vw]"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
                }}
              >
                Chocolate is
                <em className="italic text-[color:var(--gold)]"> not </em>
                a confection.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p
                className="mt-4 text-[color:var(--bone)]/55 leading-[1.02] tracking-[-0.02em] text-[8vw] md:text-[5vw]"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0',
                }}
              >
                It is a record of soil,
                <br />
                weather, and patient hands —
                <br />
                <em className="italic text-[color:var(--bone)]/85">translated through fire and time.</em>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={340}>
              <div className="mt-14 flex items-center gap-6">
                <span className="h-px w-20 bg-[color:var(--gold)]" />
                <p className="font-mono text-[10px] tracking-[0.38em] text-[color:var(--bone)]/60">
                  A. GROTKO — FOUNDER, CHIEF MAKER
                </p>
              </div>
              <p className="mt-3 ml-[104px] font-mono text-[10px] tracking-[0.2em] text-[color:var(--bone)]/30">
                signed & numbered ·  MMXXVI /  N°07
              </p>
            </ScrollReveal>
          </div>

          {/* Pull-annotation to the side */}
          <aside className="hidden md:block col-span-2 col-start-11 mt-48">
            <ScrollReveal delay={500}>
              <p className="label-brut-hot">↳ Note</p>
              <p className="mt-3 text-[11px] leading-[1.5] text-[color:var(--bone)]/55 font-mono tracking-wide">
                Every bar we make is a document. A year in Venezuela,
                a week in the conche, an hour in the temper.
              </p>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      {/* IV. PULL-QUOTE BREAK — massive running text */}
      <section className="relative border-y border-[color:var(--bone)]/10 py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <span className="label-brut">Intermission — Pull-Quote</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--bone)]/35">
                FF. 12 / 48
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="pull-brut text-[color:var(--bone)]">
              “Flavor
              <span className="text-[color:var(--gold)]"> is </span>
              geography. Everything else
              <span className="text-[color:var(--bone)]/35"> is an invoice</span>.”
            </p>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <div className="mt-8 flex items-baseline gap-4">
              <span className="crosshair text-[color:var(--gold)]" />
              <span className="font-mono text-[10px] tracking-[0.35em] text-[color:var(--bone)]/55">
                M. SZCZEPAŃSKI, CACAO BUYER  ·  LIMA  ·  2025
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* V. FEATURED EDITION — flipped to bone-spread, brutalist layout */}
      <section className="relative spread-bone bone-stripes py-28 md:py-36 overflow-hidden">
        {/* Rotated edge marginalia */}
        <div className="hidden md:block absolute right-6 top-32">
          <span className="vert-text-up font-mono text-[10px] tracking-[0.35em] text-[color:var(--ink)]/60">
            FLAGSHIP / LIMITED / 48 EDITIONS
          </span>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-10 md:mb-14">
              <span className="section-plaque" style={{ color: "var(--ink)" }}>
                § 02 — Featured Edition
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--ink)]/55">
                CAT. N°07  ·  CHUAO · VE
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
            {/* Oversize filled numeral */}
            <ScrollReveal className="col-span-12 md:col-span-5">
              <div
                className="leading-[0.76] tracking-[-0.06em] text-[color:var(--ink)]"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(10rem, 26vw, 30rem)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  fontStyle: "italic",
                }}
              >
                07
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[0.38em] text-[color:var(--ink)]/60">
                SPRING  ·  XLVIII EDITIONS  ·  48 / 48
              </p>
            </ScrollReveal>

            {/* Title + body */}
            <div className="col-span-12 md:col-span-4">
              <ScrollReveal delay={160}>
                <p className="font-mono text-[10px] tracking-[0.38em] text-[color:var(--blood)] mb-5">
                  LIMITED · UNSWEETENED
                </p>
                <h2
                  className="text-[color:var(--ink)] leading-[0.9] tracking-[-0.03em] text-6xl md:text-8xl"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontVariationSettings: '"opsz" 144, "SOFT" 20, "WONK" 1',
                  }}
                >
                  Chuao,
                  <br />
                  <em className="italic text-[color:var(--blood)]">unsweetened</em>.
                </h2>
                <p className="mt-8 text-[15px] text-[color:var(--ink)]/75 max-w-md leading-[1.6] font-bricolage">
                  A bar made from a single harvest on Venezuela&rsquo;s Chuao
                  peninsula — fermented nine days, aged slowly, and finished
                  unsweetened so the fruit of the bean carries the whole
                  composition.
                </p>
              </ScrollReveal>
            </div>

            {/* Spec block */}
            <ScrollReveal delay={280} className="col-span-12 md:col-span-3">
              <div className="border-t border-b border-[color:var(--ink)]/25 py-6">
                <dl className="space-y-4 spec-col" style={{ color: "var(--ink)" }}>
                  <div className="flex justify-between gap-6">
                    <dt style={{ color: "rgba(5,5,10,0.45)" }}>Origin</dt>
                    <dd style={{ color: "var(--ink)" }}>CHUAO · VE</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt style={{ color: "rgba(5,5,10,0.45)" }}>Harvest</dt>
                    <dd style={{ color: "var(--ink)" }}>2025 · AUT.</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt style={{ color: "rgba(5,5,10,0.45)" }}>Ferment</dt>
                    <dd style={{ color: "var(--ink)" }}>9 DAYS</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt style={{ color: "rgba(5,5,10,0.45)" }}>Cacao</dt>
                    <dd style={{ color: "var(--ink)" }}>100%</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt style={{ color: "rgba(5,5,10,0.45)" }}>Run</dt>
                    <dd style={{ color: "var(--ink)" }}>48 BARS</dd>
                  </div>
                  <div className="flex justify-between gap-6 pt-4 border-t border-[color:var(--ink)]/20">
                    <dt style={{ color: "rgba(5,5,10,0.45)" }}>Price</dt>
                    <dd style={{ color: "var(--blood)" }}>$38</dd>
                  </div>
                </dl>
              </div>

              <Link href="/shop" className="btn-hard-invert mt-6 w-full text-center block">
                Acquire →
              </Link>
            </ScrollReveal>
          </div>

          {/* Footnote row */}
          <div className="mt-20 grid grid-cols-12 gap-4 font-mono text-[10px] tracking-[0.22em] text-[color:var(--ink)]/55">
            <div className="col-span-6 md:col-span-3">↳ 01 — Dry-ferment nine days</div>
            <div className="col-span-6 md:col-span-3">↳ 02 — Conched cold, 72 hrs</div>
            <div className="col-span-6 md:col-span-3">↳ 03 — Tempered by hand</div>
            <div className="col-span-6 md:col-span-3">↳ 04 — Signed · numbered</div>
          </div>
        </div>
      </section>

      {/* VI. INDEX — editorial table-of-contents for the shop */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--bone)]/10 overflow-hidden">
        {/* Left vertical marginalia */}
        <div className="hidden md:block absolute left-4 top-40">
          <span className="vert-text label-brut">§ 03 — THE INDEX / SHOP</span>
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="grid grid-cols-12 items-end gap-4 mb-12">
              <div className="col-span-8">
                <span className="section-plaque">Contents — Four entries</span>
                <h3
                  className="mt-6 text-[color:var(--bone)] leading-[0.92] tracking-[-0.03em] text-6xl md:text-[8rem]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
                  }}
                >
                  Things
                  <em className="italic text-[color:var(--gold)]"> to taste</em>.
                </h3>
              </div>
              <div className="col-span-4 text-right">
                <Link href="/shop" className="btn-hard inline-block">
                  See all →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[color:var(--bone)]/25 font-mono text-[10px] tracking-[0.3em] text-[color:var(--bone)]/40">
            <div className="col-span-1">№</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-3">ORIGIN</div>
            <div className="col-span-2">TASTING</div>
            <div className="col-span-1 text-right">PRICE</div>
          </div>

          {/* Rows */}
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 90}>
              <Link
                href="/shop"
                className="group grid grid-cols-12 gap-4 py-8 md:py-10 items-baseline border-b border-[color:var(--bone)]/10 transition-colors duration-500"
              >
                <span className="col-span-1 index-figure text-[color:var(--bone)]/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-11 md:col-span-5 -mt-1">
                  <h3
                    className="text-[color:var(--bone)] text-3xl md:text-[3.5rem] leading-[0.95] tracking-[-0.025em] group-hover:text-[color:var(--gold)] transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
                    }}
                  >
                    {p.name}
                  </h3>
                  <span className="inline-block mt-3 font-mono text-[10px] tracking-[0.3em] text-[color:var(--bone)]/40 md:hidden">
                    {p.origin}
                  </span>
                </div>
                <div className="hidden md:block col-span-3 font-mono text-[11px] tracking-[0.22em] text-[color:var(--bone)]/60">
                  {p.origin}
                  <br />
                  <span className="text-[color:var(--gold)]">{p.percent}</span>
                </div>
                <div className="hidden md:block col-span-2 font-editorial italic text-[13px] text-[color:var(--bone)]/70"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}>
                  {p.notes}
                </div>
                <div className="col-span-12 md:col-span-1 text-left md:text-right">
                  <span className="font-mono text-[13px] text-[color:var(--bone)] group-hover:text-[color:var(--gold)] transition-colors duration-500">
                    {p.price}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-[color:var(--bone)]/40">
            <span>END OF INDEX</span>
            <span>04 / 04 ENTRIES</span>
          </div>
        </div>
      </section>

      {/* VII. JOURNAL — proper editorial three-column spread */}
      <section className="relative py-28 md:py-36 border-t border-[color:var(--bone)]/10 overflow-hidden">
        <div className="absolute right-4 top-40 hidden md:block">
          <span className="vert-text-up label-brut">§ 04 — THE JOURNAL</span>
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 items-end mb-12">
              <div className="col-span-12 md:col-span-9">
                <span className="section-plaque">Long-form — Filed under Craft</span>
                <h3
                  className="mt-6 text-[color:var(--bone)] leading-[0.92] tracking-[-0.03em] text-6xl md:text-[8rem]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
                  }}
                >
                  The
                  <em className="italic"> Journal</em>.
                </h3>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <Link href="/articles" className="btn-hard inline-block">
                  All essays →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <ScrollReveal delay={120} className="col-span-12 md:col-span-7">
              <Link href={`/articles/${articles[0].slug}`} className="group block">
                <div className="flex items-baseline gap-3 mb-5 font-mono text-[10px] tracking-[0.3em]">
                  <span className="text-[color:var(--gold)]">N°01 — FEATURE</span>
                  <span className="flex-1 h-px bg-[color:var(--bone)]/15" />
                  <span className="text-[color:var(--bone)]/50">{articles[0].date}</span>
                </div>
                <h3
                  className="text-[color:var(--bone)] text-5xl md:text-[5.5rem] leading-[0.9] tracking-[-0.03em] group-hover:text-[color:var(--gold)] transition-colors duration-500"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontVariationSettings: '"opsz" 144, "SOFT" 20, "WONK" 1',
                  }}
                >
                  The{" "}
                  <em className="italic text-[color:var(--gold)]">Bean-to-Bar</em>{" "}
                  revolution.
                </h3>
                <p className="mt-6 text-[color:var(--bone)]/70 leading-[1.65] max-w-lg font-bricolage text-[15px] drop-cap-editorial">
                  How a new generation of chocolate makers is changing
                  everything we thought we knew about flavor — about origin,
                  terroir, and the long, strange road from pod to palate.
                </p>
                <span className="mt-6 inline-block font-mono text-[10px] tracking-[0.38em] text-[color:var(--bone)]/55 group-hover:text-[color:var(--bone)] transition-colors">
                  READ ESSAY  →
                </span>
              </Link>
            </ScrollReveal>

            <div className="col-span-12 md:col-span-5 md:pl-10 md:border-l md:border-[color:var(--bone)]/10 flex flex-col gap-10">
              {articles.slice(1).map((a, i) => (
                <ScrollReveal key={a.slug} delay={220 + i * 100}>
                  <ArticleCard {...a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIII. TRANSMISSIONS — data-dense strip */}
      <section className="relative border-y border-[color:var(--bone)]/10 bg-black/20 py-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 gap-6 font-mono text-[10px] tracking-[0.22em] text-[color:var(--bone)]/60">
          <div>
            <p className="text-[color:var(--bone)]/35 mb-1">TRANSMISSION 01</p>
            <p className="text-[color:var(--bone)]">52.2297° N / 21.0122° E</p>
          </div>
          <div>
            <p className="text-[color:var(--bone)]/35 mb-1">TRANSMISSION 02</p>
            <p className="text-[color:var(--bone)]">ROASTER TEMP · 121°C</p>
          </div>
          <div>
            <p className="text-[color:var(--bone)]/35 mb-1">TRANSMISSION 03</p>
            <p className="text-[color:var(--bone)]">CONCHE · 72 HRS</p>
          </div>
          <div>
            <p className="text-[color:var(--bone)]/35 mb-1">TRANSMISSION 04</p>
            <p className="text-[color:var(--bone)]">YIELD · 48 / 48</p>
          </div>
          <div>
            <p className="text-[color:var(--bone)]/35 mb-1">TRANSMISSION 05</p>
            <p className="text-[color:var(--gold)]">FLAVOR — READY</p>
          </div>
        </div>
      </section>

      {/* IX. COLOPHON — correspondence form */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute left-4 top-36 hidden md:block">
          <span className="vert-text label-brut">§ 05 — COLOPHON / CORRESPONDENCE</span>
        </div>

        <div className="relative max-w-[1500px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-6">
              <ScrollReveal>
                <span className="section-plaque">Write us — we answer every letter</span>
                <h2
                  className="mt-8 text-[color:var(--bone)] leading-[0.9] tracking-[-0.03em] text-5xl md:text-[6.5rem]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
                  }}
                >
                  A
                  <em className="italic text-[color:var(--gold)]"> correspondence</em>,
                  <br />
                  not a transaction.
                </h2>
                <p className="mt-8 text-[color:var(--bone)]/70 leading-[1.65] max-w-sm font-bricolage">
                  Collaborations, press, private commissions — or simply to
                  argue about fermentation. We read, we reply, we keep
                  everything.
                </p>
                <div className="mt-12 space-y-4 font-mono text-[11px] tracking-[0.18em]">
                  <div className="flex gap-6">
                    <span className="text-[color:var(--bone)]/35 w-24">STUDIO</span>
                    <span className="text-[color:var(--bone)]">Mokotowska 12 · Warszawa</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-[color:var(--bone)]/35 w-24">WRITE</span>
                    <a
                      href="mailto:hello@syrenachocolate.com"
                      className="text-[color:var(--bone)] hover:text-[color:var(--gold)] transition-colors"
                    >
                      hello@syrenachocolate.com
                    </a>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-[color:var(--bone)]/35 w-24">INSTAGRAM</span>
                    <a
                      href="#"
                      className="text-[color:var(--bone)] hover:text-[color:var(--gold)] transition-colors"
                    >
                      @syrenachocolate
                    </a>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-[color:var(--bone)]/35 w-24">HOURS</span>
                    <span className="text-[color:var(--bone)]">TUE — SAT · 11-19</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-span-12 md:col-span-6 md:pl-8 md:border-l md:border-[color:var(--bone)]/15">
              <ScrollReveal delay={180}>
                <p className="label-brut mb-8">FORM — 01 / CORRESPONDENCE</p>
                <form className="flex flex-col gap-7">
                  <div>
                    <label className="block text-[10px] tracking-[0.35em] text-[color:var(--bone)]/45 mb-2 font-mono">
                      01  ·  NAME
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-[color:var(--bone)]/30 py-3 text-base text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/30 focus:outline-none focus:border-[color:var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.35em] text-[color:var(--bone)]/45 mb-2 font-mono">
                      02  ·  RETURN ADDRESS
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-[color:var(--bone)]/30 py-3 text-base text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/30 focus:outline-none focus:border-[color:var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.35em] text-[color:var(--bone)]/45 mb-2 font-mono">
                      03  ·  LETTER
                    </label>
                    <textarea
                      rows={5}
                      className="w-full bg-transparent border-b border-[color:var(--bone)]/30 py-3 text-base text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/30 focus:outline-none focus:border-[color:var(--gold)] transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-hard mt-4 self-start">
                    Send letter  →
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[color:var(--bone)]/10 px-6 md:px-12 py-12 bg-black/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-3">
              <span className="crosshair text-[color:var(--bone)]/80" />
              <h3
                className="text-[color:var(--bone)] text-3xl italic"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 1',
                }}
              >
                Syrena Chocolate
              </h3>
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.35em] text-[color:var(--bone)]/40">
              ATELIER · EST. MMXX · WARSZAWA
            </p>
            <p className="mt-6 text-[color:var(--bone)]/55 text-sm max-w-sm font-bricolage">
              A studio for fine chocolate. Slow craft, single-origin cacao,
              editions that refuse to repeat themselves.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="label-brut mb-4">INDEX</p>
            <div className="flex flex-col gap-2 text-sm font-mono">
              <Link href="/articles" className="text-[color:var(--bone)]/75 hover:text-[color:var(--gold)] transition-colors">Journal</Link>
              <Link href="/shop" className="text-[color:var(--bone)]/75 hover:text-[color:var(--gold)] transition-colors">Shop</Link>
              <Link href="/about" className="text-[color:var(--bone)]/75 hover:text-[color:var(--gold)] transition-colors">About</Link>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="label-brut mb-4">CORRESPONDENCE</p>
            <div className="flex flex-col gap-2 text-sm font-mono">
              <a href="mailto:hello@syrenachocolate.com" className="text-[color:var(--bone)]/75 hover:text-[color:var(--gold)] transition-colors">hello@syrenachocolate.com</a>
              <a href="#" className="text-[color:var(--bone)]/75 hover:text-[color:var(--gold)] transition-colors">Instagram — @syrenachocolate</a>
              <a href="#" className="text-[color:var(--bone)]/75 hover:text-[color:var(--gold)] transition-colors">Press kit</a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="label-brut mb-4">COLOPHON</p>
            <p className="font-mono text-[10px] tracking-[0.28em] text-[color:var(--bone)]/40 leading-[2]">
              SET IN FRAUNCES,
              <br />
              BRICOLAGE GROTESQUE,
              <br />
              INSTRUMENT SERIF &
              <br />
              JETBRAINS MONO.
            </p>
            <p className="mt-8 font-mono text-[10px] tracking-[0.32em] text-[color:var(--bone)]/35">
              © MMXXVI  ·  WARSZAWA
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
