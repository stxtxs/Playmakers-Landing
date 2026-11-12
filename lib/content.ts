/**
 * Every string on the page, lifted from the Figma file verbatim.
 *
 * Two things to know before editing:
 *
 * 1. ` ` (LINE SEPARATOR) marks a line break the designer set by hand. It is
 *    stored as an escape rather than the raw character on purpose — raw U+2028 is
 *    invisible in an editor and some editors strip it silently on save, which shows
 *    up much later as a headline wrapping in the wrong place. Render these through
 *    `lines()` in components/lines.tsx; browsers collapse U+2028 as ordinary
 *    whitespace, so `white-space: pre-line` will not do it for you.
 *
 * 2. Much of this copy is unfinished in the design, and is reproduced as-drawn
 *    rather than invented. Each such spot is marked FIXME with what is wrong. The
 *    open list went to the designer; see the plan file.
 */

import type { FigmaFill } from '@/components/figma-image';

export type Step = {
  n: string;
  title: string;
  body: string;
  /** Optional qualifying list under the body, any one of which is enough —
   *  rendered with a trailing "or" on every item but the last. */
  criteria?: string[];
};

export type Member = {
  name: string;
  role: string;
  bio: string;
  /** Asset name from design/assets.json, or an absolute CMS URL. Both go
   *  through lib/assets' src(). */
  photo: string;
  /** Colour adjustments carried by the photo's fill in Figma, if any. CMS
   *  uploads are graded before upload, so they carry none. */
  fill: FigmaFill;
};

/** A trusted-by card: a person, and optionally the company mark drawn over
 *  their photo. `logo` is an asset name or an absolute CMS URL. */
export type TrustedMember = {
  name: string;
  role: string;
  photo: string;
  logo: string | null;
};

export type Story = {
  quote: string;
  name: string;
  role: string;
  /** Asset name or CMS URL; falls back to the artboard's avatar. */
  photo: string | null;
};

export type Offer = {
  n: string;
  tag: string;
  title: string;
  /**
   * The card's prose, as lead-in/body pairs — the lead-in renders bold. Cards 2
   * and 3 carry two each on the live page, which is why this is a list.
   */
  paras: { leadIn: string; body: string }[];
  bullets: string[];
  /** Mood photo on the card's right, an asset name from design/assets.json. */
  photo: string;
};

/**
 * An FAQ answer as blocks: each string is a paragraph, a string starting with
 * "• " is a bullet (consecutive ones form one list), and **text** is bold.
 */
export type FaqItem = { q: string; a: string[] };

export const nav = {
  // FIXME(design): reads "EXPLORE¬ MEMBERSHIP" in Figma. U+00AC is a stray
  // line-break marker, not copy — dropped here.
  /* Root-relative: a bare '#team' resolves to /terms#team on a sub-route and
     scrolls nowhere. */
  links: [
    { label: 'EXPLORE MEMBERSHIP', href: '/#membership' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'MEMBERS', href: '/members' },
  ],
  /* Members sign in through Circle, which hosts the community. request_host
     tells Circle which community to land them in. */
  cta: { label: 'LOG IN', href: 'https://login.circle.so/sign_in?request_host=www.joinplaymakers.co#email' },
};

/**
 * Back to the mothership. Playmakers is its own deployment on joinplaymakers.co,
 * so these must be absolute — a root-relative '/#solutions' lands on this site,
 * which has no such section.
 *
 * "Investors Circle" is another name for Playmakers and has no page of its own,
 * so both entries share one destination.
 */
/* The STX site (landing repo), on its own domain.
   No trailing slash: the links below append their own paths. */
export const STX_HOME = 'https://www.sportstechx.com';


/** The membership application form. Every "Apply" CTA on the page goes here. */
export const APPLY_URL = 'https://sportstechx.fillout.com/playmakers-membership';

export const hero = {
  headline: "WHERE SPORTS TECH'S BEST BUILD  SMARTER, FASTER, TOGETHER.",
  cta: 'APPLY FOR MEMBERSHIP',
};

export const trustedBy = {
  title: 'Accelerate your Growth Alongside Elite Operators at Your Level.',
  lead: 'Playmakers is a curated network for high-growth sports tech founders and CEOs, built on trusted peer advice, decision-maker connections and shared sports industry know-how.',
  // FIXME(design): all seven cards carry the same placeholder person, and the
  // caption typography drifts across them (Teko 300/22 on 1-2, Teko 500/18 on
  // 3-7, the role on card 7 is CommitMono where the rest are Space Grotesk).
  // Normalised to the majority styling here.
  // Shown until an admin fills Site assets -> Playmakers -> Carousel gallery.
  members: Array.from({ length: 5 }, (_, i) => ({
    name: 'Alexander Janssen',
    role: 'CEO, Dutch SportsTech Fund',
    photo: `member-${i + 1}`,
    logo: null,
  })) satisfies TrustedMember[],
};

export const offers = {
  // Teko 400/55 centred section head on the artboard, same as the others.
  title: 'What Membership Offers',
  // Cards 2 and 3 were placeholders on the artboard — it repeated card 1's
  // title and body for card 2 and left card 3's title as a literal "¬", so all
  // three shipped identical prose. Their real copy is taken from the live page;
  // the vertical `tag` was the only place their subjects had survived.
  cards: [
    {
      n: '1',
      tag: 'YOUR PERSONAL BOARD OF ADVISORS',
      title: 'YOUR PERSONAL  BOARD OF ADVISORS',
      paras: [
        {
          leadIn: 'Founder-to-Founder Advisory Board',
          body: ' confidential, professionally facilitated monthly core group sessions (9x/year) between 6-9 Playmakers members, providing the real-world strategic guidance of a high-caliber advisory board without the six-figure cost or time drain',
        },
      ],
      bullets: [
        "Skip costly trial-and-error by learning from other founders who've been there",
        'Scale faster with advice from leaders who have navigated complex growth',
        'Stay mentally resilient with a circle that understands your journey',
      ],
      photo: 'offer-card-photo',
    },
    {
      n: '2',
      tag: 'INSIDER SPORTS INDUSTRY NETWORK',
      title: 'INSIDER SPORTS  INDUSTRY NETWORK',
      paras: [
        {
          leadIn: 'Member Events',
          body: ' that go beyond surface-level networking and turn your peers into partners',
        },
        {
          leadIn: 'Curated Introductions',
          body: ' to other members, investors and key sports industry stakeholders leveraging the collective network of the core team and members',
        },
      ],
      bullets: [
        'Create high impact relationships with sports industry leaders',
        'Grow your personal profile and visibility to top leaders in sports',
        'Gain access to new partners, markets and investment to accelerate business growth',
      ],
      photo: 'offer-card-2-photo',
    },
    {
      n: '3',
      tag: 'SPORTS TECH INTELLIGENCE',
      title: 'SPORTS TECH  INTELLIGENCE',
      paras: [
        {
          leadIn: 'Atlas Raise Access',
          body: ". Your intelligence edge in sports tech fundraising. Identify relevant investors, strengthen your pitch and close your next round faster, powered by sports tech's deepest dataset.",
        },
        {
          leadIn: 'Digital Community',
          body: ' for continuous peer-to-peer exchange of best operator knowledge and strategic playbooks in sports tech',
        },
      ],
      bullets: [
        'Build with anytime / anywhere access to the best knowledge in sports tech',
        'Inform your strategy with world-class sports tech market data and research',
        'Leverage insider expertise to obtain a competitive advantage',
      ],
      photo: 'offer-card-3-photo',
    },
  ] satisfies Offer[],
};

export const testimonials = {
  eyebrow: 'What Our Members Say',
  /**
   * FIXME(design): the artboard has two cards carrying the same placeholder
   * quote and person. The first two below are that, verbatim.
   *
   * FIXME(placeholder): the remaining four are INVENTED — written only so the
   * rail has something to page through while the real quotes are collected.
   * The names are not real people and none of this is a real endorsement, so
   * delete the lot before this goes anywhere public. They are deliberately all
   * different so it is obvious which card you are looking at while testing.
   * All of it disappears the moment an admin adds one real testimonial in
   * Site assets -> Playmakers -> Testimonials.
   */
  items: [
    {
      quote: '“We walked into our raise knowing the market cold. That confidence changed every conversation.”',
      name: 'Alexander Janssen',
      role: 'CEO, Dutch SportsTech Fund',
      photo: null,
    },
    {
      quote: '“We walked into our raise knowing the market cold. That confidence changed every conversation.”',
      name: 'Alexander Janssen',
      role: 'CEO, Dutch SportsTech Fund',
      photo: null,
    },
    {
      quote: '“Two of my core group had solved the exact problem I was stuck on. That call saved us a quarter.”',
      name: 'Placeholder Two',
      role: 'Founder, Placeholder Analytics',
      photo: null,
    },
    {
      quote: '“The introductions were the opposite of networking. Every one of them went somewhere.”',
      name: 'Placeholder Three',
      role: 'CEO, Placeholder Performance',
      photo: null,
    },
    {
      quote: '“I stopped guessing what good looked like at our stage. I could just ask someone who had been there.”',
      name: 'Placeholder Four',
      role: 'Co-Founder, Placeholder Labs',
      photo: null,
    },
    {
      quote: '“It is the only room where I can say the quiet part out loud and get a straight answer back.”',
      name: 'Placeholder Five',
      role: 'Managing Director, Placeholder Ventures',
      photo: null,
    },
  ] satisfies Story[],
};

export const quote = {
  text: "“It's good to learn from your mistakes.  It's better to learn from other people's mistakes.”",
  attribution: '— Warren Buffett',
};

export const howToJoin = {
  title: 'How to Join the Network',
  cta: 'APPLY FOR MEMBERSHIP',
  steps: [
    {
      n: '1',
      title: 'Apply for membership',
      body: 'All members must be the founder or CEO of a sports tech company',
      criteria: ['doing at least $1M in revenue', 'having raised $3M+ in funding', 'have had above a $5M company exit.'],
    },
    {
      n: '2',
      title: 'Take an interview call',
      body: "A two-way conversation to assess mutual fit and set expectations. We listen to what you're building and what would make membership most valuable for you and your business. You hear exactly what we do, and what we don't.",
    },
    {
      n: '3',
      title: 'Join the network',
      body: "When the fit is right, you'll receive an invitation to join. Once you've signed the membership agreement and completed your first-year dues, you get immediate access to our digital community. Your core group placement follows within 60 days.",
    },
  ] satisfies Step[],
};

export const team = {
  title: 'Meet Our Team',
  lead: "Between us, we've scaled a sports tech business from inception to unicorn, coached hundreds of founders through critical inflection points, built SportsTechX as the industry's intelligence backbone, and created award-winning communities across the global sports ecosystem. Our combined expertise supports every Playmakers' journey.",
  members: [
    {
      name: 'ROHN MALHOTRA',
      role: 'NETWORK INTELLIGENCE',
      bio: 'Exited founder, now Co-Founder & CEO at SportsTechX, the leading sports tech & venture intelligence platform. Also Investment Director at Match Ventures.',
      photo: 'team-1',
      fill: { saturation: 0.09 },
    },
    {
      name: 'THOMAS PREISS',
      role: 'Community & Operations',
      bio: 'Serial entrepreneur and community builder in sports, Co-Founder of Common Goal with deep expertise in building and operating high-impact membership networks.',
      photo: 'team-2',
      fill: {},
    },
    {
      name: 'MITCH HEATH',
      role: 'Core Groups Coach',
      bio: 'Co-Founder and Chief Growth Officer at Teamworks with a track-record of scaling the ‘Operating System for Sports’ from inception in 2006 to unicorn status.',
      photo: 'team-4',
      fill: { exposure: 0.1, saturation: -0.24 },
    },
    {
      name: 'KATY TROST',
      role: 'Core Groups Coach',
      bio: 'Executive coach and advisor with over a decade of experience in coaching tech founders to become exceptional CEOs and growth-stage leaders.',
      photo: 'team-3',
      fill: {},
    },
  ] satisfies Member[],
};

/**
 * Answers are the ones on joinplaymakers.co, word for word, with one deliberate
 * change: where that page names "SportsTechX Intelligence Hub" (Pro-level
 * access), this one says Atlas Raise access — the membership now includes Atlas
 * Raise, and the offer cards above say so. Prices and criteria stay in euros as
 * the source has them.
 */
export const faq = {
  title: 'Frequently Asked Questions',
  items: [
    {
      q: "What's included in Playmakers membership?",
      a: [
        'Your Playmakers membership includes:',
        '**Core Group** – A curated group of 6-9 Playmakers members who meet 9 times per year with professional facilitation. This is your personal board of advisors—the strategic guidance of a high-caliber advisory board without the six-figure cost or time drain.',
        '**Member Events** – Online and in-person gatherings that go beyond surface-level networking and turn your peers into partners. From private member dinners to Playmakers hosted events around major sports tech conferences and sporting moments.',
        '**Curated Introductions** – Direct connections to other members, investors, and key sports industry stakeholders, leveraging the collective network of the core team and members.',
        '**Digital Community** – Continuous peer-to-peer exchange of best operator knowledge and strategic playbooks in sports tech. Daily access to the minds of sports tech founders and CEOs who speak your language.',
        '**Atlas Raise Access** – SportsTechX Atlas Raise, providing actionable insights on global sports tech trends, market data, and competitive intelligence specific to the intersection of sports and technology.',
        "In short: Core Group, Network, Intelligence. Everything designed to help you scale faster with people who get what you're building.",
      ],
    },
    {
      q: 'How much does it cost?',
      a: [
        'Annual membership is €6,000.',
        'That covers everything: the core group sessions with professional facilitation, curated network introductions, member events, and SportsTechX Atlas Raise access. All prices exclude VAT.',
      ],
    },
    {
      q: 'What are the requirements to join?',
      a: [
        'To join, you must:',
        '• Meet our financial criteria for membership: €1M+ in revenue, OR €3M+ in funding, OR a previous €5M+ exit.',
        '• Be building in sports tech — so you share the same market dynamics, customer challenges, and industry context.',
        '• Have been vetted for culture fit — specifically courtesy, discretion, and commitment to contributing to the success of fellow members in the network. We enforce a strict "no assholes" policy.',
      ],
    },
    {
      q: 'How much time commitment does Playmakers take?',
      a: [
        "Core groups meet approximately monthly for 2 hours, 9 times per year. Beyond that, you engage as much as you want—some members will be active daily, others dip in when they need specific help. It's designed to fit around your schedule, not take over your calendar.",
      ],
    },
    {
      q: 'Who else is in the network?',
      a: [
        "We're being very intentional about our member admissions, selecting accomplished operators across different sports tech verticals, geographies, and business models. Everyone has met the same financial criteria you have and brings complementary expertise and perspective to the group.",
      ],
    },
    {
      q: "What's the acceptance rate?",
      a: [
        "For now, this is invite-only. For our founding members, we want to be sure of the culture we set. As we grow our target is to accept ~10% of applicants. It's not about being elitist; it's about ensuring everyone in the network is both giving and getting tremendous value.",
      ],
    },
    {
      q: 'How long is the membership?',
      a: [
        "Membership is billed annually, but Playmakers isn't designed as a one-year experiment. The real value comes from staying connected with the same group over multiple years as those relationships grow and compound over time.",
      ],
    },
    {
      q: 'Is Playmakers a digital network or do you meet in person?',
      a: [
        "Both. We're building a hybrid network because real relationships require face-to-face time.",
        "The core group sessions are virtual for practical reasons—your 6-9 member group will likely span multiple cities and time zones. Meeting monthly online keeps the commitment manageable while you're running a company.",
        'But throughout the year, we bring the network together regularly through member dinners and events around major conferences and sporting moments, and informal regional meetups.',
        "Think of it this way: virtual core group meetings and Playmakers' digital platform enable consistent connection and collaboration, in-person experiences are where relationships deepen and strengthen.",
      ],
    },
    {
      q: 'Who will be in my core group?',
      a: [
        "Once you join, we'll place you in a core group of 6-9 members who meet 9 times per year with a professional coach/facilitator. Everyone in your group will have met Playmaker’s membership criteria (covered in third FAQ question).",
        "Beyond that, we curate for diversity and complementary experiences: Someone might be ahead of you in scaling sports organization clients but behind you in fundraising. Another might have navigated a major sports league partnership you're pursuing, while you've solved the international expansion they're tackling. One founder might have exited and brings perspective on what matters long-term, while another is in the same growth trenches as you.",
        'We look at business model (B2B vs B2C, SaaS vs marketplace), core customer groups (athletes, fans, sports organization), stage, geography, and functional expertise. The goal is to create groups where everyone brings different experience but shares the same fundamental challenges.',
        "Ultimately, the core group experience we want to provide is one where you walk away with actual answers from people who've been there, done that, sharpen your own thinking by helping others, and get honest accountability from people who understand exactly what you're up against. Not just in business, but in sustaining yourself through the journey.",
      ],
    },
    {
      q: "What if I don't connect well with my core group?",
      a: [
        "We put a lot of thought into group composition—geography, business stage, verticals, personalities. That said, if a group isn't working, we address it quickly. The core group experience has to be exceptional, full stop.",
      ],
    },
    {
      q: 'How do the curated introductions work? Can you help me connect with investors or potential clients?',
      a: [
        'Definitely. Curated introductions are central to the value we provide.',
        "As you engage with the network, we'll actively facilitate connections that make sense for where you are: other members working on similar challenges, industry leaders we know through SportsTechX, potential clients, strategic partners, investors and so on. These happen organically all year round through our member events, participation in conferences, guest speaker sessions or direct 1-1 intros when we spot a valuable connection. This is all part of membership.",
        "Now, if you're in active fundraising mode and need us to run a targeted investor introduction process, or you're pursuing a major business development initiative that requires intensive, dedicated support - that's different. Those are structured as separate commercial engagements. For fundraising, we work primarily on a success-based model. For major BD initiatives, we typically arrange a case-by-case agreement with a fixed fee plus success component.",
        'The principle is simple: everyday valuable introductions that help you grow are part of the Playmakers membership experience. Deep, intensive introduction campaigns around major business milestones require additional arrangements.',
      ],
    },
    {
      q: 'How is Playmakers different from other founder communities like Hampton, YPO, Vistage or EO?',
      a: [
        'Those are all strong communities - the difference comes down to vertical focus and what that unlocks.',
        "The sports tech founder experience is specific. You're building at the intersection of technology and sports - navigating rights holders, legacy infrastructure in sports organizations, understanding the sports calendar, and working in an industry where relationships matter as much as product. A SaaS founder building CRM software faces different challenges than someone building athlete performance tech or fan engagement platforms.",
        'In a generalist community, you might be the only person who understands why selling to sports teams is fundamentally different, or why your roadmap is dictated by competition schedules. In Playmakers, everyone gets it immediately.',
        '**What vertical focus gives you:**',
        '**Pattern recognition that applies.** When someone in your core group scaled from 10 to 100 sports organization clients, their learnings transfer directly.',
        "**Network effects that matter.** Need an intro to a Premier League club's innovation lead? Someone in the network either knows them or has navigated that conversation.",
        '**Relevant intelligence.** Through SportsTechX and the Playmakers community, you get market data, trend insights and competitive intelligence specific to the intersection of global sports and technological innovation.',
        "**Shared context.** The founder who closed a deal with a governing body can help you think through your approach. The person who survived pandemic's impact on live sports understands your volatility challenges.",
        "The honest take: If you're building a business that happens to touch sports occasionally, then generalist founder communities like Hampton, YPO or Vistage or EO may be a perfect fit. If your core customers are athletes, fans or sporting organisations and you want peers who speak your language from day one - that's what we're building.",
      ],
    },
  ] satisfies FaqItem[],
};

export const finalHero = {
  headline: 'THE FUTURE OF SPORT IS BUILT TOGETHER',
  lead: 'Join the premier network of leaders shaping  the future of sport.',
  cta: 'APPLY FOR MEMBERSHIP',
};

export const footer = {
  description:
    'Playmakers is an invite-only, private membership network for high-growth sports tech founders and CEOs to connect, share strategy, and scale together.',
  location: 'Berlin, Germany',
  // Same structure as the Atlas footer: this site's own links, then the rest
  // of the SportsTechX family (the first gets an outbound arrow), then Connect.
  columns: [
    {
      heading: 'Quick Links',
      links: [
        { label: 'Explore Membership', href: '/#membership' },
        { label: 'How to Join', href: '/#how-to-join' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Terms of membership', href: '/terms' },
      ],
    },
    {
      heading: 'SportsTechX',
      external: true,
      links: [
        { label: 'SportsTechX', href: STX_HOME },
        { label: 'Atlas', href: 'https://www.atlas.sportstechx.com' },
        { label: 'Boardroom', href: `${STX_HOME}/#boardroom` },
        { label: 'Media', href: `${STX_HOME}/#media` },
        { label: 'About', href: `${STX_HOME}/about` },
      ],
    },
  ],
  // Asset names; <Art> resolves the path and size from design/assets.json.
  // Only the two SportsTechX socials that exist — Instagram and X were removed.
  // Contact sits here too, as on Atlas, rather than in the left column.
  social: [
    { label: 'LinkedIn', icon: 'icon-linkedin', href: 'https://www.linkedin.com/company/sportstechx/' },
    { label: 'YouTube', icon: 'icon-youtube', href: 'https://www.youtube.com/@SportsTechX' },
    // hello@playmakers.com (the Figma placeholder) is a stranger's domain.
    { label: 'Contact', icon: 'icon-mail', href: 'mailto:hello@sportstechx.com' },
  ],
  legal: '© 2026 SportsTechX GmbH. All rights reserved.',
  meta: 'Privacy · Imprint · The Inner Circle of Sports Tech',
};
