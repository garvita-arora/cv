// Real client feedback shared with Garvita over WhatsApp and Instagram.
// Lightly trimmed for length and stripped of emoji; wording is otherwise the
// clients' own. Names use first name + last initial for privacy — swap to full
// names here if clients have given permission.
//
// To add a testimonial: append an entry below. The section picks up new
// entries automatically, including the category filter counts.

export type TestimonialCategory = 'Bridal' | 'Party & Events' | 'Academy';

export interface Testimonial {
  quote: string;
  name: string;
  service: string;
  category: TestimonialCategory;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Thank you so much for making me feel so beautiful on my special day! I absolutely loved the makeup — it was exactly what I had dreamed of, and I still can't believe it stayed flawless even after hours. Your talent, dedication, and attention to every little detail truly made me feel so confident and special. A very special thank you to Aunty for the gorgeous braided hairstyle — it stayed perfectly in place throughout the day and completed my bridal look so beautifully.",
    name: 'Stuti J.',
    service: 'Bridal Makeup',
    category: 'Bridal',
  },
  {
    quote:
      "This was honestly the best makeup I have ever had! Every detail was done with so much perfection — from the flawless base to the beautifully blended eye makeup and the lip shade that matched me perfectly. The look stayed fresh and radiant for hours without feeling heavy. Thank you for enhancing my natural features instead of covering them, and for understanding exactly what I wanted. This experience has set a new standard for me.",
    name: 'Preeti K.',
    service: 'Makeup Session',
    category: 'Party & Events',
  },
  {
    quote:
      "Thank you so much for making me so beautiful on my special day. Even my in-laws appreciated the makeup so much. Very flawless and natural soft look, and the best part is it stays exactly the same till the end. Meri toh wedding ki bhi booking done kar lena, aapse hi karvana hai!",
    name: 'Happy Bride',
    service: 'Bridal Makeup',
    category: 'Bridal',
  },
  {
    quote:
      'Beautiful long-lasting makeup with a flawless finish. The look stayed perfect for hours and felt very comfortable on the skin. The base looked natural, eye makeup was beautifully blended, and the overall look was elegant. Highly recommended for bridal and party makeup. Amazing work, thank you Garvita and your team.',
    name: 'Dr. Garima S.',
    service: 'Bridal Makeup',
    category: 'Bridal',
  },
  {
    quote:
      'Just wanted to say a big thank you — the makeup was absolutely gorgeous! It perfectly suited our outfits and stayed flawless for almost 12 hours, which is amazing. We got so many compliments throughout the function; all five of us were feeling like total stars.',
    name: 'Bhavika A.',
    service: 'Group Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      "The makeup stayed till 1 am also — till we didn't remove it ourselves, everything was intact. Everybody praised me and mumma so so much. Hair was perfectly in place, makeup was perfect, matched perfectly to our skin tone, no whitish nothing. We loved you and Pooja aunty both. You were very cooperative and catered exactly to our needs.",
    name: 'Vranda A.',
    service: 'Event Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'Everyone loved the makeup, and it literally stayed so flawless even after 13 hours! So flawless after 13 hrs and it did not get cakey at all. Hats off to your work — keep going, best wishes.',
    name: 'Happy Client',
    service: 'Event Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'Your work is so amazing, I have no words to say. Initially I was so conscious as I was concerned about my sensitive skin, but the way you did my makeup — I wanted subtle and nude, and you kept it so gracefully. You are so humble and kind. Thanks a lot.',
    name: 'Sahiba K.',
    service: 'Soft Glam Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'It was really an amazing experience with you guys. Makeup of three of us was amazing and different, of course — got so many compliments. Thank you so much for not breaking our trust in you, and each research was worth doing.',
    name: 'Neha V.',
    service: 'Group Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'I just wanted to thank you so much for your work and attention on my ring ceremony day. You made my day! I absolutely love the look. I am continually getting compliments on how great my hair and makeup looked that day — it all turned out to look exactly as I always imagined.',
    name: 'Happy Client',
    service: 'Engagement Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'The makeup was absolutely flawless and complemented my features perfectly. It felt light on my skin and lasted throughout the day without smudging. Foundation was smooth, the eye makeup was on point, and the lipstick shade was exactly what I wanted. Truly impressed.',
    name: 'Harshita R.',
    service: 'Glass Skin Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      "Thank you so much for doing my soft glam makeup exactly how I wanted! You always know how to make me look and feel amazing. You're truly my favourite makeup artist, and I'm always impressed by your talent. I'm so grateful for you and your work.",
    name: 'Aayushi A.',
    service: 'Soft Glam Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'Thank you so much for your magical makeup — you did so well. 12 hours tak makeup still waisa hi raha jaisa tune kiya tha. Your work is pure magic, you enhance beauty so effortlessly. You don\'t just do makeup, you create confidence. Lots of blessings for you, keep shining always.',
    name: 'Aparna T.',
    service: 'Party Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'Thank you for creating such a beautiful look for me. I felt so confident and beautiful. Your makeup skills are truly incredible — I have gotten so many compliments, everyone said I look like a doll! Thanks to you, I feel like a real-life princess. I am so impressed with your work.',
    name: 'Happy Client',
    service: 'Special Occasion Makeup',
    category: 'Party & Events',
  },
  {
    quote:
      'The makeup was done beautifully and exactly as we had expected, matching the skin tone. Thanks to you and your mum — both are very kind, wonderful and concerned towards their clients\' wishes and satisfaction. The makeup lasted very long and everyone complimented the makeup and hairstyle.',
    name: 'Parul R.',
    service: 'Makeup & Hairstyling',
    category: 'Party & Events',
  },
  {
    quote:
      'Yesterday\'s look was amazing and the hairstyle was just wow. It was my first experience and she is really very sweet. Thanks to Garvita for the perfect guidance about makeup and hairstyles. I received so many compliments!',
    name: 'Nidhi G.',
    service: 'Makeup & Hairstyling',
    category: 'Party & Events',
  },
  {
    quote:
      'You are a brilliant teacher and so passionate about what you do — that reflects in your teaching. You taught me everything I needed to know to pursue a career in all aspects of makeup: bridal, fashion, runway and so on. I am forever indebted to you for the way you made me feel confident. Thank you for not only enhancing my career but also for boosting my self-esteem.',
    name: 'Academy Student',
    service: 'Professional Makeup Course',
    category: 'Academy',
  },
  {
    quote:
      'I feel so much more confident about my makeup now that I know what I\'m doing. Thank you for sharing your knowledge and experience. You are both an excellent artist and a great friend. Deep appreciation for making me feel beautiful.',
    name: 'Khushi A.',
    service: 'Self Makeup Course',
    category: 'Academy',
  },
];
