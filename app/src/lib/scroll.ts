import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Scroll to a section, going through ScrollSmoother when it's active so the
// scroll stays in sync with the smoothed/transformed content.
export const smoothScrollTo = (selector: string, position: string = 'top top') => {
  const element = document.querySelector(selector);
  if (!element) return;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(element, true, position);
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const smoothScrollToTop = () => {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(0, true);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
