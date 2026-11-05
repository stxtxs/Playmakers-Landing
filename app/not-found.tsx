import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/sections/footer';
import { Rise } from '@/components/rise';
import { STX_HOME } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/**
 * 404 in the Playmakers look: the final hero's dark, noised panel, Bebas
 * headline and accent pill — the nav comes from the root layout, the footer is
 * added here as on every other page. Next serves it with a real 404 status.
 */
export default function NotFound() {
  return (
    <>
      <main>
        <section className="noise relative isolate flex min-h-[max(520px,calc(693*var(--k)))] flex-col items-center justify-center overflow-hidden bg-hero px-[calc(16*var(--k))] pt-[calc(120*var(--k))] pb-[calc(80*var(--k))] text-center">
          <p className="font-label text-cta font-medium tracking-[0.1em] text-white/60 uppercase">Error 404</p>
          <h1 className="mt-[calc(18*var(--k))] max-w-[calc(1128*var(--k))] font-display text-headline font-light leading-[1.03] text-white uppercase">
            This play didn&apos;t make the cut
          </h1>
          <p className="mt-[calc(26*var(--k))] max-w-[calc(560*var(--k))] font-sans text-lead-lg font-medium leading-[1.46] text-white/80">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Head back to Playmakers, or explore SportsTechX.
          </p>
          <div className="mt-[calc(46*var(--k))] flex flex-col items-center gap-[calc(16*var(--k))] sm:flex-row">
            <Link
              href="/"
              className="grid h-[calc(54*var(--k))] min-h-[44px] min-w-[calc(280*var(--k))] place-items-center rounded-full bg-accent px-[calc(32*var(--k))] font-label text-cta font-medium tracking-[0.1em] text-accent-fg uppercase shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
            >
              Back to Playmakers
            </Link>
            <a
              href={STX_HOME}
              className="grid h-[calc(54*var(--k))] min-h-[44px] min-w-[calc(280*var(--k))] place-items-center rounded-full border border-white/40 px-[calc(32*var(--k))] font-label text-cta font-medium tracking-[0.1em] text-white uppercase transition-[background-color,transform] hover:bg-white/10 motion-safe:hover:scale-[1.02]"
            >
              Visit SportsTechX
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <Rise />
    </>
  );
}
