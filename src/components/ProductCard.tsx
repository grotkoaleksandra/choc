import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export default function ProductCard({ id, name, price, category, image }: ProductCardProps) {
  return (
    <Link href={`/shop#${id}`} className="group block product-card">
      <div className="apothecary-border">
        <div className="apothecary-border-inner">
          <div className="product-img relative aspect-square overflow-hidden bg-cream">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] tracking-[0.2em] text-muted">
          {category.toUpperCase()}
        </span>
        <h3 className="product-name text-sm mt-1 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-muted mt-0.5 font-display italic">{price}</p>
      </div>
    </Link>
  );
}
