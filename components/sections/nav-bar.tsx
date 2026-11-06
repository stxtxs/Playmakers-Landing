'use client';

import { useSyncExternalStore } from 'react';
import { MobileMenuButton, useMobileMenu } from '@/components/mobile-menu';
import { nav, STX_HOME } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * The bar's resting gap above the page.
 *
 * Real pixels, not artboard ones through --k: this is the one measurement the
 * three sites have to agree on, and sportstechx.com sets it at 16/24. The
 * artboard's own 48 left this bar resting 46px down against the others' 24.
 *
 * Applied as a `translate`, never as `top` — see the transition note below.
 */
const NAV_REST = 'translate-y-4 lg:translate-y-6';

const subscribe = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};

/**
 * True once the page has scrolled past the bar's own inset.
 *
 * A dead band rather than a single threshold: the sibling site docks on
 * `scrollY > 16` and undocks on the same number, so parking exactly there makes
 * the bar flicker between states on every sub-pixel scroll. Docking at 24 and
 * releasing at 8 gives it somewhere to settle.
 */
let docked = false;
const isScrolled = () => {
  const y = window.scrollY;
  if (y > 24) docked = true;
  else if (y < 8) docked = false;
  return docked;
};

/**
 * Fixed, and rendered once at page level rather than inside the hero.
 *
 * It used to be `absolute` inside IntroHero, which meant it scrolled away with
 * the hero and never came back, and its z-50 was trapped in the hero's
 * `isolate` stacking context.
 *
 * Two values diverge from the artboard, both asked for directly: the resting
 * top offset is 48 rather than 85, and the LOG IN capsule is padded 30 rather
 * than 15 (browser Space Grotesk sets the label ~19px narrower than Figma does,
 * so the artboard's own 15 came out visibly tighter than the design reads).
 *
 * Both pills are glass over the hero photograph, not solid fills. Flattening
 * either to an opaque colour is the easy mistake and it kills the effect.
 */
export function NavBar() {
  const { open: drawerOpen, lockedY } = useMobileMenu();
  const scrolled = useSyncExternalStore(
    subscribe,
    isScrolled,
    () => false // the server cannot know the scroll position
  );

  return (
    <header
      // While the drawer is out its shell is transformed, and a transformed
      // ancestor becomes the containing block for `fixed` children — a fixed
      // bar would then pin to the top of the *document* and scroll away,
      // taking the close button with it. Anchor to the captured offset.
      style={drawerOpen ? { top: lockedY } : undefined}
      className={cn(
        'inset-x-0 z-50',
        // background-IMAGE, not background-color: the scrim is a gradient, so
        // naming background-color (as the sibling site does) transitions
        // nothing and the glass snaps in. No box-shadow here either — the
        // docked band deliberately has neither rule nor shadow, because the
        // fade is what ends it.
        // The dock rides on `translate`, not `top`, and `top` is deliberately
        // NOT in this list. `top` is what anchors the bar when the drawer
        // switches it to `absolute`, and that value is the scroll offset —
        // transitioning it means opening the drawer sends the bar gliding
        // thousands of pixels down the page over 300ms. Measured at 663px into
        // a 2161px flight. (The sibling site has the same list and the same
        // bug; its pages are just short enough to hide it.)
        'transition-[translate,padding,background-image,backdrop-filter] duration-300',
        drawerOpen ? 'absolute' : 'fixed',
        'top-0',
        // The docked glass is suppressed while the drawer is out, or it paints
        // a translucent strip across the top of the slid page.
        scrolled && !drawerOpen
          ? 'translate-y-0 bg-linear-to-b from-[var(--nav-scrim-from)] to-[var(--nav-scrim-to)] py-3 backdrop-blur-[11.6px]'
          : NAV_REST
      )}
    >
      <div className="container-page flex items-center justify-between gap-[calc(24*var(--k))]">
        <div className="flex items-center gap-[calc(16*var(--k))]">
          {/* Below lg the links live in the drawer, so this is the only way in
              — and the only way out: it flips to an X, so it must NOT be faded
              while the drawer is open. The click-away overlay behind the page
              and Escape are both invisible affordances on a phone. */}
          {/* Below lg the links live in the drawer, so this is the only way in
              — and the only way out: it flips to an X, so it must NOT be faded
              while the drawer is open. */}
          <MobileMenuButton className="lg:hidden" />

          {/* The lockup shared by Playmakers and Atlas, centred: the product wordmark is
              this site's home link, and "BY SPORTSTECHX" underneath is the way
              back to sportstechx.com, turning SportsTechX magenta on hover. It
              replaces the standalone S icon that used to sit at the far right. */}
          <div className="flex flex-col items-center gap-[6px] lg:gap-2">
          <a
            href="/#top"
            aria-label="Playmakers — back to top"
            className="grid min-h-[44px] place-items-center lg:min-h-0"
          >
            {/* wordmark-hero, not wordmark-final: in `final` the P mark sits BESIDE
                the word, so the lockup reads "P PLAYMAKERS". Here the mark is the
                word's own P. 28px tall puts it ~214 wide, next to the STX logo's
                175 and Atlas's 140. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG; next/image does not optimise it */}
            <img src="/vectors/wordmark-hero.svg" alt="Playmakers" className="h-6 w-auto lg:h-7" />
          </a>
          <a
            href={STX_HOME}
            target="_blank"
            rel="noreferrer"
            // Padding widens the tap area without moving the text; the negative
            // margin gives the space back so the lockup stays tight.
            className="-my-1.5 py-1.5 font-[family-name:var(--font-bebas-neue)] text-[15px] leading-none tracking-[0.12em] text-white/60 transition-colors duration-200 ease-out hover:text-[#ed1a5e] lg:text-[17px]"
          >
            BY SPORTSTECHX ↗
          </a>
          </div>
        </div>

        <div className="flex items-center gap-[calc(24*var(--k))]">
          <nav
            aria-label="Primary"
            className="hidden h-[50px] items-center gap-[calc(36*var(--k))] rounded-full border-[1.5px] border-white/100 bg-white/10 px-[calc(35*var(--k))] shadow-nav backdrop-blur-sm lg:flex"
          >
            {nav.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-label text-label font-medium tracking-[0.1em] text-white transition-colors duration-[80ms] ease-out hover:text-accent active:opacity-70"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={nav.cta.href}
            className={cn(
              // Desktop-only, as on sportstechx.com: the drawer carries it on a
              // phone, and the full wordmark leaves no room for it there.
              'hidden h-[50px] min-h-[44px] place-items-center rounded-full border-[1.5px] border-accent bg-accent/5 px-[calc(30*var(--k))] lg:grid',
              'font-label text-label font-medium tracking-[0.1em] text-accent backdrop-blur-[28px]',
              'transition-[background-color,color,scale] duration-200 ease-out hover:bg-accent hover:text-accent-fg motion-safe:hover:scale-105 motion-safe:active:scale-95',
              // On a phone the drawer already carries it; two copies of the
              // same control either side of the slide reads as a duplicate.
              drawerOpen && 'opacity-0'
            )}
          >
            {nav.cta.label}
          </a>

        </div>
      </div>
    </header>
  );
}
