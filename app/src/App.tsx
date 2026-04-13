import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';

import Navigation from './components/Navigation';
import FloatingSocial from './components/FloatingSocial';
import HeroSection from './sections/HeroSection';
import SplitSection from './sections/SplitSection';
import FullBleedSection from './sections/FullBleedSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

// Load all images statically via Vite at build time
const allImagesGlob = import.meta.glob('/public/images/**/*.{jpg,jpeg,png,webp}', { eager: true });
const getSectionImages = (section: string) => {
  return Object.keys(allImagesGlob)
    .filter(p => p.startsWith(`/public/images/${section}/`))
    .map(p => p.replace('/public', ''));
};

function App() {
  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges with centers
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Toast notifications */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#F6F2EA',
            color: '#111111',
            border: '1px solid rgba(17,17,17,0.1)',
          },
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection images={getSectionImages('hero').length > 0 ? getSectionImages('hero') : getSectionImages('portfolio')} />

        {/* Section 2: Signature Look */}
        <SplitSection
          id="portfolio"
          images={getSectionImages('portfolio')}
          imageAlt="Signature makeup look"
          headline={['Signature', 'look.']}
          body="A clean base, sculpted features, and a lip that stays put from vows to reception."
          cta="See bridal packages"
          ctaAction={() => scrollToSection('#bridal')}
          secondaryCta="Other makeup packages"
          secondaryAction={() => {
            const message = `Hi Garvita! I'd love to know more about your other makeup packages and services.`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
          }}
          watermark="GLAM"
          zIndex={20}
        />

        {/* Section 3: Self Care */}
        <SplitSection
          id="selfcare"
          images={getSectionImages('selfcare')}
          imageAlt="Makeup as self-care"
          headline={['Makeup', 'as', 'self-care.']}
          body="We prep, layer, and set with products that treat your skin gently—so the glow lasts without the weight."
          cta="Read the routine"
          ctaAction={() => {
            const message = `Hi Garvita! I'm interested in learning more about your skincare and makeup prep routine.`;
            window.open(`https://wa.me/919548144908?text=${message}`, '_blank');
          }}
          watermark="GLOW"
          zIndex={30}
        />

        {/* Section 4: Academy */}
        <SplitSection
          id="academy"
          images={getSectionImages('academy')}
          imageAlt="Learn the craft"
          headline={['Learn the', 'craft.']}
          body="From beginner essentials to advanced editorial—small batches, live demos, and feedback that actually improves your hand."
          cta="View courses"
          ctaAction={() => {
            const message = `Hi Garvita! I'm interested in enrolling in your Makeup Academy courses. Could you share the details and pricing?`;
            window.open(`https://wa.me/919548144908?text=${message}`, '_blank');
          }}
          secondaryCta="Download brochure"
          secondaryAction={() => {
            const message = `Hi Garvita! Could you please share the Makeup Academy brochure with me?`;
            window.open(`https://wa.me/919548144908?text=${message}`, '_blank');
          }}
          watermark="LEARN"
          zIndex={40}
        />

        {/* Section 5: Services */}
        <SplitSection
          id="services"
          images={getSectionImages('services')}
          imageAlt="Services tailored for you"
          headline={['Services', 'tailored', 'for you.']}
          body="From bridal trials to editorial sessions—every service is personalised to bring out your best look."
          cta="Book a service"
          ctaAction={() => {
            const message = `Hi Garvita! I'd love to learn more about your services and book a session.`;
            window.open(`https://wa.me/919548144908?text=${message}`, '_blank');
          }}
          watermark="SERVE"
          zIndex={50}
        />

        {/* Section 6: Studio */}
        <SplitSection
          id="studio"
          images={getSectionImages('studio')}
          imageAlt="A space built for calm"
          headline={['A space', 'built for', 'calm.']}
          body="Natural light, clean stations, and a workflow designed to keep your day effortless."
          cta="Book a studio visit"
          ctaAction={() => scrollToSection('#contact')}
          watermark="STUDIO"
          zIndex={60}
        />

        {/* Section 7: Bridal */}
        <SplitSection
          id="bridal"
          images={getSectionImages('bridal')}
          imageAlt="Bridal expertise"
          headline={['Bridal', 'expertise.']}
          body="We've done 2200+ bride's in the past 8 years. Trials that answer your questions. Wedding-day timing that respects the schedule. Makeup that photographs true to life."
          cta="Book a session"
          ctaAction={() => scrollToSection('#contact')}
          watermark="BRIDE"
          zIndex={70}
        />

        {/* Section 8: Makeup (Full-bleed) */}
        <FullBleedSection
          id="makeup"
          images={getSectionImages('makeup')}
          imageAlt="Makeup artistry"
          headline="MAKEUP"
          microcopy="Precision, balance, and a finish that moves with you."
          zIndex={80}
        />

        {/* Section 9: Artist (Full-bleed) */}
        <FullBleedSection
          id="artist"
          images={getSectionImages('artist')}
          imageAlt="The artist"
          headline="ARTIST"
          microcopy="Years of editorial, bridal, and backstage work—distilled into a method that's reliable and personal."
          zIndex={90}
        />

        {/* Section 10: Beauty (Full-bleed) */}
        <FullBleedSection
          id="beauty"
          images={getSectionImages('beauty')}
          imageAlt="Beauty"
          headline="BEAUTY"
          microcopy="Not overdone. Not underdone. Exactly right for the moment."
          zIndex={100}
        />

        {/* Section 11: Signature (Full-bleed) */}
        <FullBleedSection
          id="signature"
          images={getSectionImages('signature')}
          imageAlt="Garvita Arora"
          headline="GARVITA ARORA"
          microcopy="Book a session, join a course, or shop the kit—everything starts with a conversation."
          zIndex={110}
        />

        {/* Section 12: Contact (Flowing) */}
        <ContactSection />
      </main>

      {/* Floating Social Buttons */}
      <FloatingSocial />
    </div>
  );
}

export default App;
