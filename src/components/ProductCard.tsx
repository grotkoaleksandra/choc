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
      <div className="relative aspect-square mb-3 overflow-hidden bg-foreground/5">
        <Image
          src={`https://picsum.photos/seed/${imageId}/400/400`}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-accent">{category}</span>
      <h3 className="text-sm font-medium mt-1 group-hover:text-accent transition-colors">{name}</h3>
      <p className="text-sm text-muted mt-0.5">{price}</p>
    </Link>
  );
}
