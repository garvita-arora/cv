// Terms & Conditions shown in the footer modal.
// Content supplied by Garvita Arora — edit the text here, not in the component.

export interface TermsSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
}

export const TERMS: TermsSection[] = [
  {
    title: 'Booking Confirmation & Advance Payment',
    paragraphs: [
      'A booking is considered confirmed only upon receipt of 50% of the total service amount as an advance. Dates and time slots will be reserved only after the advance payment is received.',
    ],
  },
  {
    title: 'Payment Terms',
    paragraphs: [
      'The remaining 50% balance must be cleared prior to the commencement of services. Work will begin only after full payment is received. No exceptions will be entertained in this regard.',
    ],
  },
  {
    title: 'Cancellation & Refund Policy',
    paragraphs: [
      'All bookings are non-refundable once confirmed.',
      'In exceptional circumstances, cancellations may be considered at our sole discretion. In such cases, the advance amount will not be refunded but may be adjusted against a future booking.',
    ],
  },
  {
    title: 'Adjustment Policy',
    paragraphs: ['Any adjusted amount for future bookings:'],
    bullets: [
      'Can be used only by the original client for whom the booking was made',
      'Is strictly non-transferable to any other individual',
      'Is subject to availability and must be utilized within a reasonable timeframe',
    ],
  },
  {
    title: 'Timeliness & Delay Charges',
    paragraphs: ['We operate on a strict schedule to ensure timely service for all clients.'],
    bullets: [
      "Any delay from the client's side in starting the service may attract additional charges",
      'Clients will be responsible for any disruptions caused due to delays',
    ],
  },
  {
    title: 'Travel & Accommodation',
    paragraphs: [
      'Travel and accommodation (if required) are not included in the service package. These expenses are to be arranged and borne by the client.',
    ],
  },
  {
    title: 'Service Count & Last-Minute Changes',
    paragraphs: [
      'The number of services (make-ups) confirmed at the time of booking will be considered final.',
    ],
    bullets: [
      'A maximum variation of 10% reduction in the agreed number will be accommodated',
      'Any reduction beyond this will still be charged up to 90% of the originally confirmed number',
    ],
    note: 'Example: If 20 make-ups are booked and only 15 are utilized, billing will be done for 18 services.',
  },
  {
    title: 'Hygiene & Skin Responsibility',
    paragraphs: [
      'Clients are requested to inform in advance of any skin conditions, allergies, or sensitivities.',
    ],
    bullets: [
      'We maintain strict hygiene standards; however, we will not be held liable for any allergic reactions or skin issues arising due to undisclosed conditions',
      'We reserve the right to refuse service in case of severe or infectious skin conditions',
    ],
  },
  {
    title: 'Photography & Usage Rights',
    paragraphs: [
      'We may capture photographs and videos of our work for portfolio, social media, and promotional purposes.',
    ],
    bullets: [
      'If the client does not wish to be featured, the same must be communicated in advance',
    ],
  },
  {
    title: 'Working Conditions at Venue',
    paragraphs: ['The client is responsible for providing a suitable working environment, including:'],
    bullets: ['Adequate lighting', 'Clean and hygienic space', 'Proper seating arrangement'],
    note: 'Any delays or compromise in service quality due to unsuitable working conditions will not be the responsibility of the artist.',
  },
];
