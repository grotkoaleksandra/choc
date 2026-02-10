import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
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
    <div className="mx-auto max-w-7xl px-6">
      {/* Hero / Featured Article */}
      <section className="py-12 md:py-20">
        <ArticleCard {...featuredArticle} featured />
      </section>

      {/* Recent Articles */}
      <section className="py-12 border-t border-foreground/10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Recent</h2>
          <Link href="/articles" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-12 border-t border-foreground/10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">From the Shop</h2>
          <Link href="/shop" className="text-sm text-accent hover:underline">
            Browse all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 border-t border-foreground/10 text-center">
        <h2 className="text-2xl font-semibold mb-2">Stay in the loop</h2>
        <p className="text-muted text-sm mb-6 max-w-md mx-auto">
          Get new articles and shop drops delivered to your inbox. No spam, ever.
        </p>
        <form className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 text-sm border border-foreground/15 bg-transparent rounded-md focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
