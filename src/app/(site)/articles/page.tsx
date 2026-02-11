import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";

const allArticles = [
  {
    slug: "the-origin-of-cacao",
    title: "The Origin of Cacao",
    excerpt: "From the ancient forests of Mesoamerica to the finest chocolatiers of today.",
    category: "Origins",
    date: "Feb 10, 2026",
    image: "/choc/img-1.png",
  },
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
  {
    slug: "cacao-ceremonies",
    title: "The Return of Cacao Ceremonies",
    excerpt: "An ancient Mesoamerican practice finding new life in modern cities.",
    category: "Culture",
    date: "Jan 30, 2026",
    image: "/choc/img-5.png",
  },
  {
    slug: "chocolate-and-architecture",
    title: "Chocolate & Architecture",
    excerpt: "How the spaces where chocolate is made and sold shape our experience of it.",
    category: "Design",
    date: "Jan 27, 2026",
    image: "/choc/img-1.png",
  },
];

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ScrollReveal>
        <SectionHeader
          centered
          label="STORIES & IDEAS"
          title="Journal"
          subtitle="Exploring the world of chocolate through craft, culture, and science."
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
        {allArticles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
