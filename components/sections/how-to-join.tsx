import { Fragment } from 'react';
import { APPLY_URL, howToJoin } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * How to join: a three-step flow on warm cream.
 *
 * Each step has a numbered marker above its card. Steps 1 and 2 are navy,
 * the last (where you land) is pink, and a pink line runs from each marker to
 * the next, so the row reads left to right as one path. Below lg the steps
 * stack and the connecting lines are dropped.
 *
 * The cards draw their navy-to-green gradient in CSS rather than placing the
 * old 301x360 step artwork: these cards are a different shape, and stretching
 * that artwork distorted its rounded corners. The colours are the artwork's.
 */
export function HowToJoin() {
  const last = howToJoin.steps.length - 1;
  return (
    <section
      id="how-to-join"
      className="noise bg-band-warm py-[calc(120*var(--k))]"
      style={{ '--noise-alpha': 0.12 } as React.CSSProperties}
    >
      <div className="container-page">
        <h2 className="text-center font-display text-section leading-[1.25] tracking-[0.05em] text-heading uppercase">
          {howToJoin.title}
        </h2>

        <ol className="mt-[calc(80*var(--k))] grid gap-y-[calc(40*var(--k))] lg:grid-cols-3 lg:gap-x-[calc(32*var(--k))]">
          {howToJoin.steps.map((step, i) => (
            <li key={step.n} className="flex flex-col">
              {/* Marker + connector. The line fills the rest of the column so it
                  meets the next marker across the gap. */}
              <div className="flex items-center">
                <span
                  className={cn(
                    'grid size-[max(40px,calc(44*var(--k)))] shrink-0 place-items-center rounded-full font-label text-[max(16px,calc(18*var(--k)))]',
                    i === last ? 'bg-accent text-accent-fg' : 'bg-[#1f2b3e] text-white'
                  )}
                >
                  {step.n}
                </span>
                {i < last && (
                  <span
                    aria-hidden
                    className="ml-[calc(12*var(--k))] hidden h-px flex-1 bg-accent lg:-mr-[calc(32*var(--k))] lg:block"
                  />
                )}
              </div>

              <article
                className={cn(
                  'step-card mt-[calc(20*var(--k))] flex flex-1 flex-col rounded-[calc(20*var(--k))] p-[max(22px,calc(28*var(--k)))]',
                  'bg-linear-to-b from-[#121624] to-[#243e38] shadow-card',
                  // Hover: a small lift and a deeper shadow, so the card reads
                  // as picked up. Movement only when motion is welcome.
                  'transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_rgb(17_19_33/0.28)]',
                  'motion-safe:hover:-translate-y-1.5'
                )}
              >
                <h3 className="font-display text-step-title leading-[1.05] text-white uppercase">{step.title}</h3>
                <p className="mt-[calc(16*var(--k))] font-sans text-body-sm leading-[1.56] text-white/85">{step.body}</p>

                {step.criteria && (
                  <ul className="mt-[calc(14*var(--k))] flex flex-col">
                    {step.criteria.map((c, k) => (
                      <Fragment key={c}>
                        {k > 0 && (
                          <li aria-hidden className="py-[calc(2*var(--k))] pl-[calc(16*var(--k))] font-sans text-body-sm text-white/50 italic">
                            or
                          </li>
                        )}
                        <li className="flex items-center gap-[calc(10*var(--k))] font-sans text-body-sm font-semibold text-white">
                          <span aria-hidden className="size-[6px] shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-[calc(56*var(--k))] flex justify-center">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noreferrer"
            className="grid h-[calc(54*var(--k))] min-w-[calc(304*var(--k))] place-items-center rounded-full bg-accent px-[calc(32*var(--k))] font-label text-cta font-medium tracking-[0.1em] text-accent-fg shadow-cta transition-transform motion-safe:hover:scale-[1.02]"
          >
            {howToJoin.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
