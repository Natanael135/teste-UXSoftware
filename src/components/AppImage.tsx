import NextImage, { ImageProps } from "next/image";

export function AppImage(props: ImageProps) {
  return <NextImage unoptimized {...props} />;
}
