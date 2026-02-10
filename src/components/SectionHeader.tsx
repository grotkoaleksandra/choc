import Link from "next/link";

interface SectionHeaderProps {
  label: string;
  title?: string;
  subtitle?: string;
  linkHref?: string;
  linkText?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, linkHref, linkText, centered }: SectionHeaderProps) {
  if (centered) {
    return (
      <div className="text-center mb-12">
        <span className="text-xs tracking-[0.2em] text-muted">{label}</span>
        {title && <h2 className="font-display text-3xl md:text-4xl font-light mt-2 mb-2 italic">{title}</h2>}
        {subtitle && <p className="text-sm text-muted max-w-md mx-auto">{subtitle}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-xs tracking-[0.2em] text-muted">{label}</h2>
      <div className="flex-1 border-t border-border-light" />
      {linkHref && linkText && (
        <Link href={linkHref} className="text-xs tracking-[0.15em] text-accent hover:text-foreground transition-colors">
          {linkText}
        </Link>
      )}
    </div>
  );
}
