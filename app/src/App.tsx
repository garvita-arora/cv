import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Toaster } from 'sonner';

import Navigation from './components/Navigation';
import FloatingSocial from './components/FloatingSocial';
import HeroSection from './sections/HeroSection';
import SplitSection from './sections/SplitSection';
import FullBleedSection from './sections/FullBleedSection';
import TestimonialsSection from './sections/TestimonialsSection';
import StorySection from './sections/StorySection';
import ContactSection from './sections/ContactSection';
import { smoothScrollTo } from './lib/scroll';
import { openEnquiry } from './lib/whatsapp';
import EnquiryModal from './components/EnquiryModal';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Prevent jarring ScrollTrigger refreshes when the mobile address bar shows/hides
ScrollTrigger.config({ ignoreMobileResize: true });

// Load all images statically via Vite at build time
const allImagesGlob = import.meta.glob('/public/images/**/*.{jpg,jpeg,png,webp}', { eager: true });
const getSectionImages = (section: string) => {
  return Object.keys(allImagesGlob)
    .filter(p => p.startsWith(`/public/images/${section}/`))
    .map(p => p.replace('/public', ''));
};

function App() {
  // Smooth (lerped) scrolling — desktop pointers only. Phones/tablets keep
  // fully native scrolling, which is smoother and more reliable on touch.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(hover: hover) and (pointer: fine)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: false,
      });
      ScrollTrigger.refresh();

      return () => {
        smoother.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Global scroll snap for pinned sections.
  // Ranges are recomputed on every snap evaluation so they stay correct even
  // when the page height changes after load (e.g. expanding the story section).
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const maxScroll = ScrollTrigger.maxScroll(window);
            if (!maxScroll) return value;

            const pinnedRanges = ScrollTrigger.getAll()
              .filter(st => st.vars.pin)
              .map(st => ({
                start: st.start / maxScroll,
                end: (st.end ?? st.start) / maxScroll,
                center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
              }));

            if (pinnedRanges.length === 0) return value;

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
          duration: { min: 0.4, max: 0.8 },
          delay: 0.1,
          ease: 'power2.inOut',
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
    smoothScrollTo(id);
  };

  // MAKEUP full-bleed absorbs part of the old BEAUTY slide (some pictures, not all)
  const makeupImages = [
    ...getSectionImages('makeup'),
    ...getSectionImages('beauty').slice(0, 3),
  ];

  // Pre-bridal slide combines selfcare + pre-bridal imagery
  const preBridalImages = [
    ...getSectionImages('selfcare'),
    ...getSectionImages('pre-bridal'),
  ];

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

      {/* Main Content (wrapped for ScrollSmoother) */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
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
          secondaryAction={() => scrollToSection('#packages')}
          watermark="GLAM"
          zIndex={20}
        />

        {/* Section 3: Pre-Bridal as Self-Care */}
        <SplitSection
          id="selfcare"
          images={preBridalImages}
          imageAlt="Pre-bridal self-care"
          headline={['Pre-Bridal', 'as', 'self-care.']}
          body="Skin and hair treatments, medi-facials and bridal facials, waxing, body polishing, manicure–pedicure, hair spa, and nails—every ritual designed to have you glowing long before the big day."
          cta="Book consultation"
          ctaAction={() => openEnquiry('preBridal')}
          watermark="GLOW"
          zIndex={30}
        />

        {/* Section 4: Academy */}
        <SplitSection
          id="academy"
          images={getSectionImages('academy')}
          imageAlt="Learn the craft"
          headline={['Learn the', 'craft.']}
          body="From beginner essentials to advanced professional artistry—small batches, live demos, and feedback that actually improves your hand."
          cta="View courses"
          revealItems={[
            'Makeup courses (Self / Professional)',
            'Hairstyling course',
            'Nail extension course',
            'Hydra Facial course',
          ]}
          revealCta="Join now"
          revealCtaAction={() => openEnquiry('academyJoin')}
          secondaryCta="Student testimonials"
          secondaryAction={() => scrollToSection('#testimonials')}
          watermark="LEARN"
          zIndex={40}
        />

        {/* Section 5: Studio */}
        <SplitSection
          id="studio"
          images={getSectionImages('studio')}
          imageAlt="A space built for calm"
          headline={['A space', 'built for', 'calm.']}
          body="Natural light, clean stations, and a workflow designed to keep your day effortless."
          cta="Book a studio visit"
          ctaAction={() => openEnquiry('studio')}
          watermark="STUDIO"
          zIndex={50}
        />

        {/* Section 6: Bridal */}
        <SplitSection
          id="bridal"
          images={getSectionImages('bridal')}
          imageAlt="Bridal expertise"
          headline={['Bridal', 'expertise.']}
          body="We've done 2200+ brides in the past 8 years. Wedding-day timing that respects the schedule. Makeup that photographs true to life."
          cta="Book a session"
          ctaAction={() => openEnquiry('bridal')}
          feedbackTitle="Bride's Feedback"
          feedbackNote={`"It was exactly what I had dreamed of, and I still can't believe it stayed flawless even after hours." — Stuti J.`}
          watermark="BRIDE"
          zIndex={60}
        />

        {/* Section 7: Other Makeup Packages (integrated with bridal) */}
        <SplitSection
          id="packages"
          images={getSectionImages('makeup')}
          imageAlt="Makeup packages"
          headline={['Other makeup', 'packages.']}
          items={[
            'Party makeup',
            'Engagement / Reception makeup',
            'Roka / Haldi / Mehendi makeup',
            'Cocktail / Sangeet makeup',
          ]}
          cta="Book a session"
          ctaAction={() => openEnquiry('packages')}
          watermark="STYLE"
          zIndex={70}
        />

        {/* Section 8: Makeup (Full-bleed, absorbs the old Beauty slide) */}
        <FullBleedSection
          id="makeup"
          images={makeupImages}
          imageAlt="Makeup artistry"
          headline="MAKEUP"
          microcopy="Precision, balance, and a finish that moves with you. Not overdone, not underdone—exactly right for the moment."
          zIndex={80}
        />

        {/* Section 9: Artist (Full-bleed) */}
        <FullBleedSection
          id="artist"
          images={getSectionImages('artist')}
          imageAlt="The artist"
          headline="ARTIST"
          microcopy="Years of bridal, non-bridal, and skin & hair treatment expertise—distilled into a method that's reliable and personal."
          zIndex={90}
        />

        {/* Section 10: Signature (Full-bleed) */}
        <FullBleedSection
          id="signature"
          images={getSectionImages('signature')}
          imageAlt="Garvita Arora"
          headline="GARVITA ARORA"
          microcopy="Book a session, join a course, or visit the studio—everything starts with a conversation."
          zIndex={100}
        />

        {/* Section 11: Testimonials (Flowing) */}
        <TestimonialsSection />

        {/* Section 12: Know the Story (Flowing) */}
        <StorySection image={getSectionImages('artist')[0]} />

        {/* Section 13: Contact (Flowing) */}
        <ContactSection />
          </main>
        </div>
      </div>

      {/* Floating Social Buttons */}
      <FloatingSocial />

      {/* Guided enquiry dialog (fixed — must stay outside the smooth wrapper) */}
      <EnquiryModal />
    </div>
  );
}

export default App;
