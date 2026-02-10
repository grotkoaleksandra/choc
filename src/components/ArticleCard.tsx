import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageId: number;
  featured?: boolean;
}

export default function ArticleCard({ slug, title, excerpt, category, date, imageId, featured }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article>
        <div className={`relative ${featured ? "aspect-[16/9]" : "aspect-[4/3]"} mb-4 overflow-hidden bg-foreground/5`}>
          <Image
            src={`https://picsum.photos/seed/${imageId}/800/600`}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={featured ? "(max-width: 768px) 100vw, 1280px" : "(max-width: 768px) 100vw, 33vw"}
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{category}</span>
          <span className="text-xs text-muted">{date}</span>
        </div>
        <h3 className={`font-semibold group-hover:text-accent transition-colors ${featured ? "text-2xl mb-2" : "text-lg mb-1"}`}>
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">{excerpt}</p>
      </article>
    </Link>
  );
}
