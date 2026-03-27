import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RotatingImage from '../components/RotatingImage';

gsap.registerPlugin(ScrollTrigger);

interface FullBleedSectionProps {
  id: string;
  images: string[];
  imageAlt: string;
  headline: string;
  microcopy: string;
  zIndex: number;
}

const FullBleedSection = ({
  id,
  images,
  imageAlt,
  headline,
  microcopy,
  zIndex,
}: FullBleedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headlineEl = headlineRef.current;
    const label = labelRef.current;
    const microcopyEl = microcopyRef.current;

    if (!section || !bg || !headlineEl || !label || !microcopyEl) return;

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
        // Background scales in
        .fromTo(bg, 
          { scale: 1.10, opacity: 0 }, 
          { scale: 1.00, opacity: 1, ease: 'none' }, 
          0
        )
        // Headline rises from bottom
        .fromTo(headlineEl, 
          { y: '40vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        // Label fades in
        .fromTo(label, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        // Microcopy fades in
        .fromTo(microcopyEl, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        // Background scales out
        .fromTo(bg, 
          { scale: 1.00, opacity: 1 }, 
          { scale: 1.06, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        // Headline exits up
        .fromTo(headlineEl, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        // Label exits
        .fromTo(label, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        // Microcopy exits
        .fromTo(microcopyEl, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex }}
    >
      {/* Full-bleed Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <RotatingImage images={images} alt={imageAlt} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Top-left Label */}
      <div
        ref={labelRef}
        className="absolute left-[6vw] top-[8vh]"
      >
        <span className="label-text text-ivory/80">Garvita Arora</span>
      </div>

      {/* Center Headline */}
      <h2
        ref={headlineRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 font-serif text-ivory text-center"
        style={{
          fontSize: 'clamp(72px, 10vw, 160px)',
          textShadow: '0 4px 30px rgba(0,0,0,0.3)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {headline}
      </h2>

      {/* Bottom-left Microcopy */}
      <p
        ref={microcopyRef}
        className="absolute left-[6vw] bottom-[10vh] max-w-[38ch] text-ivory/90 text-base leading-relaxed"
      >
        {microcopy}
      </p>
    </section>
  );
};

export default FullBleedSection;
