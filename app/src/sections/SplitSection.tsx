import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import RotatingImage from '../components/RotatingImage';

gsap.registerPlugin(ScrollTrigger);

interface SplitSectionProps {
  id: string;
  images: string[];
  imageAlt: string;
  headline: string[];
  headlineAccentIndex?: number;
  body: string;
  cta: string;
  ctaAction?: () => void;
  watermark: string;
  zIndex: number;
  secondaryCta?: string;
  secondaryAction?: () => void;
  hasProductCard?: boolean;
  productCardSrc?: string;
}

const SplitSection = ({
  id,
  images,
  imageAlt,
  headline,
  headlineAccentIndex,
  body,
  cta,
  ctaAction,
  watermark,
  zIndex,
  secondaryCta,
  secondaryAction,
  hasProductCard = false,
  productCardSrc,
}: SplitSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const textBlock = textBlockRef.current;
    const ctaBlock = ctaRef.current;
    const watermarkEl = watermarkRef.current;
    const divider = dividerRef.current;
    const productCard = productCardRef.current;

    if (!section || !image || !textBlock || !ctaBlock || !watermarkEl || !divider) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        // Image enters from left
        .fromTo(image, 
          { x: '-60vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        // Divider scales in
        .fromTo(divider, 
          { scaleY: 0 }, 
          { scaleY: 1, transformOrigin: 'top' }, 
          0
        )
        // Text block enters
        .fromTo(textBlock, 
          { x: '20vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        // CTA block enters
        .fromTo(ctaBlock,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        // Watermark scales in
        .fromTo(watermarkEl, 
          { scale: 0.92, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        );

      // Product card entrance if present
      if (productCard) {
        scrollTl.fromTo(productCard, 
          { x: '40vw', opacity: 0, scale: 0.96 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'none' }, 
          0.1
        );
      }

      // SETTLE (30-70%): Hold - nothing changes

      // EXIT (70-100%)
      scrollTl
        // Image exits left
        .fromTo(image, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        // Divider exits
        .fromTo(divider, 
          { scaleY: 1, opacity: 1 }, 
          { scaleY: 0, opacity: 0, transformOrigin: 'bottom' }, 
          0.7
        )
        // Text block exits right (but CTA stays)
        .fromTo(textBlock, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        // Watermark exits
        .fromTo(watermarkEl, 
          { x: 0, opacity: 1 }, 
          { x: '8vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        );

      // Product card exit if present
      if (productCard) {
        scrollTl.fromTo(productCard, 
          { y: 0, opacity: 1 }, 
          { y: '18vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        );
      }

    }, section);

    return () => ctx.revert();
  }, [hasProductCard]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned bg-ivory"
      style={{ zIndex }}
    >
      {/* Left Portrait Image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[56vw] h-full overflow-hidden"
      >
        <RotatingImage images={images} alt={imageAlt} />
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="absolute left-[56vw] top-[10vh] h-[80vh] w-px bg-charcoal/18 origin-top"
      />

      {/* Right Text Block */}
      <div className="absolute left-[62vw] top-[18vh] w-[34vw]">
        <div ref={textBlockRef}>
          {/* Headline */}
          <div className="mb-8">
            <h2 className="heading-lg font-serif text-charcoal">
              {headline.map((line, index) => (
                <span
                  key={index}
                  className={`block ${
                    headlineAccentIndex === index ? 'text-gold' : ''
                  }`}
                >
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Body */}
          <p className="body-text text-text-secondary mb-10">
            {body}
          </p>
        </div>

        {/* CTA Row - Separate ref so it stays pinned */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <button onClick={ctaAction} className="btn-primary w-full sm:w-auto">
            {cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          {secondaryCta && (
            <button onClick={secondaryAction} className="btn-secondary w-full sm:w-auto bg-white/50 backdrop-blur-sm">
              {secondaryCta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[58vw] top-[62vh] watermark select-none pointer-events-none"
      >
        {watermark}
      </div>

      {/* Product Card (optional) */}
      {hasProductCard && productCardSrc && (
        <div
          ref={productCardRef}
          className="absolute left-[54vw] top-[56vh] w-[34vw] h-[34vh] bg-white border border-charcoal/10 shadow-card rounded-lg overflow-hidden"
        >
          <img
            src={productCardSrc}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
};

export default SplitSection;
