import { ref, onMounted } from 'vue';
import { animate, stagger } from 'animejs';

/* ------------------------------------------------------------------ */
/*  Reduced-motion gate                                               */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = ref(false);
export { prefersReducedMotion };
let mq: MediaQueryList | null = null;

if (typeof window !== 'undefined') {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = mq.matches;
  mq.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches;
  });
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/** Set initial hidden state (opacity 0 + translateY). Safe: call in onMounted. */
function hideNow(el: HTMLElement, ty = 16): void {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = `translateY(${ty}px)`;
}

/* ------------------------------------------------------------------ */
/*  IntersectionObserver reveal                                       */
/* ------------------------------------------------------------------ */

export interface ScrollRevealOptions {
  /** CSS selector for child elements to reveal */
  selector: string;
  /** Animation duration per element (ms) */
  duration?: number;
  /** Stagger offset between elements (ms) */
  staggerMs?: number;
  /** Vertical translate starting offset (px) */
  translateY?: number;
  /** IO rootMargin */
  rootMargin?: string;
}

/**
 * Observe a container; when it enters the viewport, reveal its child
 * elements with stagger. Unobserves after first trigger.
 * Returns an IO instance you can disconnect onUnmounted.
 */
export function useScrollReveal(
  container: HTMLElement,
  opts: ScrollRevealOptions,
): IntersectionObserver | null {
  if (prefersReducedMotion.value) return null;

  const {
    selector,
    duration = 400,
    staggerMs = 40,
    translateY = 16,
    rootMargin = '-10% 0px',
  } = opts;

  const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) return null;

  // Set initial hidden state
  targets.forEach((el) => hideNow(el, translateY));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate(targets, {
            opacity: [0, 1],
            translateY: [translateY, 0],
            duration,
            delay: stagger(staggerMs),
            ease: 'outCubic',
          });
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin },
  );

  io.observe(container);
  return io;
}

/* ------------------------------------------------------------------ */
/*  Hero orchestrated entrance (on mount, no IO needed)               */
/* ------------------------------------------------------------------ */

export function useHeroEntrance() {
  onMounted(() => {
    if (prefersReducedMotion.value) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-hero-reveal]'),
    );
    if (!targets.length) return;

    // Hide all first
    targets.forEach((el) => hideNow(el, 20));

    // Stagger reveal with 60ms offset
    animate(targets, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      delay: stagger(60),
      ease: 'outCubic',
    });
  });
}

/* ------------------------------------------------------------------ */
/*  Stat number count-up                                              */
/* ------------------------------------------------------------------ */

/**
 * Animate a number from 0 to `target`, updating el.textContent.
 * Returns cleanup function. Uses requestAnimationFrame (not anime.js)
 * for direct text control with suffix support.
 */
export function countUp(
  el: HTMLElement,
  target: number,
  suffix: string,
  duration = 800,
): () => void {
  if (prefersReducedMotion.value || !el) {
    if (el) el.textContent = target + suffix;
    return () => {};
  }

  let raf: number;
  const start = performance.now();

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // outCubic easing: 1 - (1 - t)^3
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(eased * target)) + suffix;
    if (progress < 1) {
      raf = requestAnimationFrame(tick);
    }
  }

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/* ------------------------------------------------------------------ */
/*  Tab-switch re-reveal (for grade switcher in StructureSection)     */
/* ------------------------------------------------------------------ */

export function reRevealGrid(container: HTMLElement): void {
  if (prefersReducedMotion.value || !container) return;

  const cards = Array.from(
    container.querySelectorAll<HTMLElement>('[data-tab-reveal]'),
  );
  if (!cards.length) return;

  cards.forEach((el) => hideNow(el, 12));

  animate(cards, {
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 300,
    delay: stagger(25, { from: 'first' }),
    ease: 'outCubic',
  });
}

