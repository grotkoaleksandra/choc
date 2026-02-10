import Image from "next/image";
import Link from "next/link";

const articles: Record<string, { title: string; category: string; date: string; imageId: number; content: string }> = {
  "the-art-of-slow-living": {
    title: "The Art of Slow Living",
    category: "Culture",
    date: "Feb 10, 2026",
    imageId: 101,
    content: "In a world that never stops, the most radical act might be to simply pause. The slow living movement isn't about doing less — it's about doing things with more intention.\n\nFrom morning rituals to the way we move through our cities, there's a growing recognition that speed isn't always progress. This article explores what it means to decelerate without disengaging.\n\nWe spoke with artists, chefs, and architects who have built their practices around the principle that quality demands patience. Their stories reveal a common thread: the best things happen when we give them time.",
  },
  "materials-that-matter": {
    title: "Materials That Matter",
    category: "Design",
    date: "Feb 8, 2026",
    imageId: 102,
    content: "A new generation of designers is asking a fundamental question: what should things be made of? The answer is reshaping industries from fashion to furniture.\n\nBeyond sustainability as a buzzword, these creators are exploring materials on their own terms — mushroom leather, recycled ocean plastic, bio-grown textiles. Each choice is both aesthetic and ethical.\n\nThe result is a design landscape that feels simultaneously ancient and futuristic, where the material itself becomes the message.",
  },
  "kitchen-as-studio": {
    title: "The Kitchen as Studio",
    category: "Food",
    date: "Feb 5, 2026",
    imageId: 103,
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
        <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
        <Link href="/articles" className="text-accent hover:underline text-sm">
          Back to articles
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{article.category}</span>
          <span className="text-xs text-muted">{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{article.title}</h1>
      </div>

      <div className="relative aspect-[16/9] mb-10 overflow-hidden bg-foreground/5">
        <Image
          src={`https://picsum.photos/seed/${article.imageId}/1200/675`}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <div className="prose prose-lg max-w-none">
        {article.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-foreground/80 leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-foreground/10">
        <Link href="/articles" className="text-sm text-accent hover:underline">
          &larr; Back to articles
        </Link>
      </div>
    </article>
  );
}
