import { Art } from '@/components/art';
import { APPLY_URL, howToJoin } from '@/lib/content';

/**
 * How to join: three step cards on warm cream.
 *
 * Layout (Website Feedback Tracker, "Playmakers LP - Various Updates"): the
 * step number sits inside each card, in an outlined circle beside the title,
 * rather than on a dashed path above the row. Each card frames its copy in an
 * inset panel a shade lighter than the card. Below lg the cards stack.
 *
 * The card colour is still the exported gradient artwork over a rounded base
 * (design artwork is placed, not rebuilt in CSS), with the noise and the green
 * inner glow.
 */
export function HowToJoin() {
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

        <ol className="mt-[calc(70*var(--k))] grid gap-y-[calc(32*var(--k))] lg:grid-cols-3 lg:gap-x-[calc(32*var(--k))]">
          {howToJoin.steps.map((step) => (
            <li key={step.n} className="flex">
              <article
                className="step-card noise relative isolate flex flex-1 flex-col overflow-hidden rounded-[calc(20*var(--k))] p-[max(8px,calc(12*var(--k)))] inset-shadow-glow transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_rgb(17_19_33/0.28)] motion-safe:hover:-translate-y-1.5"
                style={{ '--noise-alpha': 0.22 } as React.CSSProperties}
              >
                {/* The card's colour is exported artwork, not a CSS gradient. */}
                <Art name="card-gradient-step" fill className="absolute inset-0 -z-10" />

                <div className="flex flex-1 flex-col rounded-[calc(8*var(--k))] border border-white/[0.06] bg-white/[0.035] px-[calc(30*var(--k))] py-[calc(28*var(--k))]">
                  <h3 className="flex items-center gap-[calc(12*var(--k))] font-sans text-[max(16px,calc(19*var(--k)))] leading-[1.2] font-bold tracking-[0.01em] text-white uppercase">
                    <span
                      aria-hidden
                      className="grid size-[max(24px,calc(28*var(--k)))] shrink-0 place-items-center rounded-full border-[1.5px] border-white/80 font-label text-[max(13px,calc(15*var(--k)))] font-medium"
                    >
                      {step.n}
                    </span>
                    <span>
                      <span className="sr-only">Step {step.n}: </span>
                      {step.title}
                    </span>
                  </h3>

                  <p className="mt-[calc(22*var(--k))] font-sans text-body-sm leading-[1.6] text-white">{step.body}</p>

                  {step.criteria && (
                    <ul aria-label="Meet any one of these" className="mt-[calc(10*var(--k))] flex flex-col gap-[calc(4*var(--k))]">
                      {step.criteria.map((c, k) => (
                        <li key={c} className="flex gap-[calc(8*var(--k))] font-sans text-body-sm leading-[1.6] text-white">
                          <span aria-hidden>•</span>
                          <span>
                            <span className="font-semibold">{c}</span>
                            {k < step.criteria!.length - 1 && <span className="text-white/60"> or</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
