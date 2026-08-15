import { useState, useEffect, useRef } from 'react';

const RotatingImage = ({
  images,
  alt,
  className = "",
  eager = false,
  positionClass = "object-[50%_30%] lg:object-center",
}: {
  images: string[];
  alt: string;
  className?: string;
  eager?: boolean;
  /** Tailwind object-position classes. Override for portrait sources that
   *  would otherwise be cropped through the subject's face. */
  positionClass?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(eager);
  const sentinelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  // Prefetch images ~2 viewports before they scroll into view. Uses
  // IntersectionObserver (not native loading=lazy) because IO tracks the
  // GSAP-transformed content correctly.
  useEffect(() => {
    if (inView) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200% 0px 200% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <span
        ref={sentinelRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      {images.map((src, index) => (
        <img
          key={src}
          src={inView ? src : undefined}
          alt={`${alt} ${index + 1}`}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover ${positionClass} transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      ))}
    </>
  );
};

export default RotatingImage;
