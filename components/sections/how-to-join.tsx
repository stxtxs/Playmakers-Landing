import { Fragment } from 'react';
import { Art } from '@/components/art';
import { APPLY_URL, howToJoin } from '@/lib/content';

/**
 * How to join: a three-step flow on warm cream.
 *
 * Layout: a numbered marker above each card, with a line running from each
 * marker to the next so the row reads left to right as one path. Below lg the
 * steps stack and the connecting lines are dropped.
 *
 * Styling is the section's original: the cards are the exported gradient
 * artwork over a rounded base (design artwork is placed, not rebuilt in CSS),
 * with the noise and green inner glow; the markers are the original outlined
 * number circles, in the heading colour so they read on cream; the connectors
 * are the original dashed rules.
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

        <ol className="mt-[calc(90*var(--k))] grid gap-y-[calc(40*var(--k))] lg:grid-cols-3 lg:gap-x-[calc(32*var(--k))]">
          {howToJoin.steps.map((step, i) => (
            <li key={step.n} className="flex flex-col">
              {/* Marker + connector. The line fills the rest of the column so it
                  meets the next marker across the gap. */}
              <div className="flex items-center">
                <span className="grid size-[calc(35*var(--k))] min-h-8 min-w-8 shrink-0 place-items-center rounded-full border-[1.5px] border-heading font-label text-[max(16px,calc(21*var(--k)))] tracking-[0.1em] text-heading">
                  {step.n}
                </span>
                {i < last && (
                  <span
                    aria-hidden
                    className="ml-[calc(12*var(--k))] hidden flex-1 border-t border-dashed border-black/40 lg:-mr-[calc(32*var(--k))] lg:block"
                  />
                )}
              </div>

              <article
                className="step-card noise relative isolate mt-[calc(20*var(--k))] flex flex-1 flex-col overflow-hidden rounded-[calc(20*var(--k))] p-[calc(25*var(--k))] inset-shadow-glow transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_rgb(17_19_33/0.28)] motion-safe:hover:-translate-y-1.5"
                style={{ '--noise-alpha': 0.22 } as React.CSSProperties}
              >
                {/* The card's colour is exported artwork, not a CSS gradient. */}
                <Art name="card-gradient-step" fill className="absolute inset-0 -z-10" />

                <h3 className="font-display text-step-title leading-[1.05] text-white uppercase">{step.title}</h3>

                <p className="mt-[calc(22*var(--k))] font-sans text-body-sm leading-[1.56] text-white">{step.body}</p>

                {step.criteria && (
                  <ul className="mt-[calc(14*var(--k))] flex flex-col">
                    {step.criteria.map((c, k) => (
                      <Fragment key={c}>
                        {k > 0 && (
                          <li aria-hidden className="py-[calc(2*var(--k))] pl-[calc(16*var(--k))] font-sans text-body-sm text-white/60 italic">
                            or
                          </li>
                        )}
                        <li className="flex items-center gap-[calc(10*var(--k))] font-sans text-body-sm font-semibold text-white">
                          <span aria-hidden className="size-[6px] shrink-0 rounded-full bg-white" />
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

        <div className="mt-[calc(80*var(--k))] flex justify-center">
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
