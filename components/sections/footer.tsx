import { footer, STX_HOME } from '@/lib/content';
import { Art } from '@/components/art';

/**
 * Footer — 1513x567 on white.
 *
 * The artboard's "Cloud grid" is four 2px #bababa rules, not two: horizontals
 * above and below the block, and two verticals between the link columns. The
 * verticals were missing entirely, which is why the columns read as floating.
 *
 * Those rules also define the column widths. The grid block runs x73..x1458 and
 * the verticals land at x868 and x1162, so the three cells are 795 / 294 / 296 —
 * 57.40% / 21.23% / 21.37%. The left cell is far wider than an even split, which
 * is why a `451px 1fr 1fr` grid put both link columns too far left.
 *
 * The artboard also has an empty "Column 2" frame at x622 left over from an
 * earlier layout. It holds nothing and is not built; the left cell simply
 * spans it.
 */
export function Footer() {
  return (
    <footer className="bg-page pt-[calc(71*var(--k))] pb-[calc(52*var(--k))] text-ink">
      <div className="container-page">
        <div className="border-y-2 border-rule-2 pt-[calc(53*var(--k))] pb-[calc(67*var(--k))]">
          {/* One column on a phone, three on the artboard — and two in between,
              or the 768-1023 band renders the phone stack across 691px with an
              empty right half. The brand cell spans both so only the two link
              columns pair up. */}
          {/* Brand cell plus three link columns, in the Atlas footer's
              proportions (451 : 200 : 200 : 200). */}
          <div className="grid gap-y-[calc(48*var(--k))] md:grid-cols-3 md:gap-x-[calc(48*var(--k))] lg:grid-cols-[42.4%_19.2%_19.2%_19.2%] lg:gap-y-0">
            {/* Left cell — lockup, blurb, location */}
            <div className="md:col-span-3 lg:col-span-1">
              {/* The header's lockup: BY SPORTSTECHX centred under the mark,
                  turning SportsTechX magenta on hover. */}
              <div className="inline-flex flex-col items-center gap-[6px] lg:gap-2">
                <Art name="wordmark-footer" alt="Playmakers" min={140} />
                <a
                  href={STX_HOME}
                  target="_blank"
                  rel="noreferrer"
                  className="-my-1.5 py-1.5 font-bebas text-[15px] leading-none tracking-[0.12em] text-ink/60 transition-colors duration-200 ease-out hover:text-[#ed1a5e] lg:text-[17px]"
                >
                  BY SPORTSTECHX ↗
                </a>
              </div>

              <p className="mt-[calc(28*var(--k))] md:max-w-[58ch] lg:max-w-[calc(451*var(--k))] font-sans text-body leading-[1.78]">
                {footer.description}
              </p>

              <ul className="mt-[calc(28*var(--k))]">
                <li className="flex items-center gap-[calc(13*var(--k))]">
                  <Art name="icon-pin" min={18} />
                  <span className="font-sans text-body-sm leading-[2]">{footer.location}</span>
                </li>
              </ul>
            </div>

            {/* Quick links, then the SportsTechX family */}
            {footer.columns.map((col) => (
              <nav key={col.heading} className="footer-cell" aria-label={col.heading}>
                <h2 className="font-bebas text-col-head leading-[1.45] tracking-[0.1em] text-black uppercase">
                  {col.heading}
                </h2>
                <ul className="mt-[calc(21*var(--k))]">
                  {col.links.map((l, i) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...('external' in col && col.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="inline-flex items-center gap-[calc(11*var(--k))] font-sans text-body leading-[1.78] hover:underline"
                      >
                        {l.label}
                        {/* The main site gets the outbound-link arrow, as on Atlas. */}
                        {'external' in col && col.external && i === 0 && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Right cell — social */}
            <nav className="footer-cell" aria-label="Connect">
              <h2 className="font-bebas text-col-head leading-[1.45] tracking-[0.1em] text-black uppercase">
                CONNECT
              </h2>
              <ul className="mt-[calc(21*var(--k))]">
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="flex items-center gap-[calc(15*var(--k))] font-sans text-body leading-[1.78] hover:underline"
                    >
                      <Art name={s.icon} min={18} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-[calc(22*var(--k))] flex flex-col gap-[calc(8*var(--k))] font-label text-[max(12px,calc(13*var(--k)))] leading-[2.46] lg:flex-row lg:justify-between">
          <p>{footer.legal}</p>
          <p>
            <a href="/terms" className="hover:underline">
              Terms of Membership
            </a>
            {' · '}
            {footer.meta}
          </p>
        </div>
      </div>
    </footer>
  );
}
