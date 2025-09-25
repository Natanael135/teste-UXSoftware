import { AppImage } from "@/components/AppImage";

interface FeaturedProductImageProps {
  image: string;
  name: string;
}

export function FeaturedProductImage({ image, name }: FeaturedProductImageProps) {
  return (
    <div className="flex-1 flex justify-center items-center">
      <AppImage src={image} alt={name} width={320} height={288} className="rounded-xl shadow-lg max-h-72 w-auto object-contain bg-card" />
    </div>
  );
}