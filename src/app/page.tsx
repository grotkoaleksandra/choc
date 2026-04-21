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
    id: "dark-72",
    name: "Chuao, Unsweetened",
    origin: "Chuao, Venezuela",
    percent: "100%",
    price: "$38",
    image: "/choc/img-1.png",
  },
  {
    id: "sea-salt-caramel",
    name: "Sea Salt & Caramel",
    origin: "Piura, Peru",
    percent: "66%",
    price: "$16",
    image: "/choc/img-2.png",
  },
  {
    id: "oaxaca-heirloom",
    name: "Heirloom Oaxaca",
    origin: "Oaxaca, México",
    percent: "72%",
    price: "$22",
    image: "/choc/img-3.png",
  },
  {
    id: "cacao-nibs",
    name: "Roasted Cacao Nibs",
    origin: "Tumbes Valley, Perú",
    percent: "100%",
    price: "$12",
    image: "/choc/img-4.png",
  },
];

export default function Home() {
  return (
    <main className="relative">
      <HomeNav />

      {/* I. HERO — video collapses completely on scroll */}
      <CollapsingHero />

      {/* II. MANIFESTO — a quiet opening chapter */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="eyebrow">Chapter One — What we believe</p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h2
              className="font-display text-[color:var(--ink)] mt-10 md:mt-14 leading-[1.02] tracking-[-0.015em] text-4xl md:text-6xl lg:text-7xl"
              style={{ fontWeight: 400, maxWidth: "22ch" }}
            >
              Chocolate is a record of soil, weather, and patient hands —
              <em className="italic text-[color:var(--ink-muted)]">
                {" "}
                translated through fire and time.
              </em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <div className="mt-14 md:mt-20 grid grid-cols-12 gap-8 md:gap-12 items-start">
              <p className="col-span-12 md:col-span-6 md:col-start-4 text-[color:var(--ink-muted)] text-base md:text-lg leading-[1.7]">
                We work with a small number of farms in Venezuela, Perú, and
                México — bean-to-bar, single-origin, in editions of forty-eight.
                Nothing is blended. Nothing is hurried. Each bar is a letter
                from one place, in one season, made by hand in Warszawa.
              </p>
              <p className="col-span-12 md:col-span-2 font-display italic text-[color:var(--ink-muted)] text-lg md:text-xl md:text-right">
                — A. Grotko
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* III. SEASON — one product as a cinematic spread */}
      <section className="relative py-20 md:py-28 px-6 md:px-10">
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
            <p className="eyebrow">This Season — Edition Nº 07</p>
            <h3
              className="font-display text-[color:var(--ink)] mt-6 leading-[0.98] tracking-[-0.015em] text-4xl md:text-6xl"
              style={{ fontWeight: 400 }}
            >
              Chuao,
              <br />
              <em className="italic">unsweetened</em>.
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
              <dt className="text-[color:var(--ink-muted)]">Edition</dt>
              <dd className="text-[color:var(--ink)]">48 bars</dd>
              <dt className="text-[color:var(--ink-muted)]">Price</dt>
              <dd className="text-[color:var(--ink)]">$38</dd>
            </dl>

            <Link
              href="/shop"
              className="mt-12 inline-block text-[color:var(--ink)] link-fancy text-sm"
            >
              Acquire →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* IV. COLLECTION — the curated grid */}
      <section className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow">Chapter Two</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[1.0] tracking-[-0.015em] text-4xl md:text-5xl"
                  style={{ fontWeight: 400 }}
                >
                  The Collection
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-[color:var(--ink)] link-fancy text-sm shrink-0"
              >
                See all →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {collection.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <Link href="/shop" className="card group block">
                  <div className="card-frame img-wipe aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-5">
                    <h4
                      className="font-display text-[color:var(--ink)] text-xl md:text-2xl leading-[1.1]"
                      style={{ fontWeight: 400 }}
                    >
                      {p.name}
                    </h4>
                    <p className="mt-2 text-[13px] text-[color:var(--ink-muted)]">
                      {p.origin} · {p.percent}
                    </p>
                    <p className="mt-3 text-[13px] text-[color:var(--ink)]">
                      {p.price}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* V. JOURNAL — editorial article spread */}
      <section className="relative py-24 md:py-36 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-14 md:mb-20">
              <div>
                <p className="eyebrow">Chapter Three</p>
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
            {/* Featured article */}
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

            {/* Sidebar articles */}
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

      {/* VI. CORRESPONDENCE */}
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
