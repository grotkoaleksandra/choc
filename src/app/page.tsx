import CollapsingHero from "@/components/CollapsingHero";
import HomeNav from "@/components/HomeNav";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

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

const inesCollection = [
  {
    id: "ines-tile-set",
    name: "Porcelain Tasting Set",
    origin: "Berlin · cast by hand",
    percent: "4 tiles",
    weight: "Ø 9cm each",
    notes: "Unglazed porcelain · paired to the six origins",
    price: "$120",
    image: "/choc/img-3.png",
  },
  {
    id: "ines-oaxaca-72",
    name: "Oaxaca, wrapped",
    origin: "Oaxaca, México",
    percent: "72%",
    weight: "60g",
    notes: "Mole spice · black cherry · tobacco",
    price: "$28",
    image: "/choc/img-2.png",
  },
  {
    id: "ines-piura-66",
    name: "Piura, Salt-Fired",
    origin: "Piura, Perú",
    percent: "66%",
    weight: "60g",
    notes: "Brown butter · hazelnut · caramel",
    price: "$22",
    image: "/choc/img-4.png",
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

      {/* II. COLLECTION — expanded grid with e-comm affordances */}
      <section id="collection" className="relative py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow">Guest Curator — Autumn 2026</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[0.98] tracking-[-0.015em] text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontWeight: 400 }}
                >
                  Jakub Gliński&rsquo;s <em className="italic">collection</em>.
                </h3>
                <p className="mt-4 text-sm text-[color:var(--ink-muted)] max-w-md leading-[1.6]">
                  {collection.length} bars chosen by the painter, each one a
                  ground for his drawings. Editions of forty-eight.
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

      {/* IV. JAKUB GLIŃSKI — full-bleed landscape portrait + bio */}
      <section className="relative border-t border-[color:var(--rule)]/60">
        <div className="relative w-screen left-1/2 -translate-x-1/2 aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.4/1] overflow-hidden bg-[color:var(--paper-deep)]">
          <ScrollReveal className="absolute inset-0">
            <div className="img-wipe absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/miguel.jpeg"
                alt="Jakub Gliński in his Warszawa studio"
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
                On the Painter — Warszawa, 2026
              </p>
              <h2
                className="font-display text-white mt-4 leading-[0.95] tracking-[-0.02em] text-5xl md:text-7xl lg:text-[8rem]"
                style={{ fontWeight: 400 }}
              >
                Jakub <em className="italic">Gliński</em>.
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
                  1984, Warszawa
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Studied</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Academy of Fine Arts, Warszawa
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Lives</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Praga-Północ, Warszawa
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Medium</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Painting, wall drawing, printed editions
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-[color:var(--ink-muted)] eyebrow">
                  Selected
                </dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Zachęta · Raster · BWA Warszawa
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-base md:text-lg leading-[1.75] text-[color:var(--ink)] drop-cap">
              Jakub Gliński works in the slipstream between painting and
              drawing — panels that feel like fragments of a larger room, thin
              washes of pigment built up until they hold a body of light.
              Trained at the Academy of Fine Arts in Warszawa, he has shown at
              Zachęta, Raster, and BWA, and his work is carried by several
              private collections in Central Europe.
            </p>
            <p className="mt-6 text-base leading-[1.7] text-[color:var(--ink-muted)]">
              This autumn he turned his hand to chocolate. Six of Syrena&rsquo;s
              bars wear his drawings — each wrapper a small original, numbered
              and signed, printed in a run of forty-eight. He chose the bars
              himself, after a morning of tasting in the studio and the
              afternoon reading in the garden.
            </p>
            <p className="mt-6 text-base leading-[1.7] text-[color:var(--ink-muted)]">
              When the edition sells through, the wrappers will only exist on
              the bars that have already gone out. No reprints, no seconds.
            </p>

            <blockquote
              className="mt-10 font-display italic text-[color:var(--ink)] text-2xl md:text-3xl leading-[1.35] max-w-xl border-l border-[color:var(--cacao)] pl-6"
              style={{ fontWeight: 400 }}
            >
              &ldquo;Chocolate is a surface I hadn&rsquo;t painted yet. I like
              that it melts — nothing stays on the object forever.&rdquo;
            </blockquote>
            <p className="mt-3 eyebrow">— Jakub Gliński, for Syrena Journal</p>
          </div>
        </div>
      </section>

      {/* V. VIDEO — a short film */}
      <section className="relative py-20 md:py-28 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10 md:gap-16 items-end">
          <ScrollReveal className="col-span-12 md:col-span-8">
            <div className="card-frame img-wipe aspect-[16/9] relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/choc/hero.mp4"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160} className="col-span-12 md:col-span-4 md:pb-8">
            <p className="eyebrow">A Short Film — In the Studio</p>
            <h3
              className="font-display text-[color:var(--ink)] mt-5 leading-[1.0] tracking-[-0.015em] text-4xl md:text-5xl"
              style={{ fontWeight: 400 }}
            >
              The <em className="italic">making</em>.
            </h3>
            <p className="mt-6 text-[color:var(--ink-muted)] leading-[1.7]">
              Three minutes inside the workshop on Mokotowska — the bean, the
              stone wheel, the long conche, and the wrapping, folded by hand.
            </p>
            <p className="mt-8 text-sm text-[color:var(--ink-muted)] leading-[1.6]">
              Filmed over two mornings in February. A collaboration with
              cinematographer Ewa Malinowska.
            </p>
            <p className="mt-6 eyebrow">2 min 48 sec · Shot on 16mm</p>
          </ScrollReveal>
        </div>
      </section>

      {/* VI. INES COLLECTION — her curation */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--rule)]/60">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="eyebrow">Guest Ceramicist — Winter 2026</p>
                <h3
                  className="font-display text-[color:var(--ink)] mt-4 leading-[0.98] tracking-[-0.015em] text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontWeight: 400 }}
                >
                  Ines Baumgart&rsquo;s <em className="italic">collection</em>.
                </h3>
                <p className="mt-4 text-sm text-[color:var(--ink-muted)] max-w-md leading-[1.6]">
                  A porcelain tasting set and two bars she wrapped by hand,
                  pressed from plates thrown for the edition.
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
            {inesCollection.map((p, i) => (
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

      {/* VII. INES BAUMGART — second artist, full-bleed portrait + bio */}
      <section className="relative border-t border-[color:var(--rule)]/60">
        <div className="relative w-screen left-1/2 -translate-x-1/2 aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.4/1] overflow-hidden bg-[color:var(--paper-deep)]">
          <ScrollReveal className="absolute inset-0">
            <div className="img-wipe absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/choc/img-3.png"
                alt="Ines Baumgart in her Berlin studio"
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
                On the Ceramicist — Berlin, 2026
              </p>
              <h2
                className="font-display text-white mt-4 leading-[0.95] tracking-[-0.02em] text-5xl md:text-7xl lg:text-[8rem]"
                style={{ fontWeight: 400 }}
              >
                Ines <em className="italic">Baumgart</em>.
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
                  1979, Leipzig
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Studied</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Burg Giebichenstein, Halle
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Lives</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Wedding, Berlin
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[color:var(--rule)]/60">
                <dt className="text-[color:var(--ink-muted)] eyebrow">Medium</dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Porcelain, stoneware, unglazed editions
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-[color:var(--ink-muted)] eyebrow">
                  Selected
                </dt>
                <dd className="col-span-2 text-[color:var(--ink)]">
                  Koenig Galerie · Salon 94 · GEO Grafic
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-base md:text-lg leading-[1.75] text-[color:var(--ink)] drop-cap">
              Ines Baumgart throws vessels that feel remembered rather than
              made — tall-necked jugs, low bowls, small unglazed dishes that
              hold the memory of the hand. She studied at Burg Giebichenstein
              in Halle and has kept a studio in Wedding since 2011. Her work
              moves between museum commissions and one-off domestic pieces.
            </p>
            <p className="mt-6 text-base leading-[1.7] text-[color:var(--ink-muted)]">
              For Syrena she has cast a set of porcelain tasting tiles — one
              for each origin in the collection — and designed the wrapper
              for the 72% Oaxaca Heirloom, pressed from a plate she threw and
              fired for the edition.
            </p>
            <p className="mt-6 text-base leading-[1.7] text-[color:var(--ink-muted)]">
              The tiles are sold only alongside the full collection. Forty-eight
              sets, no more.
            </p>

            <blockquote
              className="mt-10 font-display italic text-[color:var(--ink)] text-2xl md:text-3xl leading-[1.35] max-w-xl border-l border-[color:var(--cacao)] pl-6"
              style={{ fontWeight: 400 }}
            >
              &ldquo;A good tile is quiet. The chocolate does the talking — the
              tile is only there to catch what falls.&rdquo;
            </blockquote>
            <p className="mt-3 eyebrow">— Ines Baumgart, for Syrena Journal</p>
          </div>
        </div>
      </section>

      {/* VIII. ARTIST SERIES — limited collaborations, Casa Bosques style */}
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
