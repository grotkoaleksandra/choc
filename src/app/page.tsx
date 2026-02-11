import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import ChocolateAnimation from "@/components/ChocolateAnimation";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

import SectionHeader from "@/components/SectionHeader";
import HeroVideo from "@/components/HeroVideo";
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
    <div>
      {/* Full-screen video hero */}
      <HeroVideo />

      {/* Chocolate animation divider */}
      <ScrollReveal variant="scale" className="flex items-center gap-6 py-10 mx-auto max-w-7xl px-6">
        <div className="flex-1 gold-line" />
        <div className="float">
          <ChocolateAnimation />
        </div>
        <div className="flex-1 gold-line" />
      </ScrollReveal>

      {/* Shop — first section */}
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

      {/* Full-width image divider */}
      <ScrollReveal variant="scale">
        <div className="relative w-full" style={{ height: "70vh" }}>
          <Image
            src="https://picsum.photos/seed/syrenacacao/1600/900"
            alt="Cacao beans and chocolate"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </ScrollReveal>

      {/* Decorative quote */}
      <ScrollReveal className="py-16 text-center mx-auto max-w-3xl px-6">
        <div className="gentle-spin inline-block text-gold text-2xl mb-4">&#10022;</div>
        <blockquote className="font-display text-3xl md:text-4xl font-light italic leading-relaxed text-foreground/80">
          &ldquo;Chocolate is the divine drink which builds up resistance and fights fatigue.&rdquo;
        </blockquote>
        <p className="text-xs tracking-[0.2em] text-muted mt-4">MONTEZUMA II</p>
        <div className="gentle-spin inline-block text-gold text-2xl mt-4">&#10022;</div>
      </ScrollReveal>

      {/* Journal — second section, all cards in one row */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <ScrollReveal>
          <SectionHeader label="FROM THE JOURNAL" linkHref="/articles" linkText="VIEW ALL" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 mx-auto max-w-7xl px-6">
        <ScrollReveal className="max-w-xl mx-auto text-center">
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
              rows={5}
              className="w-full px-4 py-3 text-sm border border-border bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 text-xs tracking-[0.15em] bg-foreground text-background hover:bg-accent transition-colors duration-200 btn-bounce"
            >
              SEND MESSAGE
            </button>
          </form>
        </ScrollReveal>
      </section>
    </div>
  );
}
