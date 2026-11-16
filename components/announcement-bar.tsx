'use client';

import { useEffect, useRef, useState } from 'react';
import './announcement-bar.css';

/**
 * The site-wide announcement, the same one sportstechx.com and Atlas show
 * (landing: components/announcement-bar.tsx). Give the next one a new `id` and
 * it shows again, even to people who closed this one; null switches it off.
 */
export const announcement: { id: string; label: string; text: string; cta: string; href: string } | null = {
  id: 'football-tech-business-report-2026',
  label: 'New Report Alert!',
  text: 'Our Football Tech & Business Report 2026 is out now.',
  cta: 'Access on Atlas →',
  href: 'https://www.atlas.sportstechx.com/reports/ftabr26',
};

const KEY = 'stx-announcement-closed';
const OFF = 'data-announce-off';

/** Runs in <head> before paint, so a visitor who closed it never sees it flash in. */
export const ANNOUNCE_PREPAINT = announcement
  ? `(function(){try{if(localStorage.getItem(${JSON.stringify(KEY)})===${JSON.stringify(announcement.id)})document.documentElement.setAttribute(${JSON.stringify(OFF)},'')}catch(e){}})();`
  : `document.documentElement.setAttribute(${JSON.stringify(OFF)},'');`;

/**
 * The banner across the top of every page until the visitor closes it. It sits
 * in the page flow and scrolls away; the fixed nav and the hero's height read
 * the two vars it keeps on <html>: `--announce-h` (its height) and
 * `--announce-vis` (the part still on screen).
 */
export function AnnouncementBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const h = root.hasAttribute(OFF) ? 0 : el.offsetHeight;
      root.style.setProperty('--announce-h', `${h}px`);
      root.style.setProperty('--announce-vis', `${Math.max(0, h - window.scrollY)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [closed]);

  if (!announcement || closed) return null;

  const close = () => {
    try { localStorage.setItem(KEY, announcement.id); } catch { /* storage blocked: closed for this page view */ }
    const root = document.documentElement;
    root.setAttribute(OFF, '');
    root.style.setProperty('--announce-h', '0px');
    root.style.setProperty('--announce-vis', '0px');
    window.dispatchEvent(new Event('scroll')); // the nav docks on scroll position
    setClosed(true);
  };

  return (
    <div ref={ref} role="region" aria-label="Announcement" className="announce">
      <div className="announce__inner">
        <p className="announce__text">
          <strong>{announcement.label}</strong> {announcement.text}
        </p>
        <a href={announcement.href} target="_blank" rel="noreferrer" className="announce__cta">{announcement.cta}</a>
      </div>
      <button type="button" onClick={close} aria-label="Close announcement" className="announce__close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
