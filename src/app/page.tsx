import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import ChocolateAnimation from "@/components/ChocolateAnimation";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const featuredArticle = {
  slug: "the-art-of-slow-living",
  title: "The Art of Slow Living",
  excerpt: "In a world that never stops, the most radical act might be to simply pause. We explore the growing movement of intentional deceleration.",
  category: "Culture",
  date: "Feb 10, 2026",
  imageId: 101,
};

const articles = [
  {
    slug: "materials-that-matter",
    title: "Materials That Matter",
    excerpt: "How a new generation of designers is rethinking what we make things from.",
    category: "Design",
    date: "Feb 8, 2026",
    imageId: 102,
  },
  {
    slug: "kitchen-as-studio",
    title: "The Kitchen as Studio",
    excerpt: "When cooking becomes a creative practice, everything changes.",
    category: "Food",
    date: "Feb 5, 2026",
    imageId: 103,
  },
  {
    slug: "sound-of-silence",
    title: "The Sound of Silence",
    excerpt: "Acoustic design is shaping how we experience spaces — and ourselves.",
    category: "Architecture",
    date: "Feb 3, 2026",
    imageId: 104,
  },
];

const products = [
  { id: "ceramic-mug", name: "Handmade Ceramic Mug", price: "$38", category: "Kitchen", imageId: 201 },
  { id: "linen-notebook", name: "Linen-Bound Notebook", price: "$24", category: "Stationery", imageId: 202 },
  { id: "soy-candle", name: "Cedar & Sage Candle", price: "$32", category: "Home", imageId: 203 },
  { id: "wool-throw", name: "Merino Wool Throw", price: "$120", category: "Home", imageId: 204 },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 space-y-5">
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
              className="inline-block text-xs tracking-[0.15em] border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200"
            >
              READ THE STORY
            </Link>
          </div>

          <div className="md:col-span-7">
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
          </div>
        </div>
      </section>

      {/* Chocolate animation divider */}
      <div className="flex items-center gap-6 py-4 mx-auto max-w-7xl px-6">
        <div className="flex-1 border-t border-border-light" />
        <ChocolateAnimation />
        <div className="flex-1 border-t border-border-light" />
      </div>

      {/* Recent Articles */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader label="RECENT FROM THE JOURNAL" linkHref="/articles" linkText="VIEW ALL" />

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

      {/* Shop */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            centered
            label="EST. 2026"
            title="From the Shop"
            subtitle="Carefully curated goods for intentional living."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block text-xs tracking-[0.15em] border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              BROWSE ALL
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 mx-auto max-w-7xl px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light italic mb-2">
            Stay in the Loop
          </h2>
          <p className="text-xs tracking-[0.15em] text-muted mb-8">
            NEW STORIES & ARRIVALS, DELIVERED WEEKLY
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs tracking-[0.15em] bg-foreground text-background hover:bg-accent transition-colors duration-200"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-xs text-muted/60 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
