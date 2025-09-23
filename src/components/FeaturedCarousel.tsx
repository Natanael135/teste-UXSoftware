import "keen-slider/keen-slider.min.css";

import React, { useState, useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { FeaturedProduct, FeaturedProductProps } from "@/components/FeaturedProduct";

interface FeaturedCarouselProps {
  products: FeaturedProductProps[];
}


export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const mouseOver = useRef(false);

  useEffect(() => {
    if (products.length <= 1) return;
    const clear = () => {
      if (timer.current) clearInterval(timer.current);
    };
    function next() {
      if (!mouseOver.current && instanceRef.current) {
        instanceRef.current.next();
      }
    }
    timer.current = setInterval(next, 3500);
    return clear;
  }, [instanceRef, products.length]);

  return (
    <div
      className="relative w-full my-8"
      onMouseEnter={() => (mouseOver.current = true)}
      onMouseLeave={() => (mouseOver.current = false)}
      onFocus={() => (mouseOver.current = true)}
      onBlur={() => (mouseOver.current = false)}
    >
      <div ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <div className="keen-slider__slide" key={product.id}>
            <FeaturedProduct {...product} />
          </div>
        ))}
      </div>
      {/* Setas de navegação */}
      {products.length > 1 && (
        <>
          <button
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full p-2 shadow transition hidden md:block"
            onClick={() => instanceRef.current?.prev()}
            aria-label="Anterior"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full p-2 shadow transition hidden md:block"
            onClick={() => instanceRef.current?.next()}
            aria-label="Próximo"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </>
      )}
    </div>
  );
};
