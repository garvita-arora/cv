import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  'For me, artistry was never something I chose—it was something I was born into.',
  'Raised in an environment where beauty met precision every single day, I grew up watching my mother—an accomplished makeup artist with over 28 years of experience—transform not just faces, but confidence itself. What began as quiet observation soon turned into hands-on learning. From assisting her at a young age to gradually taking on real responsibilities, my journey into makeup artistry started long before it became my profession.',
  'Creativity has always been my strongest instinct. During my school years, art wasn’t just a subject—it was my identity. I consistently excelled in art competitions and was often entrusted with projects that demanded both skill and vision. That deep-rooted passion naturally evolved into the world of makeup, where art meets individuality.',
  'At the age of 13, I completed my first party makeup—an early milestone that hinted at what was to come. By the time I reached 10th grade, I had already worked on my first bride. That experience defined my direction. From that moment onward, this was never just a skill—it became my purpose.',
  'After years of rigorous practical learning, I elevated my craft by becoming an internationally certified professional makeup artist—a distinction that set me apart as the first in my district to achieve global standards in makeup artistry. This certification refined my approach, bringing in international techniques, advanced hygiene protocols, and a deeper understanding of diverse skin types and aesthetics.',
  'Recognizing that true beauty goes beyond makeup, I expanded my expertise into advanced skincare. I pursued professional training in aesthetics from the prestigious Dadu Medical Centre under the mentorship of Dr. Nivedita Dadu. This led me to become the first certified skin aesthetician in my district, and among the pioneers to introduce advanced treatments like Hydra facials in the region—bridging the gap between makeup and skin science.',
  'Today, my work stands at the intersection of experience, expertise, and trust. I have personally worked on over 2,200 brides, catering to weddings across India’s most sought-after destinations including Jaipur, Pushkar, Delhi, Gurgaon, Jim Corbett, and Mussoorie.',
  'Beyond my clientele, I have also mentored 100+ aspiring artists, shaping the next generation through both self-makeup and professional courses.',
  'What truly defines my brand is consistency and client trust. With a client retention rate of over 85% and a customer satisfaction rate exceeding 95%, my approach is rooted in delivering a seamless, personalized, and premium experience—every single time.',
  'I continuously study market trends, evolving client expectations, and emerging techniques to ensure that my services remain not just relevant, but ahead of the curve. Whether it’s bridal artistry, advanced skin treatments, or professional education, my commitment is unwavering—to deliver excellence with precision and authenticity.',
];

const StorySection = ({ image }: { image?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-ivory py-20 lg:py-32"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-10 lg:gap-16 items-start">
          {/* Artist Image */}
          {image && (
            <div className="lg:sticky lg:top-28">
              <div className="rounded-xl overflow-hidden shadow-card aspect-[3/4]">
                <img
                  src={image}
                  alt="Garvita Arora"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* Story Text */}
          <div className={image ? '' : 'lg:col-span-2 max-w-3xl mx-auto'}>
            <p className="label-text text-gold mb-4">Know the Story</p>
            <h2 className="heading-lg font-serif text-charcoal mb-10">
              Know the Artist.
            </h2>

            {visibleParagraphs.map((para, index) => (
              <p
                key={index}
                className={`leading-relaxed mb-6 ${
                  index === 0
                    ? 'font-serif text-2xl lg:text-3xl text-charcoal'
                    : 'text-charcoal/75 text-base lg:text-lg'
                }`}
              >
                {para}
              </p>
            ))}

            {!expanded ? (
              <button
                onClick={() => setExpanded(true)}
                className="text-link mt-2"
              >
                Read the full story
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <p className="font-serif italic text-xl lg:text-2xl text-gold mt-10 leading-snug">
                Because true luxury in beauty is not just about how you look—
                <br className="hidden lg:block" />
                it&rsquo;s about how confidently you carry it.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
