interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

export default function Marquee({ items, separator = " \u2022 ", className = "" }: MarqueeProps) {
  const content = items.join(separator) + separator;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track">
        <span className="whitespace-nowrap">{content}</span>
        <span className="whitespace-nowrap">{content}</span>
      </div>
    </div>
  );
}
