import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
}

export default function ArticleCard({ slug, title, excerpt, category, date, image, featured }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article>
        <div className={`relative ${featured ? "aspect-[3/4]" : "aspect-[3/4]"} mb-4 overflow-hidden`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            sizes={featured ? "(max-width: 768px) 100vw, 1280px" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs tracking-[0.15em] text-accent">
            {category.toUpperCase()}
          </span>
          <span className="text-border-light">/</span>
          <span className="text-xs text-muted">{date}</span>
        </div>

        <h3 className={`font-display group-hover:text-accent transition-colors duration-300
          ${featured ? "text-2xl md:text-3xl font-light italic leading-tight mb-2" : "text-lg font-medium leading-snug mb-1"}`}>
          {title}
        </h3>

        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {excerpt}
        </p>

        {featured && (
          <span className="inline-block mt-3 text-xs tracking-[0.15em] link-fancy text-foreground">
            READ MORE &rarr;
          </span>
        )}
      </article>
    </Link>
  );
}
