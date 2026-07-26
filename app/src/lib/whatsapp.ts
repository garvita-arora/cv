// Single source of truth for the business WhatsApp number and all message
// templates. Templates are deliberately emoji-free and use only plain ASCII
// punctuation plus WhatsApp *bold* markers — decorative emoji and box-drawing
// characters render as broken boxes on WhatsApp Desktop/Web on some PCs.

const PHONE = '919548144908';

export const waLink = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string) => {
  window.open(waLink(message), '_blank');
};

export const WA_MESSAGES = {
  general:
    `Hi Garvita! I visited your website and would like to know more about your services. ` +
    `Could you please share the details? Thank you!`,

  academyInfo:
    `Hi Garvita! I'm interested in your makeup academy.\n\n` +
    `Could you please share:\n` +
    `- Courses offered (self / professional)\n` +
    `- Upcoming batch dates and duration\n` +
    `- Fee structure\n` +
    `- In-person or online options\n\n` +
    `Looking forward to learning from you!`,

  feedback:
    `Hi Garvita! I'd love to share my feedback about my experience with your services.`,
};

// ---------------------------------------------------------------------------
// Guided enquiries: CTAs open the EnquiryModal, which collects the details
// with simple pickers and builds a complete message — the user never has to
// edit blanks inside WhatsApp.
// ---------------------------------------------------------------------------

export type EnquiryType =
  | 'booking'
  | 'bridal'
  | 'packages'
  | 'preBridal'
  | 'academyJoin'
  | 'studio';

export interface EnquiryData {
  service?: string;
  date?: string; // yyyy-mm-dd from <input type="date">
  people?: string;
  location?: string;
  course?: string;
  batch?: string;
}

export const openEnquiry = (type: EnquiryType) => {
  window.dispatchEvent(new CustomEvent<EnquiryType>('open-enquiry', { detail: type }));
};

const fmtDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const line = (label: string, value?: string) => (value ? `*${label}:* ${value}\n` : '');

export const buildEnquiryMessage = (type: EnquiryType, d: EnquiryData): string => {
  switch (type) {
    case 'booking':
      return (
        `Hi Garvita! I visited your website and would love to book a makeup session.\n\n` +
        line('Service', d.service) +
        line('Preferred date', fmtDate(d.date)) +
        line('Location', d.location) +
        `\nCould you please share your packages and availability? Thank you!`
      );
    case 'bridal':
      return (
        `Hi Garvita! I'm interested in booking bridal makeup.\n\n` +
        line('Wedding date', fmtDate(d.date)) +
        line('No. of people (bride + family)', d.people) +
        line('Location', d.location) +
        `\nCould you please share your bridal packages, pricing, and availability? Thank you!`
      );
    case 'packages':
      return (
        `Hi Garvita! I'm interested in your makeup packages.\n\n` +
        line('Package', d.service) +
        line('Event date', fmtDate(d.date)) +
        line('Location', d.location) +
        `\nCould you please share the pricing and availability? Thank you!`
      );
    case 'preBridal':
      return (
        `Hi Garvita! I'd like to book a pre-bridal consultation.\n\n` +
        `I'm interested in your skin and hair treatments - medi-facials, bridal facial, waxing, body polishing, manicure-pedicure, hair spa, and nails.\n\n` +
        line('Preferred date', fmtDate(d.date)) +
        line('Location', d.location) +
        `\nCould you please share the packages and pricing? Thank you!`
      );
    case 'academyJoin':
      return (
        `Hi Garvita! I'd love to join a course at your academy.\n\n` +
        line('Course', d.course) +
        line('Preferred batch', d.batch) +
        `\nCould you please share the fee structure and upcoming batch dates? Thank you!`
      );
    case 'studio':
      return (
        `Hi Garvita! I'd love to visit your studio.\n\n` +
        line('Preferred visit date', fmtDate(d.date)) +
        `\nCould you please share the address, directions, and your working hours? Thank you!`
      );
  }
};
