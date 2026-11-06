import type { Metadata, Viewport } from "next";
import { MobileMenuPanel, MobileMenuProvider, MobileMenuShell } from "@/components/mobile-menu";
import { NavBar } from "@/components/sections/nav-bar";
import { bebasNeue, inter, spaceGrotesk, teko } from "./fonts";
import "./globals.css";

/** The public origin. */
export const SITE_URL = "https://www.playmakers.sportstechx.com";

const TITLE = "Playmakers — The private network for high-growth sports tech founders and CEOs";
const DESCRIPTION =
  "A by-invitation private network for high growth sports tech founders and CEOs. Your peers. Your confidants. Your advantage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Playmakers" },
  description: DESCRIPTION,
  applicationName: "Playmakers",
  keywords: [
    "sports tech network", "founder peer group", "sports tech founders",
    "CEO network", "peer advisory", "Playmakers", "SportsTechX",
  ],
  authors: [{ name: "SportsTechX", url: "https://www.sportstechx.com" }],
  creator: "SportsTechX",
  publisher: "SportsTechX GmbH",
  category: "business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Playmakers",
    locale: "en_US",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#111133",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${teko.variable} ${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        {/* Adobe Fonts kit jyx6vei (New Frank), shared with sportstechx.com and
            Atlas. Only the header uses it, so the three bars set the same type;
            Space Grotesk stands in if the kit does not load. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/jyx6vei.css" />
      </head>
      {/* --k is what makes the page a scale drawing of the 1512 artboard.
          It needs two elements, not one: the body is the query container and
          the div reads it. A container cannot query itself. See globals.css. */}
      <body className="page-container min-h-full">
        {/* The drawer sits behind the page and the page slides off it, so the
            panel is a sibling of the shell rather than a child — inside it,
            `fixed` would resolve against the shell's transform. */}
        <MobileMenuProvider>
          <MobileMenuPanel />
          <MobileMenuShell nav={<NavBar />}>{children}</MobileMenuShell>
        </MobileMenuProvider>
      </body>
    </html>
  );
}
