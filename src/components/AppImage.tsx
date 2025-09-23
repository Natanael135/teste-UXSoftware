import NextImage, { ImageProps } from "next/image";

// Wrapper para facilitar troca de <img> por <Image />
export function AppImage(props: ImageProps) {
  return <NextImage unoptimized {...props} />;
}
