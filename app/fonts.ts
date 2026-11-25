import localFont from 'next/font/local';

/* Self-hosted latin woff2s (next/font/local), NOT next/font/google: the Google loader
   downloads from fonts.gstatic.com AT BUILD TIME and that fetch flakes on cold Vercel
   builds, failing the deploy (it broke the Atlas client and admin). Re-download from the
   Google Fonts CSS2 API, latin block, if a face ever needs refreshing. */

/**
 * The design uses four families. Counts are visible (non-whitespace) characters
 * across every text node in the Figma file:
 *
 *   Inter          2952   body copy
 *   Space Grotesk  1132   eyebrows, labels, buttons, vertical card tags
 *   Teko            597   all display headings
 *   Bebas Neue       17   two footer column heads, and nothing else
 *
 * The file also references **New Frank**, **Space Mono** and **CommitMono**, but a
 * per-character audit found New Frank and Space Mono applied to zero visible
 * characters — they sit on a single space in the Trusted-by caption and on an
 * otherwise-overridden base style. CommitMono covers 23 characters on one card
 * whose six siblings all use Space Grotesk, so it reads as a slip rather than
 * intent. None of the three are loaded here; adding them would cost three font
 * downloads to render nothing. See app/globals.css for where each family lands.
 *
 * All four are variable fonts except Bebas Neue: each variable face is one file,
 * declared with its weight range.
 */

export const teko = localFont({
  src: './fonts/teko.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-teko',
});

export const inter = localFont({
  src: './fonts/inter.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter',
});

export const spaceGrotesk = localFont({
  src: './fonts/space-grotesk.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const bebasNeue = localFont({
  src: './fonts/bebas-neue-400.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-bebas-neue',
});

/* Footer legal row: Commit Mono, to match the sportstechx.com footer. Not on
   Google Fonts, so it is self-hosted (the same latin woff2 Atlas ships). */
export const commitMono = localFont({
  src: './fonts/commit-mono-400.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-commit-mono',
});
