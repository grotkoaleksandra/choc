import CollapsingHero from "@/components/CollapsingHero";
import HomeNav from "@/components/HomeNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const collection = [
  {
    id: "cherry-macadamia",
    name: "Cherry, Macadamia",
    origin: "House Edition",
    percent: "70%",
    weight: "70g",
    notes: "Sour cherry · macadamia · dark chocolate",
    price: "$26",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chuao-100",
    name: "Chuao",
    origin: "Chuao, Venezuela",
    percent: "100%",
    weight: "55g",
    notes: "Dried fig · cedar · roasted plum",
    price: "$38",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "piura-66",
    name: "Piura, Sea Salt",
    origin: "Piura, Perú",
    percent: "66%",
    weight: "60g",
    notes: "Brown butter · hazelnut · caramel",
    price: "$16",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "oaxaca-72",
    name: "Oaxaca Heirloom",
    origin: "Oaxaca, México",
    percent: "72%",
    weight: "60g",
    notes: "Mole spice · black cherry · tobacco",
    price: "$22",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tumbes-nibs",
    name: "Roasted Nibs",
    origin: "Tumbes, Perú",
    percent: "100%",
    weight: "80g",
    notes: "Toasted rye · coffee · bitter orange",
    price: "$12",
    image: "https://images.unsplash.com/photo-1542843137-8791a6904d14?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "haiti-70",
    name: "Pisa, Haïti",
    origin: "Pisa Valley, Haïti",
    percent: "70%",
    weight: "60g",
    notes: "Red berry · molasses · clove",
    price: "$20",
    image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "madagascar-68",
    name: "Sambirano",
    origin: "Sambirano, Madagascar",
    percent: "68%",
    weight: "60g",
    notes: "Raspberry · apricot · lemon peel",
    price: "$20",
    image: "https://images.unsplash.com/photo-1551529834-525807d6b4f3?auto=format&fit=crop&w=900&q=80",
  },
];

const secondArtistCollection = [
  {
    id: "artist-two-edition-one",
    name: "Edition One",
    origin: "Origin · placeholder",
    percent: "—",
    weight: "—",
    notes: "Tasting notes — placeholder",
    price: "$—",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "artist-two-edition-two",
    name: "Edition Two",
    origin: "Origin · placeholder",
    percent: "—",
    weight: "—",
    notes: "Tasting notes — placeholder",
    price: "$—",
    image: "https://images.unsplash.com/photo-1623256530849-95d6671d8a25?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "artist-two-edition-three",
    name: "Edition Three",
    origin: "Origin · placeholder",
    percent: "—",
    weight: "—",
    notes: "Tasting notes — placeholder",
    price: "$—",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80",
  },
];


export default function Home() {
  return (
    <main className="relative">
      <HomeNav />

      {/* I. HERO — video collapses completely on scroll */}
      <CollapsingHero />

      {/* I.b NEWSLETTER CTA — "Join us" button expands into a form */}
      <NewsletterCTA />

      {/* II. COLLECTION — expanded grid with e-comm affordances */}
      <section id="collection" className="relative py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow">Edition · May 2026</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[0.98] tracking-[-0.015em] text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontWeight: 400 }}
                >
                  This Month&rsquo;s <em className="italic">Edition</em>.
                </h3>
                <p className="mt-4 text-sm text-[color:var(--ink-muted)] max-w-md leading-[1.6]">
                  {collection.length} bars in this month&rsquo;s release —
                  single-origin cacao, each one limited to forty-eight.
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


      {/* V. JOURNAL TEASER — full-bleed video + single intro + CTA */}
      <section className="relative border-t border-[color:var(--rule)]/60">
        <div className="relative w-screen left-1/2 -translate-x-1/2 aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[color:var(--paper-deep)]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/choc/hero.mp4"
          />
        </div>

        <ScrollReveal className="max-w-[640px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
          <p className="eyebrow">The Journal</p>
          <p className="mt-6 text-base md:text-lg leading-[1.7] text-[color:var(--ink-muted)]">
            Two hundred and fifty years of cacao, shipwrecks, Grand Prix medals,
            and one very patient conche. Stories from the studio and the long
            history behind the bar.
          </p>
          <Link href="/articles" className="btn-basket mt-10 inline-flex max-w-xs">
            <span>Read the journal</span>
            <span>→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* VI. SECOND ARTIST COLLECTION — placeholder curation */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow">Guest Artist — Winter 2026</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[0.98] tracking-[-0.015em] text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontWeight: 400 }}
                >
                  Artist Name&rsquo;s <em className="italic">collection</em>.
                </h3>
                <p className="mt-4 text-sm text-[color:var(--ink-muted)] max-w-md leading-[1.6]">
                  A short placeholder description for the second artist&rsquo;s
                  curation — to be replaced.
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
            {secondArtistCollection.map((p, i) => (
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

      {/* VII. SECOND ARTIST — placeholder, full-bleed portrait + bio */}
      <section className="relative border-t border-[color:var(--rule)]/60">
        <div className="relative w-screen left-1/2 -translate-x-1/2 aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.4/1] overflow-hidden bg-[color:var(--paper-deep)]">
          <ScrollReveal className="absolute inset-0">
            <div className="img-wipe absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/choc/img-3.png"
                alt="Second artist — placeholder"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(30,22,16,0.55) 0%, rgba(30,22,16,0.08) 40%, rgba(30,22,16,0) 70%)",
                }}
              />
            </div>
          </ScrollReveal>

          <div className="absolute left-0 right-0 bottom-0 px-6 md:px-10 pb-10 md:pb-16">
            <div className="max-w-[1400px] mx-auto">
              <p className="eyebrow" style={{ color: "rgba(245,238,224,0.8)" }}>
                On the Artist — Placeholder, 2026
              </p>
              <h2
                className="font-display text-white mt-4 leading-[0.95] tracking-[-0.02em] text-5xl md:text-7xl lg:text-[8rem]"
                style={{ fontWeight: 400 }}
              >
                Artist <em className="italic">Name</em>.
              </h2>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow">Biography</p>
            <dl className="mt-8 space-y-5 text-sm">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Born</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Year, City
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Studied</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Institution — placeholder
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Lives</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  City, Country
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Medium</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Discipline — placeholder
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-[color:var(--ink-muted)] eyebrow">
                  Selected
                </dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Exhibitions · placeholder
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-base md:text-lg leading-[1.75] text-[color:var(--ink)] drop-cap">
              Placeholder biography. A few sentences introducing the second
              artist — their practice, their training, and the thread that runs
              through the work they&rsquo;ve made for Syrena.
            </p>
            <p className="mt-6 text-base leading-[1.7] text-[color:var(--ink-muted)]">
              A second paragraph on the collaboration itself — which bars were
              chosen, what was made for the edition, and how the pieces came
              together in the studio.
            </p>
            <p className="mt-6 text-base leading-[1.7] text-[color:var(--ink-muted)]">
              A closing note on the run — the edition size, whether it will be
              reprinted, and how the bars are being released.
            </p>

            <blockquote
              className="mt-10 font-display italic text-[color:var(--ink)] text-2xl md:text-3xl leading-[1.35] max-w-xl border-l border-[color:var(--cacao)] pl-6"
              style={{ fontWeight: 400 }}
            >
              &ldquo;A short pull quote from the artist — placeholder, to be
              replaced with a line from the interview.&rdquo;
            </blockquote>
            <p className="mt-3 eyebrow">— Artist Name, for Syrena Journal</p>
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
