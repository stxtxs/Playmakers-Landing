'use client';

import { useEffect, useId, useState } from 'react';
import { COOKIE_SETTINGS_EVENT, getConsent, setConsent, type Consent } from '@/lib/consent';
import { STX_HOME } from '@/lib/content';

/* Both choices share this one style, so neither is nudged: same size, colour
   and hover. */
const BUTTON =
  'h-9 flex-1 cursor-pointer rounded-full border-[1.5px] border-[rgba(9,21,57,0.25)] font-mono text-[12.5px] tracking-[0.08em] text-ink uppercase transition-[background-color,border-color,color,scale] duration-200 ease-out hover:border-ink hover:bg-ink hover:text-white active:duration-[80ms] motion-safe:active:scale-95';

/**
 * Cookie consent banner, the sportstechx.com one (same copy, same behaviour)
 * in this site's type and colours. Shown until the visitor chooses, and again
 * whenever Cookie Settings in the footer is used. Not modal: the page stays
 * usable.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    // The cookie only exists in the browser, so this has to run after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a browser-only value
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => {
    setConsent(consent);
    setOpen(false);
  };

  return (
    // ph-no-capture: the consent choice itself is never sent to analytics.
    <section
      role="region"
      aria-labelledby={titleId}
      className="ph-no-capture fixed inset-x-3 bottom-3 z-[55] rounded-[18px] border-[1.5px] border-[rgba(186,186,186,0.5)] bg-white px-4 py-3.5 text-ink shadow-deck md:right-5 md:bottom-5 md:left-auto md:w-[436px]"
    >
      <h2 id={titleId} className="font-mono text-[12.5px] tracking-[0.08em] text-ink/50 uppercase">
        Cookies
      </h2>
      <div className="mt-1.5 font-sans text-[14px] leading-[1.5] text-ink/70">
        <p className="text-ink">Yes, we use cookies. No, they aren&rsquo;t gluten-free.</p>
        <p className="mt-1.5">
          Essential ones keep the site running. Analytics ones show us how it&rsquo;s used, only if you say yes. Please
          do.{' '}
          {/* This site has no privacy page of its own; the SportsTechX policy covers it. */}
          <a
            href={`${STX_HOME}/privacy-policy`}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap underline underline-offset-2 hover:text-black"
          >
            Privacy Policy
          </a>
        </p>
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose('rejected')} className={BUTTON}>
          Decline
        </button>
        <button type="button" onClick={() => choose('accepted')} className={BUTTON}>
          Accept all
        </button>
      </div>
    </section>
  );
}
