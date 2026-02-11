import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";

const products = [
  { id: "dark-72", name: "Single Origin Dark 72%", price: "$14", category: "Bars", image: "/choc/img-3.png" },
  { id: "sea-salt-caramel", name: "Sea Salt & Caramel", price: "$16", category: "Bars", image: "/choc/img-5.png" },
  { id: "cacao-nibs", name: "Roasted Cacao Nibs", price: "$12", category: "Pantry", image: "/choc/img-4.png" },
  { id: "drinking-choc", name: "Ceremonial Drinking Chocolate", price: "$22", category: "Drinks", image: "/choc/img-2.png" },
  { id: "milk-hazelnut", name: "Milk & Hazelnut Gianduja", price: "$15", category: "Bars", image: "/choc/img-5.png" },
  { id: "cacao-butter", name: "Raw Cacao Butter", price: "$18", category: "Pantry", image: "/choc/img-1.png" },
  { id: "chili-dark", name: "Oaxacan Chili & Dark", price: "$16", category: "Bars", image: "/choc/img-3.png" },
  { id: "hot-choc-mix", name: "Spiced Hot Chocolate Mix", price: "$20", category: "Drinks", image: "/choc/img-4.png" },
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

    </div>
  );
}
