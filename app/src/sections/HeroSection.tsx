import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

import RotatingImage from '../components/RotatingImage';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ images = [] }: { images: string[] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const scrollHint = scrollHintRef.current;
    const divider = dividerRef.current;

    if (!section || !image || !headline || !subhead || !cta || !scrollHint || !divider) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(image, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: 0.8 }, 0.3)
        .fromTo(headline.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 }, 0.4)
        .fromTo(subhead, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.7)
        .fromTo(cta, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.9)
        .fromTo(scrollHint, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.1);

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([image, headline, subhead, cta, scrollHint, divider], {
              opacity: 1, x: 0, y: 0, scale: 1, scaleY: 1
            });
          }
        }
      });

      // ENTRANCE (0-30%): Hold at final state (load animation handled it)
      // SETTLE (30-70%): Hold
      // EXIT (70-100%): Elements exit

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
        // Headline exits right
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        // Subhead exits
        .fromTo(subhead, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        // CTA now stays visible (no exit animation)

        // Scroll hint fades early
        .fromTo(scrollHint, 
          { opacity: 1 }, 
          { opacity: 0 }, 
          0.65
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleBookSession = () => {
    const message = `Hi Garvita! I would like to book a makeup session. Could you share your availability and packages?`;
    window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAcademyInquiry = () => {
    const message = `Hi Garvita! I'm interested in exploring your makeup academy courses.`;
    window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-ivory z-10"
    >
      {/* Left Portrait Image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[56vw] h-full"
      >
        <RotatingImage images={images} alt="Garvita Arora Makeup" />
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="absolute left-[56vw] top-[10vh] h-[80vh] w-px bg-charcoal/18 origin-top"
      />

      {/* Right Text Block */}
      <div className="absolute left-[62vw] top-[18vh] w-[34vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h1 className="heading-xl font-serif text-charcoal">
            <span className="block">Makeup that</span>
            <span className="block">feels like</span>
            <span className="block text-gold">you.</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="body-text text-text-secondary mb-10"
        >
          Bridal, editorial, and everyday looks—crafted to match your mood, not mask it.
        </p>

        {/* CTA Row */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={handleBookSession} className="btn-primary w-full sm:w-auto">
            Book a session
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button onClick={handleAcademyInquiry} className="btn-secondary w-full sm:w-auto">
            Explore the academy
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute right-[4vw] bottom-[6vh] flex flex-col items-center gap-2"
      >
        <span className="label-text text-charcoal/60">Scroll</span>
        <ChevronDown className="w-5 h-5 text-charcoal/40 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
