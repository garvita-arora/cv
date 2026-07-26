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
    `Hi Garvita! I visited your website and would like to know more about your services.\n\n` +
    `*I'm interested in:* [Bridal / Party / Pre-Bridal / Academy]\n` +
    `*Preferred date:* \n\n` +
    `Thank you!`,

  booking:
    `Hi Garvita! I visited your website and would love to book a makeup session.\n\n` +
    `*Service:* [Bridal / Party / Engagement / Other]\n` +
    `*Preferred date:* \n` +
    `*Location:* Studio / Venue\n\n` +
    `Could you please share your packages and availability? Thank you!`,

  bridal:
    `Hi Garvita! I'm interested in booking bridal makeup.\n\n` +
    `*Wedding date:* \n` +
    `*No. of people (bride + family):* \n` +
    `*Location:* Studio / Venue\n\n` +
    `Could you please share your bridal packages, pricing, and availability? Thank you!`,

  packages:
    `Hi Garvita! I'm interested in your makeup packages.\n\n` +
    `*Package:* [Party / Engagement / Reception / Roka / Haldi / Mehendi / Cocktail / Sangeet]\n` +
    `*Event date:* \n` +
    `*Location:* Studio / Venue\n\n` +
    `Could you please share the pricing and availability? Thank you!`,

  preBridal:
    `Hi Garvita! I'd like to book a pre-bridal consultation.\n\n` +
    `I'm interested in your skin and hair treatments - medi-facials, bridal facial, waxing, body polishing, manicure-pedicure, hair spa, and nails.\n\n` +
    `*Preferred date:* \n` +
    `*Location:* Studio / Venue\n\n` +
    `Could you please share the packages and pricing? Thank you!`,

  academyInfo:
    `Hi Garvita! I'm interested in your makeup academy.\n\n` +
    `Could you please share:\n` +
    `- Courses offered (self / professional)\n` +
    `- Upcoming batch dates and duration\n` +
    `- Fee structure\n` +
    `- In-person or online options\n\n` +
    `Looking forward to learning from you!`,

  academyJoin:
    `Hi Garvita! I'd love to join a course at your academy.\n\n` +
    `*Course:* [Makeup (Self / Professional) / Hairstyling / Nail Extension / Hydra Facial]\n` +
    `*Preferred batch:* \n\n` +
    `Could you please share the fee structure and upcoming batch dates? Thank you!`,

  studio:
    `Hi Garvita! I'd love to visit your studio.\n\n` +
    `Could you please share:\n` +
    `- The studio address and directions\n` +
    `- Available slots and working hours\n\n` +
    `Thank you!`,

  feedback:
    `Hi Garvita! I'd love to share my feedback about my experience with your services.`,
};
