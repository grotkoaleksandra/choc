import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import ChocolateAnimation from "@/components/ChocolateAnimation";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import HeroVideo from "@/components/HeroVideo";
import SnapScroll from "@/components/SnapScroll";
import HomeNav from "@/components/HomeNav";
import Link from "next/link";

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
    <SnapScroll>
      <HomeNav />

      {/* ─── Panel 1: Hero Video ─── */}
      <section className="snap-panel snap-hero">
        <HeroVideo />
      </section>

      {/* ─── Panel 2: Shop ─── */}
      <section className="snap-panel bg-cream">
        <div className="panel-inner px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-6 mb-10">
              <div className="flex-1 gold-line" />
              <div className="float">
                <ChocolateAnimation />
              </div>
              <div className="flex-1 gold-line" />
            </div>

            <SectionHeader
              centered
              label="THE CHOCOLATE SHOP"
              title="From the Apothecary"
              subtitle="Fine chocolates and cacao goods, crafted with intention."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children mt-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/shop"
                className="inline-block text-xs tracking-[0.15em] border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-200 btn-bounce"
              >
                BROWSE ALL
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Panel 3: Full-bleed image + Quote ─── */}
      <section className="snap-panel snap-image">
        <div className="panel-inner relative flex-1">
          <Image
            src="https://picsum.photos/seed/syrenacacao/1600/900"
            alt="Cacao beans and chocolate"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            <div className="gentle-spin inline-block text-gold-light text-2xl mb-6">&#10022;</div>
            <blockquote className="font-display text-3xl md:text-5xl font-light italic leading-relaxed text-white/90 max-w-3xl">
              &ldquo;Chocolate is the divine drink which builds up resistance and fights fatigue.&rdquo;
            </blockquote>
            <p className="text-xs tracking-[0.3em] text-white/50 mt-6">MONTEZUMA II</p>
            <div className="gentle-spin inline-block text-gold-light text-2xl mt-6">&#10022;</div>
          </div>
        </div>
      </section>

      {/* ─── Panel 4: Journal ─── */}
      <section className="snap-panel">
        <div className="panel-inner px-6">
          <div className="mx-auto max-w-7xl">
            <SectionHeader label="FROM THE JOURNAL" linkHref="/articles" linkText="VIEW ALL" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children mt-8">
              {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Panel 5: Contact ─── */}
      <section className="snap-panel">
        <div className="panel-inner px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="float-slow inline-block text-3xl mb-4">&#9993;</div>
            <h2 className="font-display text-2xl md:text-3xl font-light italic mb-2">
              Want to Collab or Just Say Hi?
            </h2>
            <p className="text-xs tracking-[0.15em] text-muted mb-8">
              WE&rsquo;D LOVE TO HEAR FROM YOU
            </p>
            <form className="flex flex-col gap-4 max-w-md mx-auto text-left">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 text-sm border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 text-sm border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
              />
              <textarea
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-3 text-sm border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 text-xs tracking-[0.15em] bg-foreground text-background hover:bg-accent transition-colors duration-200 btn-bounce"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Panel 6: Footer ─── */}
      <section className="snap-panel snap-footer">
        <div className="panel-inner w-full mt-auto">
          <footer className="border-t-2 border-border">
            <div className="mx-auto max-w-7xl px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="md:col-span-2">
                  <h3 className="text-sm tracking-[0.3em] font-medium mb-3 hover-wiggle inline-block">SYRENA CHOCOLATE</h3>
                  <p className="text-xs text-muted leading-relaxed max-w-xs">
                    A chocolate journal and curated apothecary by Syrena Chocolate. Stories, craft, and fine chocolate.
                  </p>
                  <div className="gold-line w-12 mt-4" />
                </div>
                <div>
                  <h4 className="text-xs tracking-[0.15em] text-muted mb-4">NAVIGATE</h4>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/articles" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Journal</Link>
                    <Link href="/shop" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Shop</Link>
                    <Link href="/about" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">About</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs tracking-[0.15em] text-muted mb-4">CONNECT</h4>
                  <div className="flex flex-col gap-2 text-sm">
                    <a href="#" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">Instagram</a>
                    <a href="mailto:hello@syrenachocolate.com" className="link-fancy hover:text-accent transition-colors duration-200 inline-block">hello@syrenachocolate.com</a>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-6 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-xs text-muted">&copy; 2026 SYRENA CHOCOLATE</p>
                <p className="text-xs text-muted/40">Made with &#127851; and intention</p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </SnapScroll>
  );
}
