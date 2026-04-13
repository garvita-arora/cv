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
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just browsed through your Signature Look portfolio and I'm really impressed! 💖\n\n` +
              `I'm interested in exploring your other makeup packages. Could you help me with:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💄 What makeup packages do you offer?\n` +
              `💰 What is the pricing for each?\n` +
              `📅 What is your current availability?\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Thank you! Looking forward to your reply. 🌟`;
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
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just read about your Makeup as Self-Care philosophy on your website and I absolutely love this approach! 🌿\n\n` +
              `I'd love to know more about your routine. Could you share:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `🧖 Your step-by-step skincare prep routine?\n` +
              `🧴 Products you swear by for a gentle glow?\n` +
              `📌 Tips for making makeup feel lighter on skin?\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Thank you so much! ✨`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
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
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just came across your Makeup Academy section and I'm very excited about it! 🎨\n\n` +
              `I'd love to enroll. Could you please share:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `🎓 What courses are available? (Beginner / Advanced / Editorial)\n` +
              `📅 Upcoming batch dates & class duration?\n` +
              `💰 Fee structure & what's covered in each course?\n` +
              `📍 In-person at your studio or available online?\n` +
              `👥 Batch size / number of students?\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Really looking forward to learning from you! 🌟`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
          }}
          secondaryCta="Download brochure"
          secondaryAction={() => {
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just visited your Makeup Academy section on your website and I'm very interested! 📚\n\n` +
              `Could you please send me the full course brochure? I'd love to review:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `📄 Course list & syllabus\n` +
              `💰 Fees & payment options\n` +
              `📅 Batch schedule & timings\n` +
              `🏆 Certifications included?\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Thank you! ✨`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
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
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just browsed your Services section on your website and I'm really interested! 💄\n\n` +
              `I'd like to book a session. Here's what I'm looking for:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `📌 Service needed: [Bridal / Party / Editorial / Other]\n` +
              `📅 Event / session date: [Please mention]\n` +
              `📍 Location: [Studio / Home / Venue]\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Could you please share:\n` +
              `✅ Available service packages & pricing\n` +
              `✅ Your availability for my date\n` +
              `✅ Whether you travel to the venue\n\n` +
              `Thank you! 🌟`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
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
          ctaAction={() => {
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just saw your Studio section on your website — it looks absolutely stunning! 🏠✨\n\n` +
              `I'd love to visit the studio. Could you help me with:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `📍 Studio address & directions?\n` +
              `📅 Available visit / session slots?\n` +
              `⏰ What are your studio working hours?\n` +
              `💰 Do you offer a trial session at the studio?\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Really excited to visit! Thank you! 😊`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
          }}
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
          ctaAction={() => {
            const message =
              `Hi Garvita! 👋\n\n` +
              `I just read about your Bridal Expertise on your website — 2200+ brides in 8 years is incredible! 👰✨\n\n` +
              `I'm interested in booking a bridal makeup session. Here are my details:\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💍 Wedding date: [Please fill]\n` +
              `📅 Trial session needed: [Yes / No]\n` +
              `💏 No. of people (bride + family): [Please fill]\n` +
              `📍 Venue / location: [Studio / Home / Venue]\n` +
              `━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Could you please share:\n` +
              `✅ Bridal packages & pricing\n` +
              `✅ Availability for my wedding date\n` +
              `✅ Whether you offer on-site bridal services\n\n` +
              `Looking forward to getting bridal-ready with you! 💖`;
            window.open(`https://wa.me/919548144908?text=${encodeURIComponent(message)}`, '_blank');
          }}
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
