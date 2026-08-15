import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { TERMS } from '../data/terms';

// Opened from anywhere (e.g. the footer link) without prop drilling.
// Rendered at App level, outside #smooth-wrapper, so position: fixed works
// while ScrollSmoother transforms the page content on desktop.
export const openTerms = () => {
  window.dispatchEvent(new Event('open-terms'));
};

const TermsModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-terms', handler);
    return () => window.removeEventListener('open-terms', handler);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Terms and Conditions"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={close} />

      {/* Card */}
      <div className="relative w-full sm:max-w-2xl bg-ivory rounded-t-2xl sm:rounded-2xl shadow-card max-h-[88vh] flex flex-col">
        {/* Header (sticky while the terms scroll) */}
        <div className="flex items-start justify-between gap-4 px-6 sm:px-10 pt-6 sm:pt-8 pb-4 border-b border-charcoal/10">
          <div>
            <p className="label-text text-gold mb-2">Garvita Arora</p>
            <h3 className="font-serif text-3xl text-charcoal">Terms &amp; Conditions</h3>
          </div>
          <button
            onClick={close}
            className="shrink-0 w-9 h-9 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:text-gold hover:border-gold transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-6 space-y-8">
          {TERMS.map((section, index) => (
            <section key={section.title}>
              <h4 className="font-serif text-xl text-charcoal mb-3 flex gap-3">
                <span className="text-gold shrink-0">{index + 1}.</span>
                <span>{section.title}</span>
              </h4>

              <div className="pl-0 sm:pl-8 space-y-3">
                {section.paragraphs?.map(paragraph => (
                  <p key={paragraph} className="text-charcoal/75 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map(bullet => (
                      <li key={bullet} className="flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-[7px]" />
                        <span className="text-charcoal/75 text-sm leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <p className="text-charcoal/70 text-sm leading-relaxed italic border-l-2 border-gold/40 pl-4 py-1">
                    {section.note}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-10 py-4 border-t border-charcoal/10">
          <button onClick={close} className="btn-primary w-full sm:w-auto">
            I understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
