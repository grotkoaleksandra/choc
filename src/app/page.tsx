import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import ChocolateAnimation from "@/components/ChocolateAnimation";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import HeroVideo from "@/components/HeroVideo";
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
  { id: "dark-72", name: "Single Origin Dark 72%", price: "$14", category: "Bars", image: "/choc/img-3.png" },
  { id: "sea-salt-caramel", name: "Sea Salt & Caramel", price: "$16", category: "Bars", image: "/choc/img-5.png" },
  { id: "cacao-nibs", name: "Roasted Cacao Nibs", price: "$12", category: "Pantry", image: "/choc/img-4.png" },
  { id: "drinking-choc", name: "Ceremonial Drinking Chocolate", price: "$22", category: "Drinks", image: "/choc/img-2.png" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <HomeNav />

      {/* Scattered floating emojis */}
      <div className="float-emoji" style={{ top: "15%", left: "5%", animationDelay: "0s" }}>🍫</div>
      <div className="float-emoji" style={{ top: "35%", right: "8%", animationDelay: "3s", fontSize: "1.2rem" }}>🌿</div>
      <div className="float-emoji" style={{ top: "55%", left: "3%", animationDelay: "6s" }}>✨</div>
      <div className="float-emoji" style={{ top: "72%", right: "4%", animationDelay: "2s", fontSize: "1rem" }}>🍫</div>
      <div className="float-emoji" style={{ top: "88%", left: "7%", animationDelay: "8s", fontSize: "1.3rem" }}>🌱</div>

      {/* ─── Hero Video ─── */}
      <HeroVideo />

      {/* ─── Cacao bean crack divider ─── */}
      <div className="py-14 mx-auto max-w-7xl px-6">
        <ChocolateAnimation />
      </div>

      {/* ─── Shop ─── */}
      <section className="py-20 bg-cream relative">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              centered
              label="THE CHOCOLATE SHOP"
              title="From the Apothecary"
              subtitle="Fine chocolates and cacao goods, crafted with intention."
            />
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-7xl px-6 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ScrollReveal key={product.id} variant={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={400} className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block text-xs tracking-[0.15em] border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-200"
          >
            BROWSE ALL
          </Link>
        </ScrollReveal>
      </section>

      {/* ─── Artists Editions — full bleed ─── */}
      <section className="relative overflow-hidden" style={{ height: "85vh" }}>
        <div className="absolute inset-0">
          <Image
            src="/choc/miguel.jpeg"
            alt="Artists Editions — Miguel"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] text-white/40 mb-6">LIMITED RUNS · HANDCRAFTED</p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light italic leading-[1.1] text-white/90 max-w-3xl">
              Artists Editions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="font-body text-sm md:text-base text-white/60 leading-relaxed max-w-md mt-6">
              Collaborations with artists, designers, and makers. Each edition is a limited release — once it&rsquo;s gone, it&rsquo;s gone.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={450}>
            <Link href="/shop" className="inline-block mt-8 text-xs tracking-[0.2em] text-white border border-white/40 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300">
              EXPLORE EDITIONS
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Journal ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <ScrollReveal>
          <SectionHeader label="FROM THE JOURNAL" linkHref="/articles" linkText="VIEW ALL" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {articles.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 150} wipe>
              <ArticleCard {...article} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── Divider with spinning stars ─── */}
      <div className="py-10 text-center overflow-hidden">
        <ScrollReveal variant="scale">
          <span className="inline-flex items-center gap-4 text-muted/30">
            <span className="gentle-spin inline-block text-gold text-xl">✦</span>
            <span className="text-[10px] tracking-[0.4em]">MADE WITH LOVE & CACAO</span>
            <span className="gentle-spin inline-block text-gold text-xl" style={{ animationDirection: "reverse" }}>✦</span>
          </span>
        </ScrollReveal>
      </div>

      {/* ─── Contact ─── */}
      <section className="py-20 mx-auto max-w-7xl px-6">
        <ScrollReveal className="max-w-xl mx-auto text-center">
          <div className="float-slow inline-block text-3xl mb-4">✉</div>
          <h2 className="font-display text-2xl md:text-3xl font-light italic mb-2">
            Want to Collab or Just Say Hi?
          </h2>
          <p className="text-xs tracking-[0.15em] text-muted mb-8">
            WE&rsquo;D LOVE TO HEAR FROM YOU
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200} className="max-w-md mx-auto">
          <form className="flex flex-col gap-4 text-left">
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
              className="w-full px-6 py-3 text-xs tracking-[0.15em] bg-foreground text-background hover:bg-accent transition-colors duration-200"
            >
              SEND MESSAGE
            </button>
          </form>
        </ScrollReveal>
      </section>

      {/* ─── Footer ─── */}
      <ScrollReveal>
        <footer className="mt-10 border-t-2 border-border">
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
              <p className="text-xs text-muted/40">Made with 🍫 and intention</p>
            </div>
          </div>
        </footer>
      </ScrollReveal>
    </div>
  );
}
