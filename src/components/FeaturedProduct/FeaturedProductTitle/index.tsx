interface FeaturedProductTitleProps {
  name: string;
}

export function FeaturedProductTitle({ name }: FeaturedProductTitleProps) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight drop-shadow-sm">{name}</h2>
  );
}