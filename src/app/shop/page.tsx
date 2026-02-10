import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";

const products = [
  { id: "dark-72", name: "Single Origin Dark 72%", price: "$14", category: "Bars", imageId: 301 },
  { id: "sea-salt-caramel", name: "Sea Salt & Caramel", price: "$16", category: "Bars", imageId: 302 },
  { id: "cacao-nibs", name: "Roasted Cacao Nibs", price: "$12", category: "Pantry", imageId: 303 },
  { id: "drinking-choc", name: "Ceremonial Drinking Chocolate", price: "$22", category: "Drinks", imageId: 304 },
  { id: "milk-hazelnut", name: "Milk & Hazelnut Gianduja", price: "$15", category: "Bars", imageId: 305 },
  { id: "cacao-butter", name: "Raw Cacao Butter", price: "$18", category: "Pantry", imageId: 306 },
  { id: "chili-dark", name: "Oaxacan Chili & Dark", price: "$16", category: "Bars", imageId: 307 },
  { id: "hot-choc-mix", name: "Spiced Hot Chocolate Mix", price: "$20", category: "Drinks", imageId: 308 },
];

export default function ShopPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <ScrollReveal>
          <SectionHeader
            centered
            label="EST. 2026"
            title="Shop"
            subtitle="Fine chocolates and cacao goods, crafted with intention."
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-children">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      <div className="mt-12 border-y border-border-light py-3">
        <Marquee
          items={[
            "FREE SHIPPING OVER $50",
            "HANDMADE IN SMALL BATCHES",
            "ETHICALLY SOURCED CACAO",
            "GIFT WRAPPING AVAILABLE",
          ]}
          separator=" &#9830; "
          className="text-xs tracking-[0.2em] text-muted/50"
        />
      </div>
    </div>
  );
}
