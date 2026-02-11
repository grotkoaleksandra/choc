import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const articles: Record<string, { title: string; category: string; date: string; imageId: number; pullQuote: string; content: string }> = {
  "the-origin-of-cacao": {
    title: "The Origin of Cacao",
    category: "Origins",
    date: "Feb 10, 2026",
    imageId: 42,
    pullQuote: "The cacao tree has been cultivated for at least three millennia.",
    content: "The story of chocolate begins in the humid lowlands of Mesoamerica, where the Theobroma cacao tree first evolved under the dense canopy of tropical forests. For the Olmec, Maya, and Aztec civilizations, cacao was not merely food \u2014 it was currency, medicine, and ritual.\n\nThe word 'chocolate' derives from the Nahuatl word xocolatl, meaning 'bitter water.' The earliest known preparations involved fermenting, roasting, and grinding cacao beans into a paste, then mixing it with water, chili peppers, and cornmeal to create a frothy, energizing drink.\n\nToday, the finest chocolate makers are returning to these origins. By working directly with farmers in places like Oaxaca, Tabasco, and the Soconusco coast, they are rediscovering varieties of cacao that were nearly lost to history \u2014 and with them, flavors that no modern hybrid can replicate.",
  },
  "bean-to-bar-revolution": {
    title: "The Bean-to-Bar Revolution",
    category: "Craft",
    date: "Feb 8, 2026",
    imageId: 63,
    pullQuote: "Every step of the process reveals something about the bean's character.",
    content: "A quiet revolution has been reshaping the world of chocolate. In warehouses, garages, and small studios around the globe, a new generation of makers is taking control of the entire process \u2014 from raw cacao bean to finished bar.\n\nUnlike mass-market chocolate, which relies on standardized blends and heavy processing, bean-to-bar makers celebrate the unique characteristics of each harvest. A batch from Madagascar might carry bright citrus notes, while Ecuadorian cacao reveals floral complexity.\n\nThe result is chocolate that tastes like something \u2014 not just sweet, not just dark, but alive with the terroir of its origin. It's a return to what chocolate was always meant to be: an expression of place, time, and the hands that shaped it.",
  },
  "chocolate-and-terroir": {
    title: "Chocolate & Terroir",
    category: "Science",
    date: "Feb 5, 2026",
    imageId: 74,
    pullQuote: "Like wine, chocolate carries the signature of its landscape.",
    content: "Terroir \u2014 the French concept that a product reflects the total environment of its origin \u2014 applies to chocolate just as powerfully as it does to wine or coffee. The soil composition, altitude, rainfall, and neighboring plants all leave their mark on the cacao bean.\n\nResearchers at the University of Reading found that genetically identical cacao trees planted in different regions produced beans with dramatically different flavor profiles. A Criollo variety grown in Venezuelan cloud forest tasted nothing like the same variety cultivated on a coastal Belizean farm.\n\nFor chocolate makers, this presents both a challenge and an opportunity. The challenge is consistency: every harvest is different. The opportunity is variety: the world of chocolate is as vast and nuanced as the world of wine, waiting to be explored.",
  },
  "the-art-of-tempering": {
    title: "The Art of Tempering",
    category: "Technique",
    date: "Feb 3, 2026",
    imageId: 55,
    pullQuote: "Tempering is the difference between chocolate and mere cocoa butter.",
    content: "Tempering is the process that transforms melted chocolate into the glossy, snappy, melt-in-your-mouth confection we love. It's an exercise in crystal structure \u2014 specifically, coaxing cocoa butter molecules into the ideal Form V arrangement.\n\nThe process involves carefully heating, cooling, and reheating chocolate through specific temperature ranges. Dark chocolate, for example, must be heated to 50\u00B0C, cooled to 27\u00B0C, then gently brought back up to 31\u00B0C. Miss the window, and you'll end up with a chalky, crumbly bar instead of a smooth, shiny one.\n\nMaster chocolatiers often describe tempering as meditative. It requires patience, attention, and a willingness to work with the material rather than against it. The chocolate tells you when it's ready \u2014 you just have to learn its language.",
  },
  "cacao-ceremonies": {
    title: "The Return of Cacao Ceremonies",
    category: "Culture",
    date: "Jan 30, 2026",
    imageId: 85,
    pullQuote: "Cacao has always been about connection \u2014 to ourselves and each other.",
    content: "In cities from Berlin to Brooklyn, an ancient Mesoamerican practice is finding new life. Cacao ceremonies \u2014 ritualized gatherings centered around drinking minimally processed cacao \u2014 are drawing people seeking something beyond ordinary social gatherings.\n\nThe modern ceremony typically involves drinking a cup of warm, spiced cacao prepared from whole beans, sometimes accompanied by meditation, music, or intention-setting. Devotees describe feelings of heightened awareness, emotional openness, and heart-centered connection.\n\nWhile scientists point to the psychoactive compounds in cacao \u2014 theobromine, anandamide, phenylethylamine \u2014 as explanations, practitioners say the experience transcends chemistry. Whatever the mechanism, the renewed interest speaks to a broader cultural longing for ritual and meaningful gathering.",
  },
  "chocolate-and-architecture": {
    title: "Chocolate & Architecture",
    category: "Design",
    date: "Jan 27, 2026",
    imageId: 96,
    pullQuote: "The spaces where chocolate is made and sold shape our experience of it.",
    content: "From the ornate chocolate houses of 18th-century London to the minimalist ateliers of today's bean-to-bar makers, the architecture of chocolate has always been about creating an experience.\n\nConsider Dandelion Chocolate's Valencia Street factory in San Francisco, where the production floor is visible from the tasting bar. Or Minimal in Tokyo, where architect Jo Nagasaka designed a space that feels more like a gallery than a shop. These spaces invite us to slow down and engage with chocolate as craft.\n\nThe lesson is clear: how we present chocolate changes how we taste it. A beautifully wrapped bar in a thoughtfully designed space isn't just marketing \u2014 it's an extension of the maker's intention, carrying their care from the roaster all the way to your hands.",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-display text-2xl font-light italic mb-4">Article not found</h1>
        <Link href="/articles" className="text-xs tracking-[0.15em] text-accent hover:text-foreground link-fancy">
          BACK TO JOURNAL
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <article>
      {/* Header */}
      <ScrollReveal className="mx-auto max-w-4xl px-6 pt-12 pb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xs tracking-[0.15em] text-accent">{article.category.toUpperCase()}</span>
          <span className="text-border-light">/</span>
          <span className="text-xs text-muted">{article.date}</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-light italic leading-[1.1] mb-6">
          {article.title}
        </h1>
        <div className="gold-line w-24 mx-auto" />
      </ScrollReveal>

      {/* Hero Image */}
      <ScrollReveal variant="scale" className="mx-auto max-w-4xl px-6 mb-12">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${article.imageId}/1200/675`}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </div>
      </ScrollReveal>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6">
        {paragraphs.map((paragraph, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            {i === 0 ? (
              <p className="font-body text-lg text-foreground/85 leading-[1.9] mb-8 drop-cap">
                {paragraph}
              </p>
            ) : (
              <p className="font-body text-lg text-foreground/85 leading-[1.9] mb-8">
                {paragraph}
              </p>
            )}

            {i === 0 && (
              <blockquote className="my-12 py-8 border-t border-b border-border-light text-center">
                <p className="font-display text-2xl md:text-3xl font-light italic text-foreground/70 leading-relaxed max-w-xl mx-auto">
                  &ldquo;{article.pullQuote}&rdquo;
                </p>
              </blockquote>
            )}
          </ScrollReveal>
        ))}
      </div>

      {/* Back */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pb-12">
        <div className="border-t border-border-light pt-8">
          <Link href="/articles" className="text-xs tracking-[0.15em] text-muted hover:text-foreground transition-colors link-fancy">
            &larr; BACK TO JOURNAL
          </Link>
        </div>
      </div>
    </article>
  );
}
