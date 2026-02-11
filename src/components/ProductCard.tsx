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
    <Link href={`/shop#${id}`} className="group block product-pop">
      <div className="apothecary-border">
        <div className="apothecary-border-inner">
          <div className="relative aspect-square overflow-hidden bg-cream">
            <Image
              src={`https://picsum.photos/seed/choc${imageId}/400/400`}
              alt={name}
              fill
              className="object-cover img-bw group-hover:scale-[1.08] transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Slide-up label on hover */}
            <div className="slide-up-label">VIEW</div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] tracking-[0.2em] text-muted">
          {category.toUpperCase()}
        </span>
        <h3 className="text-sm mt-1 group-hover:text-accent transition-colors duration-300 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-muted mt-0.5 font-display italic">{price}</p>
      </div>
    </Link>
  );
}
