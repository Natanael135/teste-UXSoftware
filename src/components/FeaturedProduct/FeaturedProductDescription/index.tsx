interface FeaturedProductDescriptionProps {
  description: string;
}

export function FeaturedProductDescription({ description }: FeaturedProductDescriptionProps) {
  return (
    <p className="text-muted-foreground text-lg max-w-xl">{description}</p>
  );
}