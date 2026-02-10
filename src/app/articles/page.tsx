import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";

const allArticles = [
  {
    slug: "the-art-of-slow-living",
    title: "The Art of Slow Living",
    excerpt: "In a world that never stops, the most radical act might be to simply pause. We explore the growing movement of intentional deceleration.",
    category: "Culture",
    date: "Feb 10, 2026",
    imageId: 101,
  },
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
  {
    slug: "color-theory-everyday",
    title: "Color Theory for Everyday Life",
    excerpt: "The palette of your environment affects more than you think.",
    category: "Design",
    date: "Jan 30, 2026",
    imageId: 105,
  },
  {
    slug: "fermentation-renaissance",
    title: "The Fermentation Renaissance",
    excerpt: "Ancient techniques are finding new life in modern kitchens around the world.",
    category: "Food",
    date: "Jan 27, 2026",
    imageId: 106,
  },
];

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeader
        centered
        label="STORIES & IDEAS"
        title="Journal"
        subtitle="Stories, ideas, and perspectives."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
        {allArticles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
