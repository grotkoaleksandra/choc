import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  imageId: number;
}

export default function ProductCard({ id, name, price, category, imageId }: ProductCardProps) {
  return (
    <Link href={`/shop#${id}`} className="group block">
      <div className="relative aspect-square overflow-hidden mb-3 bg-cream">
        <Image
          src={`https://picsum.photos/seed/${imageId}/400/400`}
          alt={name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <span className="text-[10px] tracking-[0.2em] text-muted">
        {category.toUpperCase()}
      </span>
      <h3 className="text-sm mt-1 group-hover:text-accent transition-colors duration-200 leading-tight">
        {name}
      </h3>
      <p className="text-sm text-muted mt-0.5">{price}</p>
    </Link>
  );
}
