import { footer, STX_HOME } from '@/lib/content';
import { Art } from '@/components/art';

/* Type and colour of the sportstechx.com footer, as it renders at 1440 wide:
   New Frank 17/31 in 70% navy, Bebas Neue 21/31 heads, Commit Mono legal row. */
const INK = 'text-[rgba(9,21,57,0.7)]';
const LINK = `inline-flex items-center gap-[14px] font-frank text-[17px] leading-[31px] ${INK} transition-colors duration-[80ms] ease-out hover:text-black`;
const HEAD = 'font-bebas text-[21px] leading-[31px] tracking-[0.1em] text-black uppercase';
const RULE = 'block h-[2px] w-full bg-[rgba(186,186,186,0.5)]';

/**
 * Footer — matches the sportstechx.com footer: a brand cell and three link
 * columns between two 2px grey rules, a vertical rule before each link column
 * (see .footer-cell in globals.css), and a mono legal row under the block.
 */
export function Footer() {
  return (
    <footer className="bg-page pt-[70px] pb-[40px] text-ink">
      <div className="container-page">
        <span aria-hidden className={RULE} />
        <div className="mt-[52px]">
          {/* One column on a phone, the brand cell over three link columns in
              between, and sportstechx.com's 394 : 250 : 250 : 250 on desktop. */}
          <div className="grid gap-[38px] md:grid-cols-3 lg:grid-cols-[minmax(0,394fr)_minmax(0,250fr)_minmax(0,250fr)_minmax(0,250fr)]">
            {/* Left cell — lockup and blurb */}
            <div className="flex flex-col gap-[18px] md:col-span-3 lg:col-span-1">
              {/* The header's lockup: BY SPORTSTECHX centred under the mark,
                  turning SportsTechX magenta on hover. */}
              <div className="inline-flex flex-col items-center gap-[6px] self-start lg:gap-2">
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

              <p className={`font-frank text-[17px] leading-[31px] md:max-w-[58ch] ${INK}`}>{footer.description}</p>
            </div>

            {/* Quick links, then the SportsTechX family */}
            {footer.columns.map((col) => (
              <nav key={col.heading} className="footer-cell" aria-label={col.heading}>
                <h2 className={HEAD}>{col.heading}</h2>
                <ul className="mt-[20px]">
                  {col.links.map((l, i) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...('external' in col && col.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className={LINK}
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
              <h2 className={HEAD}>Connect</h2>
              <ul className="mt-[20px]">
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className={LINK}
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

        <span aria-hidden className={`mt-[73px] ${RULE}`} />

        <div className={`mt-[22px] flex flex-col gap-2 font-mono text-[12.5px] leading-[31px] ${INK} lg:flex-row lg:items-center lg:justify-between`}>
          <p>{footer.legal}</p>
          <p>
            {footer.legalLinks.map((l, i) => (
              <span key={l.label}>
                {i > 0 && <span aria-hidden> · </span>}
                <a
                  href={l.href}
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="transition-colors duration-[80ms] ease-out hover:text-black"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
