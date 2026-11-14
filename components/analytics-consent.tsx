'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Google Analytics 4, behind a consent banner.
 *
 * Nothing from Google loads and no cookie is set until the visitor accepts.
 * Declining stores the choice and loads nothing. The choice can be changed at
 * any time through a link to `#cookie-settings` (the footer has one), which
 * reopens the banner; withdrawing stops GA and removes its cookies.
 *
 * GA runs on the production hosts only, so previews and localhost neither show
 * the banner nor send hits. Set NEXT_PUBLIC_GA_MEASUREMENT_ID to test it on
 * another host (it then also replaces the ID below).
 *
 * Page views on client-side navigations are sent by GA itself: the stream's
 * enhanced measurement listens for browser history changes.
 */

/** Stream "STX Playmakers" in the GA4 property "SportsTechX – GA4 (Clean)". */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-D1QYB0PSDN';
const GA_HOSTS = ['playmakers.sportstechx.com', 'www.playmakers.sportstechx.com'];

/** Playmakers has no privacy page of its own; the SportsTechX policy covers it. */
const PRIVACY_URL = 'https://www.sportstechx.com/privacy-policy';

const STORAGE_KEY = 'stx:analytics-consent';
const CHANGE_EVENT = 'stx:analytics-consent';
const SETTINGS_HASH = '#cookie-settings';

type Status = 'off' | 'unset' | 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Kept in memory too, for browsers that refuse localStorage. */
let memory: Status = 'unset';

function enabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) || GA_HOSTS.includes(window.location.hostname);
}

function readStatus(): Status {
  if (!enabled()) return 'off';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    /* storage blocked: fall through to the in-memory choice */
  }
  return memory;
}

function writeStatus(next: 'granted' | 'denied'): void {
  memory = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage blocked: the choice lasts for this page view only */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/** Google's documented opt-out switch: while true, gtag sends nothing. */
function setGaDisabled(disabled: boolean): void {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = disabled;
}

let loaded = false;

function startGa(): void {
  setGaDisabled(false);
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the `arguments` object itself, so a rest array will not do.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- required by gtag.js
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function stopGa(): void {
  setGaDisabled(true);
  // GA sets its cookies on the widest domain it can, so clear every level.
  const names = ['_ga', `_ga_${GA_ID.replace(/^G-/, '')}`];
  const parts = window.location.hostname.split('.');
  const domains = ['', ...parts.map((_, i) => `.${parts.slice(i).join('.')}`).filter((d) => d.split('.').length > 2)];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function AnalyticsConsent() {
  // 'off' on the server and during hydration, so the banner never flashes.
  const status = useSyncExternalStore<Status>(subscribe, readStatus, () => 'off');
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    if (status === 'granted') startGa();
    else if (status === 'denied') stopGa();
  }, [status]);

  // Any link to #cookie-settings reopens the banner.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!link || !link.getAttribute('href')?.endsWith(SETTINGS_HASH)) return;
      event.preventDefault();
      setReopened(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (status === 'off') return null;
  if (status !== 'unset' && !reopened) return null;

  const choose = (next: 'granted' | 'denied') => {
    writeStatus(next);
    setReopened(false);
  };

  const BUTTON =
    'h-10 flex-1 rounded-full border-[1.5px] px-5 font-label text-[14px] font-medium tracking-[0.08em] transition-colors duration-200 ease-out sm:flex-none';

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-[640px] flex-col gap-4 rounded-[20px] border border-white/20 bg-navy p-5 text-white shadow-[0_4px_39px_rgb(0_0_0/0.3)] sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-center sm:gap-6"
    >
      <p className="font-sans text-[14px] leading-[1.6] text-white/80">
        We use Google Analytics cookies to see how this site is used. They are set only if you accept.{' '}
        <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-accent">
          Privacy Policy
        </a>
        {status !== 'unset' && (
          <span className="block text-white/55">
            Current choice: {status === 'granted' ? 'accepted' : 'declined'}.
          </span>
        )}
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => choose('denied')}
          className={`${BUTTON} border-white/40 text-white hover:border-white`}
        >
          DECLINE
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className={`${BUTTON} border-accent bg-accent text-accent-fg hover:border-white hover:bg-white`}
        >
          ACCEPT
        </button>
      </div>
    </section>
  );
}
