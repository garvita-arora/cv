import { useState, useEffect, useCallback } from 'react';
import { X, MessageCircle } from 'lucide-react';
import {
  openWhatsApp,
  buildEnquiryMessage,
  type EnquiryType,
  type EnquiryData,
} from '../lib/whatsapp';

interface FieldDef {
  key: keyof EnquiryData;
  label: string;
  kind: 'select' | 'date' | 'number' | 'chips';
  options?: string[];
  placeholder?: string;
}

const SERVICE_OPTIONS = [
  'Bridal Makeup',
  'Party Makeup',
  'Engagement / Reception Makeup',
  'Roka / Haldi / Mehndi Makeup',
  'Cocktail / Sangeet Makeup',
  'Groom Makeup',
  'Other',
];

const PACKAGE_OPTIONS = [
  'Party Makeup',
  'Engagement / Reception Makeup',
  'Roka / Haldi / Mehndi Makeup',
  'Cocktail / Sangeet Makeup',
];

const COURSE_OPTIONS = [
  'Makeup Course (Self)',
  'Makeup Course (Professional)',
  'Hairstyling Course',
  'Nail Extension Course',
  'Hydra Facial Course',
];

const BATCH_OPTIONS = ['Weekday batch', 'Weekend batch', 'Flexible'];

const CONFIG: Record<EnquiryType, { title: string; subtitle: string; fields: FieldDef[] }> = {
  booking: {
    title: 'Book a session',
    subtitle: "Pick what suits you — we'll reply with packages and availability.",
    fields: [
      { key: 'service', label: 'Service', kind: 'select', options: SERVICE_OPTIONS },
      { key: 'date', label: 'Preferred date', kind: 'date' },
      { key: 'location', label: 'Location', kind: 'chips', options: ['Studio', 'Venue'] },
    ],
  },
  bridal: {
    title: 'Bridal enquiry',
    subtitle: "Share your date — we'll reply with packages, pricing, and availability.",
    fields: [
      { key: 'date', label: 'Wedding date', kind: 'date' },
      { key: 'people', label: 'No. of people (bride + family)', kind: 'number', placeholder: 'e.g. 4' },
      { key: 'location', label: 'Location', kind: 'chips', options: ['Studio', 'Venue'] },
    ],
  },
  packages: {
    title: 'Book a makeup package',
    subtitle: "Choose your occasion — we'll reply with pricing and availability.",
    fields: [
      { key: 'service', label: 'Package', kind: 'select', options: PACKAGE_OPTIONS },
      { key: 'date', label: 'Event date', kind: 'date' },
      { key: 'location', label: 'Location', kind: 'chips', options: ['Studio', 'Venue'] },
    ],
  },
  preBridal: {
    title: 'Pre-bridal consultation',
    subtitle: 'Skin & hair treatments, medi-facials, waxing, mani-pedi, hair spa, and more.',
    fields: [
      { key: 'date', label: 'Preferred date', kind: 'date' },
      { key: 'location', label: 'Location', kind: 'chips', options: ['Studio', 'Venue'] },
    ],
  },
  academyJoin: {
    title: 'Join the academy',
    subtitle: "Pick a course — we'll reply with fees and upcoming batch dates.",
    fields: [
      { key: 'course', label: 'Course', kind: 'select', options: COURSE_OPTIONS },
      { key: 'batch', label: 'Preferred batch', kind: 'chips', options: BATCH_OPTIONS },
    ],
  },
  studio: {
    title: 'Book a studio visit',
    subtitle: "Tell us when you'd like to come by — we'll share the address and slots.",
    fields: [{ key: 'date', label: 'Preferred visit date', kind: 'date' }],
  },
};

const inputClass =
  'w-full px-4 py-3 bg-transparent border-b-2 border-charcoal/20 focus:border-gold outline-none transition-colors text-charcoal';

const EnquiryModal = () => {
  const [type, setType] = useState<EnquiryType | null>(null);
  const [data, setData] = useState<EnquiryData>({});

  useEffect(() => {
    const handler = (e: Event) => {
      setData({});
      setType((e as CustomEvent<EnquiryType>).detail);
    };
    window.addEventListener('open-enquiry', handler);
    return () => window.removeEventListener('open-enquiry', handler);
  }, []);

  const close = useCallback(() => setType(null), []);

  useEffect(() => {
    if (!type) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [type, close]);

  if (!type) return null;

  const config = CONFIG[type];

  const setField = (key: keyof EnquiryData, value: string) =>
    setData(prev => ({ ...prev, [key]: value }));

  const handleSend = () => {
    openWhatsApp(buildEnquiryMessage(type, data));
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={close} />

      {/* Card */}
      <div className="relative w-full sm:max-w-md bg-ivory rounded-t-2xl sm:rounded-2xl shadow-card p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:text-gold hover:border-gold transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-serif text-3xl text-charcoal mb-2 pr-10">{config.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">{config.subtitle}</p>

        <div className="space-y-5">
          {config.fields.map(field => (
            <div key={field.key}>
              <label className="label-text text-charcoal/70 mb-2 block">{field.label}</label>

              {field.kind === 'select' && (
                <select
                  value={(data[field.key] as string) ?? ''}
                  onChange={e => setField(field.key, e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="">Select...</option>
                  {field.options!.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {field.kind === 'date' && (
                <input
                  type="date"
                  value={(data[field.key] as string) ?? ''}
                  onChange={e => setField(field.key, e.target.value)}
                  className={inputClass}
                />
              )}

              {field.kind === 'number' && (
                <input
                  type="number"
                  min={1}
                  placeholder={field.placeholder}
                  value={(data[field.key] as string) ?? ''}
                  onChange={e => setField(field.key, e.target.value)}
                  className={inputClass}
                />
              )}

              {field.kind === 'chips' && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {field.options!.map(option => {
                    const selected = data[field.key] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setField(field.key, selected ? '' : option)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                          selected
                            ? 'bg-gold border-gold text-white shadow-md'
                            : 'border-charcoal/20 text-charcoal/80 hover:border-gold hover:text-gold'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleSend} className="btn-primary w-full mt-8">
          Send on WhatsApp
          <MessageCircle className="w-4 h-4 ml-2" />
        </button>
        <p className="text-text-secondary text-xs text-center mt-3">
          WhatsApp opens with your message ready to send — nothing to type.
        </p>
      </div>
    </div>
  );
};

export default EnquiryModal;
