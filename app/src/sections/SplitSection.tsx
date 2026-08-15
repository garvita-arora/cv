import { useRef, useLayoutEffect, useState } from 'react';
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
  body?: string;
  items?: string[];
  cta: string;
  ctaAction?: () => void;
  watermark: string;
  zIndex: number;
  secondaryCta?: string;
  secondaryAction?: () => void;
  revealItems?: string[];
  revealCta?: string;
  revealCtaAction?: () => void;
  feedbackTitle?: string;
  feedbackNote?: string;
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
  items,
  cta,
  ctaAction,
  watermark,
  zIndex,
  secondaryCta,
  secondaryAction,
  revealItems,
  revealCta,
  revealCtaAction,
  feedbackTitle,
  feedbackNote,
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

  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const textBlock = textBlockRef.current;
    const ctaBlock = ctaRef.current;
    const watermarkEl = watermarkRef.current;
    const divider = dividerRef.current;
    const productCard = productCardRef.current;

    if (!section || !image || !textBlock || !ctaBlock || !watermarkEl || !divider) return;

    const mm = gsap.matchMedia();

    // Mobile: no pinning — everything stays visible with a light fade-up entrance.
    // The scrubbed opacity timelines below would leave photos/text invisible
    // between pins, which reads as broken on touch scrolling.
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo([image, textBlock, ctaBlock],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Desktop: pinned cinematic scrub timeline
    mm.add('(min-width: 1024px)', () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=40%',
          pin: true,
          scrub: 1,
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
    });

    return () => mm.revert();
  }, [hasProductCard]);

  const isRevealMode = !!revealItems && revealItems.length > 0;
  const primaryLabel = isRevealMode && revealed ? (revealCta ?? cta) : cta;

  const handlePrimary = () => {
    if (isRevealMode && !revealed) {
      setRevealed(true);
      return;
    }
    if (isRevealMode && revealed) {
      revealCtaAction?.();
      return;
    }
    ctaAction?.();
  };

  // Long lists need a tighter mobile layout (shorter image strip, denser list)
  // or the content overflows the fixed-height section on small phones.
  const longestList = Math.max(items?.length ?? 0, revealItems?.length ?? 0);
  const compact = longestList > 4;

  const renderList = (list: string[]) => (
    <ul className={`${compact ? 'space-y-1.5' : 'space-y-2'} lg:space-y-3 mb-5 lg:mb-10`}>
      {list.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          <span className={`text-charcoal/85 ${compact ? 'text-[13px]' : 'text-sm'} lg:text-base leading-snug lg:leading-relaxed`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned bg-ivory"
      style={{ zIndex }}
    >
      {/* Portrait Image: top strip on mobile, left column on desktop */}
      <div
        ref={imageRef}
        className={`absolute left-0 top-0 w-full ${compact ? 'h-[27svh]' : 'h-[38svh]'} lg:w-[56vw] lg:h-full overflow-hidden`}
      >
        <RotatingImage images={images} alt={imageAlt} />
      </div>

      {/* Vertical Divider (desktop only) */}
      <div
        ref={dividerRef}
        className="hidden lg:block absolute left-[56vw] top-[10vh] h-[80vh] w-px bg-charcoal/18 origin-top"
      />

      {/* Text Block: below image on mobile, right column on desktop */}
      <div className={`absolute left-0 right-0 ${compact ? 'top-[31svh]' : 'top-[42svh]'} px-6 lg:left-[62vw] lg:right-auto lg:top-[18vh] lg:px-0 lg:w-[34vw]`}>
        <div ref={textBlockRef}>
          {/* Headline */}
          <div className={`${compact ? 'mb-3' : 'mb-4'} lg:mb-8`}>
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

          {/* Body / Lists */}
          {isRevealMode && revealed ? (
            renderList(revealItems)
          ) : (
            <>
              {body && (
                <p className={`body-text text-text-secondary text-sm lg:text-base ${items ? 'mb-4 lg:mb-6' : 'mb-6 lg:mb-10'}`}>
                  {body}
                </p>
              )}
              {items && renderList(items)}
            </>
          )}
        </div>

        {/* CTA Row - Separate ref so it stays pinned */}
        <div ref={ctaRef} className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={handlePrimary} className="btn-primary w-full sm:w-auto">
              {primaryLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            {secondaryCta && (
              <button onClick={secondaryAction} className="btn-secondary w-full sm:w-auto bg-white/50 backdrop-blur-sm">
                {secondaryCta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>

          {/* Feedback column (e.g. bride's feedback) */}
          {feedbackTitle && (
            <div className="mt-5 lg:mt-8 pt-4 lg:pt-6 border-t border-charcoal/10 max-w-[40ch]">
              <p className="label-text text-gold mb-2">{feedbackTitle}</p>
              <p className="text-text-secondary text-xs lg:text-sm leading-relaxed">{feedbackNote}</p>
            </div>
          )}
        </div>
      </div>

      {/* Watermark (desktop only) */}
      <div
        ref={watermarkRef}
        className="hidden lg:block absolute left-[58vw] top-[62vh] watermark select-none pointer-events-none"
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
