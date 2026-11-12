import { Art } from '@/components/art';
import { APPLY_URL, howToJoin } from '@/lib/content';

/**
 * How to join: three step cards on warm cream (Website Feedback Tracker,
 * "Playmakers LP - Various Updates"): one gradient card per step, the step
 * number in an outlined circle beside the title inside the card, and the first
 * card's criteria as three lines with a trailing "or". Below lg the cards stack.
 *
 * The card colour is the exported gradient artwork over a rounded base (design
 * artwork is placed, not rebuilt in CSS), with the noise and green inner glow.
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

        <ol className="mt-[calc(90*var(--k))] grid gap-y-[calc(40*var(--k))] lg:grid-cols-3 lg:gap-x-[calc(32*var(--k))]">
          {howToJoin.steps.map((step) => (
            <li key={step.n} className="flex flex-col">
              <article
                className="step-card noise relative isolate flex flex-1 flex-col overflow-hidden rounded-[calc(20*var(--k))] p-[calc(25*var(--k))] inset-shadow-glow transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_18px_40px_rgb(17_19_33/0.28)] motion-safe:hover:-translate-y-1.5"
                style={{ '--noise-alpha': 0.22 } as React.CSSProperties}
              >
                {/* The card's colour is exported artwork, not a CSS gradient. */}
                <Art name="card-gradient-step" fill className="absolute inset-0 -z-10" />

                <h3 className="flex items-center gap-[calc(14*var(--k))] font-display text-step-title leading-[1.05] text-white uppercase">
                  <span
                    aria-hidden
                    className="grid size-[calc(35*var(--k))] min-h-8 min-w-8 shrink-0 place-items-center rounded-full border-[1.5px] border-white/80 font-label text-[max(15px,calc(19*var(--k)))] tracking-normal"
                  >
                    {step.n}
                  </span>
                  <span>
                    <span className="sr-only">Step {step.n}: </span>
                    {step.title}
                  </span>
                </h3>

                <p className="mt-[calc(22*var(--k))] font-sans text-body-sm leading-[1.56] text-white">{step.body}</p>

                {step.criteria && (
                  // One line per criterion, the "or" trailing it in a muted tone.
                  <ul aria-label="Meet any one of these" className="mt-[calc(14*var(--k))] flex flex-col gap-[calc(6*var(--k))]">
                    {step.criteria.map((c, k) => (
                      <li key={c} className="flex items-start gap-[calc(10*var(--k))] font-sans text-body-sm leading-[1.56] text-white">
                        {/* Centred on the first line, so a wrapped criterion keeps its bullet at the top. */}
                        <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-white" />
                        <span>
                          <span className="font-semibold">{c}</span>
                          {k < step.criteria!.length - 1 && <span className="text-white/60"> or</span>}
                        </span>
                      </li>
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
