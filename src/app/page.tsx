import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import ChocolateAnimation from "@/components/ChocolateAnimation";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const featuredArticle = {
  slug: "the-origin-of-cacao",
  title: "The Origin of Cacao",
  excerpt: "From the ancient forests of Mesoamerica to the finest chocolatiers of today. We trace the journey of the world's most beloved ingredient.",
  category: "Origins",
  date: "Feb 10, 2026",
  imageId: 42,
};

const articles = [
  {
    slug: "bean-to-bar-revolution",
    title: "The Bean-to-Bar Revolution",
    excerpt: "How a new generation of chocolate makers is changing everything we know about flavor.",
    category: "Craft",
    date: "Feb 8, 2026",
    imageId: 63,
  },
  {
    slug: "chocolate-and-terroir",
    title: "Chocolate & Terroir",
    excerpt: "Why the same cacao bean tastes different depending on where it grows.",
    category: "Science",
    date: "Feb 5, 2026",
    imageId: 74,
  },
  {
    slug: "the-art-of-tempering",
    title: "The Art of Tempering",
    excerpt: "The alchemy behind that perfect snap and glossy sheen.",
    category: "Technique",
    date: "Feb 3, 2026",
    imageId: 55,
  },
];

const products = [
  { id: "dark-72", name: "Single Origin Dark 72%", price: "$14", category: "Bars", imageId: 301 },
  { id: "sea-salt-caramel", name: "Sea Salt & Caramel", price: "$16", category: "Bars", imageId: 302 },
  { id: "cacao-nibs", name: "Roasted Cacao Nibs", price: "$12", category: "Pantry", imageId: 303 },
  { id: "drinking-choc", name: "Ceremonial Drinking Chocolate", price: "$22", category: "Drinks", imageId: 304 },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <ScrollReveal variant="left" className="md:col-span-5 space-y-5">
            <span className="text-xs tracking-[0.2em] text-accent">FEATURED</span>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.1] text-foreground italic">
              {featuredArticle.title}
            </h2>
            <p className="font-body text-sm text-muted leading-relaxed max-w-md">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>{featuredArticle.category.toUpperCase()}</span>
              <span className="text-border-light">/</span>
              <span>{featuredArticle.date}</span>
            </div>
            <Link
              href={`/articles/${featuredArticle.slug}`}
              className="inline-block text-xs tracking-[0.15em] border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200 btn-bounce"
            >
              READ THE STORY
            </Link>
          </ScrollReveal>

          <ScrollReveal variant="right" className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`https://picsum.photos/seed/${featuredArticle.imageId}/800/600`}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="border-y border-border-light py-3">
        <Marquee
          items={[
            "SINGLE ORIGIN",
            "BEAN TO BAR",
            "72% CACAO",
            "HANDCRAFTED",
            "SMALL BATCH",
            "ETHICALLY SOURCED",
            "MESOAMERICAN HERITAGE",
            "ROASTED WITH CARE",
            "CHOCOLATE IS A FEELING",
          ]}
          separator=" &#9830; "
          className="text-xs tracking-[0.2em] text-muted/60"
        />
      </div>

      {/* Chocolate animation divider */}
      <ScrollReveal variant="scale" className="flex items-center gap-6 py-10 mx-auto max-w-7xl px-6">
        <div className="flex-1 gold-line" />
        <div className="float">
          <ChocolateAnimation />
        </div>
        <div className="flex-1 gold-line" />
      </ScrollReveal>

      {/* Recent Articles */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <ScrollReveal>
          <SectionHeader label="FROM THE JOURNAL" linkHref="/articles" linkText="VIEW ALL" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 stagger-children">
          <div className="md:col-span-3">
            <ArticleCard {...articles[0]} featured />
          </div>
          <div className="md:col-span-2 flex flex-col gap-8">
            <ArticleCard {...articles[1]} />
            <ArticleCard {...articles[2]} />
          </div>
        </div>
      </section>

      {/* Decorative quote */}
      <ScrollReveal className="py-16 text-center mx-auto max-w-3xl px-6">
        <div className="gentle-spin inline-block text-gold text-2xl mb-4">&#10022;</div>
        <blockquote className="font-display text-3xl md:text-4xl font-light italic leading-relaxed text-foreground/80">
          &ldquo;Chocolate is the divine drink which builds up resistance and fights fatigue.&rdquo;
        </blockquote>
        <p className="text-xs tracking-[0.2em] text-muted mt-4">MONTEZUMA II</p>
        <div className="gentle-spin inline-block text-gold text-2xl mt-4">&#10022;</div>
      </ScrollReveal>

      {/* Shop */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionHeader
              centered
              label="THE CHOCOLATE SHOP"
              title="From the Apothecary"
              subtitle="Fine chocolates and cacao goods, crafted with intention."
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <ScrollReveal className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block text-xs tracking-[0.15em] border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-200 btn-bounce"
            >
              BROWSE ALL
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Second marquee — origins */}
      <div className="border-y border-border-light py-3 bg-warm text-cream">
        <Marquee
          items={[
            "VENEZUELA",
            "ECUADOR",
            "MADAGASCAR",
            "PERU",
            "COLOMBIA",
            "GHANA",
            "MEXICO",
            "TANZANIA",
            "BELIZE",
          ]}
          separator=" ~ "
          className="text-xs tracking-[0.25em] opacity-70"
        />
      </div>

      {/* Newsletter */}
      <section className="py-20 mx-auto max-w-7xl px-6">
        <ScrollReveal className="max-w-lg mx-auto text-center">
          <div className="float-slow inline-block text-3xl mb-4">&#127851;</div>
          <h2 className="font-display text-2xl md:text-3xl font-light italic mb-2">
            Stay in the Loop
          </h2>
          <p className="text-xs tracking-[0.15em] text-muted mb-8">
            NEW STORIES, RECIPES & CHOCOLATE DROPS
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs tracking-[0.15em] bg-foreground text-background hover:bg-accent transition-colors duration-200 btn-bounce"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-xs text-muted/60 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
