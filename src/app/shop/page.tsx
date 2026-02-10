import ProductCard from "@/components/ProductCard";

const products = [
  { id: "ceramic-mug", name: "Handmade Ceramic Mug", price: "$38", category: "Kitchen", imageId: 201 },
  { id: "linen-notebook", name: "Linen-Bound Notebook", price: "$24", category: "Stationery", imageId: 202 },
  { id: "soy-candle", name: "Cedar & Sage Candle", price: "$32", category: "Home", imageId: 203 },
  { id: "wool-throw", name: "Merino Wool Throw", price: "$120", category: "Home", imageId: 204 },
  { id: "olive-oil", name: "Single-Origin Olive Oil", price: "$28", category: "Kitchen", imageId: 205 },
  { id: "print-set", name: "Botanical Print Set", price: "$55", category: "Art", imageId: 206 },
  { id: "tea-blend", name: "Loose Leaf Tea Blend", price: "$18", category: "Kitchen", imageId: 207 },
  { id: "incense", name: "Japanese Incense Sticks", price: "$22", category: "Home", imageId: 208 },
];

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Shop</h1>
      <p className="text-muted text-sm mb-10">Carefully curated goods for intentional living.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
