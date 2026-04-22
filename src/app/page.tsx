import CollapsingHero from "@/components/CollapsingHero";
import HomeNav from "@/components/HomeNav";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const articles = [
  {
    slug: "bean-to-bar-revolution",
    title: "The Bean-to-Bar Revolution",
    excerpt:
      "How a new generation of chocolate makers is changing everything we know about flavor.",
    category: "Craft",
    date: "February 2026",
    image: "/choc/img-2.png",
  },
  {
    slug: "chocolate-and-terroir",
    title: "Chocolate & Terroir",
    excerpt:
      "Why the same cacao bean tastes different depending on where it grows.",
    category: "Science",
    date: "February 2026",
    image: "/choc/img-3.png",
  },
  {
    slug: "the-art-of-tempering",
    title: "The Art of Tempering",
    excerpt: "The alchemy behind that perfect snap and glossy sheen.",
    category: "Technique",
    date: "January 2026",
    image: "/choc/img-4.png",
  },
];

const collection = [
  {
    id: "chuao-100",
    name: "Chuao",
    origin: "Chuao, Venezuela",
    percent: "100%",
    weight: "55g",
    notes: "Dried fig · cedar · roasted plum",
    price: "$38",
    image: "/choc/img-1.png",
  },
  {
    id: "piura-66",
    name: "Piura, Sea Salt",
    origin: "Piura, Perú",
    percent: "66%",
    weight: "60g",
    notes: "Brown butter · hazelnut · caramel",
    price: "$16",
    image: "/choc/img-2.png",
  },
  {
    id: "oaxaca-72",
    name: "Oaxaca Heirloom",
    origin: "Oaxaca, México",
    percent: "72%",
    weight: "60g",
    notes: "Mole spice · black cherry · tobacco",
    price: "$22",
    image: "/choc/img-3.png",
  },
  {
    id: "tumbes-nibs",
    name: "Roasted Nibs",
    origin: "Tumbes, Perú",
    percent: "100%",
    weight: "80g",
    notes: "Toasted rye · coffee · bitter orange",
    price: "$12",
    image: "/choc/img-4.png",
  },
  {
    id: "haiti-70",
    name: "Pisa, Haïti",
    origin: "Pisa Valley, Haïti",
    percent: "70%",
    weight: "60g",
    notes: "Red berry · molasses · clove",
    price: "$20",
    image: "/choc/img-5.png",
  },
  {
    id: "madagascar-68",
    name: "Sambirano",
    origin: "Sambirano, Madagascar",
    percent: "68%",
    weight: "60g",
    notes: "Raspberry · apricot · lemon peel",
    price: "$20",
    image: "/choc/img-2.png",
  },
];

const artistSeries = [
  {
    id: "series-01",
    number: "Nº 01",
    artist: "Marta Kowalska",
    medium: "Printmaker · Kraków",
    pairing: "66% Piura · sea salt",
    edition: "Ed. 48",
    price: "$24",
    image: "/choc/img-2.png",
  },
  {
    id: "series-02",
    number: "Nº 02",
    artist: "Ines Baumgart",
    medium: "Ceramicist · Berlin",
    pairing: "72% Oaxaca Heirloom",
    edition: "Ed. 48",
    price: "$28",
    image: "/choc/img-3.png",
  },
  {
    id: "series-03",
    number: "Nº 03",
    artist: "Jakub Nowak",
    medium: "Illustrator · Warszawa",
    pairing: "100% Chuao nibs",
    edition: "Ed. 48",
    price: "$22",
    image: "/choc/img-4.png",
  },
];

export default function Home() {
  return (
    <main className="relative">
      <HomeNav />

      {/* I. HERO — video collapses completely on scroll */}
      <CollapsingHero />

      {/* II. SEASON — one product as a cinematic spread */}
      <section className="relative py-20 md:py-28 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10 md:gap-16 items-end">
          <ScrollReveal delay={40} className="col-span-12 md:col-span-7">
            <div className="card-frame img-wipe aspect-[4/5] md:aspect-[4/5] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/choc/img-1.png"
                alt="Chuao, Unsweetened"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160} className="col-span-12 md:col-span-5 md:pb-8">
            <p className="eyebrow">Edition Nº 07 · Chuao, Venezuela</p>
            <h3
              className="font-display text-[color:var(--ink)] mt-6 leading-[0.98] tracking-[-0.015em] text-4xl md:text-6xl"
              style={{ fontWeight: 400 }}
            >
              This month&rsquo;s
              <br />
              <em className="italic">chocolate</em>.
            </h3>
            <p className="mt-6 text-[color:var(--ink-muted)] leading-[1.7] max-w-md">
              A bar made from a single harvest on Venezuela&rsquo;s Chuao
              peninsula — fermented nine days, aged slowly, and finished
              unsweetened so the fruit of the bean carries the whole
              composition.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-y-4 gap-x-8 text-sm max-w-sm">
              <dt className="text-[color:var(--ink-muted)]">Origin</dt>
              <dd className="text-[color:var(--ink)]">Chuao, Venezuela</dd>
              <dt className="text-[color:var(--ink-muted)]">Harvest</dt>
              <dd className="text-[color:var(--ink)]">Autumn 2025</dd>
              <dt className="text-[color:var(--ink-muted)]">Ferment</dt>
              <dd className="text-[color:var(--ink)]">Nine days</dd>
              <dt className="text-[color:var(--ink-muted)]">Weight</dt>
              <dd className="text-[color:var(--ink)]">55g</dd>
              <dt className="text-[color:var(--ink-muted)]">Edition</dt>
              <dd className="text-[color:var(--ink)]">48 bars</dd>
              <dt className="text-[color:var(--ink-muted)]">Tasting</dt>
              <dd className="text-[color:var(--ink)]">
                Dried fig · cedar · roasted plum
              </dd>
            </dl>

            <div className="mt-10 flex items-center justify-between max-w-sm">
              <span className="font-display text-[color:var(--ink)] text-3xl">
                $38
              </span>
              <span className="eyebrow">Ships Monday</span>
            </div>

            <button className="btn-basket mt-6 max-w-sm">
              <span>Add to basket</span>
              <span>→</span>
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* IV. COLLECTION — expanded grid with e-comm affordances */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow">Chapter Two — The Bars</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[1.0] tracking-[-0.015em] text-4xl md:text-5xl"
                  style={{ fontWeight: 400 }}
                >
                  The Collection
                </h3>
                <p className="mt-4 text-sm text-[color:var(--ink-muted)] max-w-md leading-[1.6]">
                  {collection.length} bars in current rotation. Each is a single
                  origin, in an edition of forty-eight.
                </p>
              </div>
              <Link
                href="/shop"
                className="text-[color:var(--ink)] link-fancy text-sm shrink-0"
              >
                See all →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20">
            {collection.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <div className="card group flex flex-col h-full">
                  <Link href="/shop" className="block">
                    <div className="card-frame img-wipe aspect-[4/5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="mt-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href="/shop" className="block">
                          <h4
                            className="font-display text-[color:var(--ink)] text-2xl md:text-3xl leading-[1.05]"
                            style={{ fontWeight: 400 }}
                          >
                            {p.name}
                          </h4>
                        </Link>
                        <p className="mt-2 text-[13px] text-[color:var(--ink-muted)]">
                          <span className="percent-dot" />
                          {p.origin} · {p.percent} · {p.weight}
                        </p>
                      </div>
                      <span className="price-tag shrink-0 mt-1">{p.price}</span>
                    </div>

                    <p className="mt-4 text-sm text-[color:var(--ink-muted)] leading-[1.55] italic font-display">
                      {p.notes}
                    </p>

                    <button className="btn-basket mt-6">
                      <span>Add to basket</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* IV. THIS MONTH'S ARTIST — the maker, portrait & voice */}
      <section className="relative py-24 md:py-36 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10 md:gap-16 items-end">
          <ScrollReveal className="col-span-12 md:col-span-6">
            <div className="card-frame img-wipe aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/miguel.jpeg"
                alt="Aleksandra Grotko in the studio"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 eyebrow">Warszawa, 2026 — photo by M. Karnow</p>
          </ScrollReveal>

          <ScrollReveal delay={160} className="col-span-12 md:col-span-6 md:pb-10">
            <p className="eyebrow">This month&rsquo;s artist</p>
            <h2
              className="font-display text-[color:var(--ink)] mt-8 leading-[0.95] tracking-[-0.02em] text-5xl md:text-7xl lg:text-[7.5rem]"
              style={{ fontWeight: 400 }}
            >
              Aleksandra
              <br />
              <em className="italic">Grotko</em>.
            </h2>
            <p className="mt-5 text-[color:var(--ink-muted)] text-sm tracking-[0.15em] uppercase font-mono">
              Chocolatier · Painter · b. 1988, Kraków
            </p>

            <p className="mt-10 text-base md:text-lg leading-[1.7] text-[color:var(--ink-muted)] max-w-xl drop-cap">
              Trained as a painter in Kraków before turning, quietly, to cacao
              in 2020. Her bars are each a composition — one farm, one harvest,
              a long ferment, and a refusal to hurry. She works alone, in
              editions of forty-eight, from a small studio on Mokotowska street.
            </p>

            <blockquote
              className="mt-12 font-display italic text-[color:var(--ink)] text-2xl md:text-3xl leading-[1.35] max-w-xl border-l border-[color:var(--cacao)] pl-6"
              style={{ fontWeight: 400 }}
            >
              &ldquo;A bar is a record — of a farm, a season, a morning at the
              conche. I try not to leave fingerprints on it.&rdquo;
            </blockquote>
            <p className="mt-4 eyebrow">— A. Grotko, for Syrena Journal</p>

            <div className="mt-12 flex items-center gap-8">
              <Link href="/about" className="link-fancy text-sm">
                Read the full interview →
              </Link>
              <span className="text-[color:var(--rule)]">·</span>
              <Link href="/articles" className="link-fancy text-sm">
                Studio notes
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* V. ARTIST SERIES — limited collaborations, Casa Bosques style */}
      <section className="relative py-24 md:py-36 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-8 items-end mb-14 md:mb-20">
              <div className="col-span-12 md:col-span-7">
                <p className="eyebrow">Chapter Three — Limited</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[0.98] tracking-[-0.015em] text-4xl md:text-6xl lg:text-7xl"
                  style={{ fontWeight: 400 }}
                >
                  Artist <em className="italic">Series</em>.
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <p className="text-[color:var(--ink-muted)] leading-[1.7] text-base md:text-lg">
                  Each year, three artists wrap three bars. Original works,
                  printed in editions of forty-eight — numbered, signed, then
                  gone.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14 md:gap-x-12">
            {artistSeries.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 100}>
                <div className="card group flex flex-col h-full">
                  <Link href="/shop" className="block">
                    <div className="card-frame img-wipe aspect-[3/4]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={`${s.artist} for Syrena`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 z-10 eyebrow text-[color:var(--paper)] mix-blend-difference">
                        {s.number}
                      </div>
                    </div>
                  </Link>

                  <div className="mt-6 flex-1 flex flex-col">
                    <p className="eyebrow">{s.edition}</p>
                    <h4
                      className="font-display text-[color:var(--ink)] mt-3 text-3xl md:text-4xl leading-[1.05]"
                      style={{ fontWeight: 400 }}
                    >
                      {s.artist}
                    </h4>
                    <p className="mt-2 text-[13px] text-[color:var(--ink-muted)]">
                      {s.medium}
                    </p>
                    <p className="mt-5 text-sm text-[color:var(--ink)] font-display italic">
                      Wraps {s.pairing}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="price-tag">{s.price}</span>
                      <span className="eyebrow">Low stock</span>
                    </div>

                    <button className="btn-basket mt-5">
                      <span>Reserve</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={240}>
            <div className="mt-16 md:mt-24 flex items-center justify-between gap-6 pt-8 border-t border-[color:var(--rule)]/60">
              <p className="text-sm text-[color:var(--ink-muted)] max-w-md leading-[1.6]">
                Proposals from artists are open each January. Write to the
                studio.
              </p>
              <Link href="/about" className="link-fancy text-sm shrink-0">
                Apply to collaborate →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VI. JOURNAL — editorial article spread */}
      <section className="relative py-24 md:py-36 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-14 md:mb-20">
              <div>
                <p className="eyebrow">Chapter Four</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[1.0] tracking-[-0.015em] text-4xl md:text-5xl"
                  style={{ fontWeight: 400 }}
                >
                  From the Journal
                </h3>
              </div>
              <Link
                href="/articles"
                className="text-[color:var(--ink)] link-fancy text-sm shrink-0"
              >
                All essays →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-10 md:gap-14">
            <ScrollReveal delay={120} className="col-span-12 md:col-span-7">
              <Link
                href={`/articles/${articles[0].slug}`}
                className="card group block"
              >
                <div className="card-frame img-wipe aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6">
                  <p className="eyebrow">
                    {articles[0].category} · {articles[0].date}
                  </p>
                  <h4
                    className="font-display text-[color:var(--ink)] mt-3 text-3xl md:text-5xl leading-[1.05] tracking-[-0.015em]"
                    style={{ fontWeight: 400 }}
                  >
                    {articles[0].title}
                  </h4>
                  <p className="mt-5 text-[color:var(--ink-muted)] leading-[1.65] max-w-xl">
                    {articles[0].excerpt}
                  </p>
                  <span className="mt-6 inline-block link-fancy text-sm">
                    Read essay →
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <div className="col-span-12 md:col-span-5 flex flex-col gap-10 md:gap-12 md:pt-4">
              {articles.slice(1).map((a, i) => (
                <ScrollReveal key={a.slug} delay={220 + i * 120}>
                  <Link href={`/articles/${a.slug}`} className="card group block">
                    <div className="grid grid-cols-12 gap-5 items-start">
                      <div className="col-span-5">
                        <div className="card-frame img-wipe aspect-[4/5]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={a.image}
                            alt={a.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="col-span-7">
                        <p className="eyebrow">
                          {a.category} · {a.date}
                        </p>
                        <h4
                          className="font-display text-[color:var(--ink)] mt-3 text-xl md:text-2xl leading-[1.15] tracking-[-0.01em]"
                          style={{ fontWeight: 400 }}
                        >
                          {a.title}
                        </h4>
                        <p className="mt-3 text-sm text-[color:var(--ink-muted)] leading-[1.6]">
                          {a.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VII. CORRESPONDENCE */}
      <section className="relative py-24 md:py-36 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <ScrollReveal>
              <p className="eyebrow">Correspondence</p>
              <h2
                className="font-display text-[color:var(--ink)] mt-6 leading-[1.02] tracking-[-0.015em] text-4xl md:text-6xl"
                style={{ fontWeight: 400 }}
              >
                Write to us — we answer every letter.
              </h2>
              <p className="mt-8 text-[color:var(--ink-muted)] leading-[1.7] max-w-sm">
                Collaborations, press, and private commissions. The studio
                is open Tuesday through Saturday, by appointment.
              </p>
              <dl className="mt-12 space-y-4 text-sm">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-[color:var(--ink-muted)]">Studio</dt>
                  <dd className="col-span-2 text-[color:var(--ink)]">
                    Mokotowska 12
                    <br />
                    Warszawa, Polska
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-[color:var(--ink-muted)]">Email</dt>
                  <dd className="col-span-2">
                    <a
                      href="mailto:hello@syrenachocolate.com"
                      className="link-fancy"
                    >
                      hello@syrenachocolate.com
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-[color:var(--ink-muted)]">Instagram</dt>
                  <dd className="col-span-2">
                    <a href="#" className="link-fancy">
                      @syrenachocolate
                    </a>
                  </dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <ScrollReveal delay={160}>
              <form className="flex flex-col gap-8">
                <div>
                  <label className="eyebrow block mb-3">Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
                  />
                </div>
                <div>
                  <label className="eyebrow block mb-3">Email</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
                  />
                </div>
                <div>
                  <label className="eyebrow block mb-3">Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-transparent border-b border-[color:var(--rule)] py-2 text-base text-[color:var(--ink)] focus:outline-none focus:border-[color:var(--ink)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 self-start text-sm text-[color:var(--ink)] link-fancy"
                >
                  Send letter →
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 md:px-10 pt-16 pb-12 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-5">
            <h3
              className="font-display text-[color:var(--ink)] text-3xl"
              style={{ fontWeight: 400 }}
            >
              Syrena Chocolate
            </h3>
            <p className="mt-3 text-sm text-[color:var(--ink-muted)] max-w-sm leading-[1.6]">
              A studio for fine chocolate. Single-origin cacao, small editions,
              and the patience it takes.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow mb-4">Visit</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/articles" className="link-fancy">
                Journal
              </Link>
              <Link href="/shop" className="link-fancy">
                Shop
              </Link>
              <Link href="/about" className="link-fancy">
                About
              </Link>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow mb-4">Correspond</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href="mailto:hello@syrenachocolate.com"
                className="link-fancy"
              >
                hello@syrenachocolate.com
              </a>
              <a href="#" className="link-fancy">
                Instagram
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-2 md:text-right">
            <p className="text-xs text-[color:var(--ink-muted)] tracking-wide">
              © 2026 · Warszawa
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
