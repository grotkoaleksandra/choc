import Image from "next/image";
import Link from "next/link";

const articles: Record<string, { title: string; category: string; date: string; imageId: number; pullQuote: string; content: string }> = {
  "the-art-of-slow-living": {
    title: "The Art of Slow Living",
    category: "Culture",
    date: "Feb 10, 2026",
    imageId: 101,
    pullQuote: "The best things happen when we give them time.",
    content: "In a world that never stops, the most radical act might be to simply pause. The slow living movement isn't about doing less — it's about doing things with more intention.\n\nFrom morning rituals to the way we move through our cities, there's a growing recognition that speed isn't always progress. This article explores what it means to decelerate without disengaging.\n\nWe spoke with artists, chefs, and architects who have built their practices around the principle that quality demands patience. Their stories reveal a common thread: the best things happen when we give them time.",
  },
  "materials-that-matter": {
    title: "Materials That Matter",
    category: "Design",
    date: "Feb 8, 2026",
    imageId: 102,
    pullQuote: "The material itself becomes the message.",
    content: "A new generation of designers is asking a fundamental question: what should things be made of? The answer is reshaping industries from fashion to furniture.\n\nBeyond sustainability as a buzzword, these creators are exploring materials on their own terms — mushroom leather, recycled ocean plastic, bio-grown textiles. Each choice is both aesthetic and ethical.\n\nThe result is a design landscape that feels simultaneously ancient and futuristic, where the material itself becomes the message.",
  },
  "kitchen-as-studio": {
    title: "The Kitchen as Studio",
    category: "Food",
    date: "Feb 5, 2026",
    imageId: 103,
    pullQuote: "The ingredients become your medium. The plate becomes your canvas.",
    content: "When you treat your kitchen as a creative studio, cooking transforms from chore to practice. The ingredients become your medium. The plate becomes your canvas.\n\nWe visited three home cooks who approach their daily meals with the rigor and playfulness of artists. No formal training, no pretension — just a commitment to making something beautiful every day.\n\nTheir kitchens tell the story: well-worn cutting boards, jars of spices organized by color, handwritten recipe cards pinned to the wall.",
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
        <Link href="/articles" className="text-xs tracking-[0.15em] text-accent hover:text-foreground">
          BACK TO JOURNAL
        </Link>
      </div>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <article>
      {/* Header */}
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xs tracking-[0.15em] text-accent">{article.category.toUpperCase()}</span>
          <span className="text-border-light">/</span>
          <span className="text-xs text-muted">{article.date}</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-light italic leading-[1.1] mb-6">
          {article.title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="mx-auto max-w-4xl px-6 mb-12">
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
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6">
        {paragraphs.map((paragraph, i) => (
          <div key={i}>
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
          </div>
        ))}
      </div>

      {/* Back */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pb-12">
        <div className="border-t border-border-light pt-8">
          <Link href="/articles" className="text-xs tracking-[0.15em] text-muted hover:text-foreground transition-colors">
            &larr; BACK TO JOURNAL
          </Link>
        </div>
      </div>
    </article>
  );
}
