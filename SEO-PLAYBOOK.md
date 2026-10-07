# SEO Playbook: the 5 core elements (reuse for every website you build)

Search engines decide how often to crawl a site, how well it ranks and how fast new pages get indexed based on five things. Copy this file into every new project and tick each box before launch.

| # | Element | What it controls | Status in this project |
|---|---|---|---|
| 1 | Fast hosting | Crawl rate, Core Web Vitals, bounce rate | Vercel global CDN, fully static pages |
| 2 | Lightweight theme | Page weight, Largest Contentful Paint, mobile score | Hand-built, no theme or UI kit, tiny JavaScript |
| 3 | Internal linking structure | How crawlers discover pages and share authority | Built in (hub pages, related tools, guides, breadcrumbs, footer) |
| 4 | Publishing frequency | How often crawlers return and how many pages can rank | Guides system + 90-day calendar below |
| 5 | Backlinks | Authority and trust | Needs your outreach: plan below |

**Be realistic:** elements 1 to 3 are code and are done. Elements 4 and 5 are ongoing work that no code can do for you. Nobody can promise a ranking, and new sites usually take months to gain traction.

---

## 1. Fast hosting ("like SiteGround")

**What matters:** time to first byte, global delivery, uptime, and caching.

- **This project:** every page is prerendered to static HTML and served from Vercel's edge network, so visitors get the page from a location near them. For a static Next.js site this is typically faster than shared hosting such as SiteGround, which is designed mainly for PHP/WordPress sites and serves from a single data centre region you pick. SiteGround is a good choice for WordPress. For Next.js, Vercel (or Netlify or Cloudflare Pages) is the better fit.
- **Important:** Vercel's free **Hobby plan is for non-commercial use only**, and Vercel's fair use guidelines list ads such as Google AdSense as commercial. See the README section "Hosting and AdSense" before you turn ads on.
- **Check after every deploy:** run [PageSpeed Insights](https://pagespeed.web.dev) on mobile and aim for 90+ in all four scores.
- **Checklist**
  - [ ] Static or cached pages, not rendered on every request
  - [ ] HTTPS and HSTS
  - [ ] Custom domain with a simple, short name
  - [ ] Uptime monitor (free: UptimeRobot or Better Stack)

## 2. Lightweight theme

**What matters:** less code means faster loading and higher Core Web Vitals scores.

- **This project:** no theme, no page builder, no CSS framework runtime. Tailwind generates only the CSS used. Only the calculator is a client component, and the history panel is loaded on demand. Fonts come through `next/font`, so there is no render-blocking font request and no layout shift.
- **Rules to keep it light on every site**
  - [ ] No sliders, auto-playing video, chat widgets or heavy animation libraries above the fold
  - [ ] Images through `next/image` (or SVG and CSS where possible), with width and height set
  - [ ] Reserve space for ads and embeds so the layout never jumps
  - [ ] Load third-party scripts only after consent and with `afterInteractive`
  - [ ] Check `npm run build` output: keep first-load JS small, and investigate any new dependency over about 30 KB
  - [ ] WordPress sites: use a lightweight theme (GeneratePress, Kadence, Astra) and few plugins

## 3. Internal linking structure

**What matters:** crawlers follow links. Pages with no internal links may never be found, and links with descriptive text tell Google what a page is about.

- **This project**
  - Every calculator page links to four related calculators, to its matching guide, and appears in the header and footer menus.
  - Guides link into the tools with descriptive anchor text, and every guide ends with a link to its tool.
  - Breadcrumbs on every inner page (with `BreadcrumbList` markup).
  - Flat, short, lowercase URLs, one level deep.
  - A real 404 page with links back to every tool.
  - `sitemap.xml` lists every page automatically.
- **Rules for every site**
  - [ ] Every page reachable within 3 clicks of the home page
  - [ ] Every new page gets at least 3 links pointing to it from existing pages
  - [ ] Every new page links out to at least 3 related pages
  - [ ] Use descriptive anchors ("percentage increase guide"), not "click here"
  - [ ] One topic cluster: a hub page, with supporting pages that link to it and to each other
  - [ ] Fix broken links quarterly

## 4. Publishing frequency

**What matters:** sites that add useful pages on a steady schedule tend to be crawled more often, and each new page is another chance to rank for a long-tail search. Quality beats volume, and thin or copied pages do harm.

- **This project:** add a guide by adding one object to `content/guides.ts` and redeploying. It appears on `/guides`, in the sitemap and in the structured data automatically.
- **Suggested rhythm**
  - **Weeks 1 to 4:** 2 pages a week (mix of new calculators and guides)
  - **Weeks 5 to 12:** 1 to 2 pages a week
  - **After that:** 2 to 4 pages a month, plus refreshing the best performers every quarter
  - Pick a rhythm you can keep for a year. Consistency matters more than bursts.
- **Quality gate before publishing anything**
  - [ ] Answers one real search question better than the pages currently ranking
  - [ ] At least 600 words of original, useful text (calculators) or 400+ (guides)
  - [ ] A worked example, a short FAQ and links to 3 related pages
  - [ ] Unique title (under 60 characters) and description (140 to 160 characters)
  - [ ] No copy-pasted text from other pages or sites

## 5. Backlinks

**What matters:** links from other trusted sites are a strong signal. They also bring visitors. Only earn them honestly. Buying links, link swaps at scale and private blog networks risk a manual penalty.

**Easy first links you control (do these in week 1)**
- [ ] Link from your portfolio (https://aqibawan2003.vercel.app) to the calculator site, with a short project description
- [ ] GitHub repository: add the live URL to the repo's "About" box and README
- [ ] LinkedIn: add the site to Featured and to your Projects section
- [ ] Your other websites and social bios

**Build links by being useful (weeks 2 to 12)**
- [ ] Answer real questions on Reddit, Quora and Stack Exchange and link to a tool only where it truly helps (most of these links are `nofollow`, but they bring real visitors)
- [ ] Share the site in student and developer communities where self-promotion is allowed
- [ ] Ask teachers, university pages and study-resource lists whether they would list a free calculator (BMI, GPA, percentage and unit tools suit this)
- [ ] Write a guest post for a blog in a related niche, with one natural link
- [ ] Offer a helpful quote or data point to journalists through free expert-request platforms
- [ ] Submit the project to reputable free directories and "tools" roundups in your niche (skip spammy directories)
- [ ] Create one **link-worthy asset** a month: a free printable chart (unit conversion cheat sheet), a clear explainer, or a calculation that others would cite

**Never do**
- Buy links, join link farms, or use automated comment spam
- Use exact-match keyword anchors for every link (looks unnatural)
- Click your own ads or ask others to

**Track:** Google Search Console, then **Links**. Review monthly: who links to you, and which pages earn links.

---

## Launch-day checklist (copy to every site)

- [ ] Custom domain connected, `NEXT_PUBLIC_SITE_URL` updated, redeployed
- [ ] `robots.txt` and `sitemap.xml` load; sitemap submitted in Search Console and Bing Webmaster Tools
- [ ] PageSpeed mobile 90+ on home page and one inner page
- [ ] Each page: one H1, unique title and description, canonical URL
- [ ] Rich Results Test passes on a calculator page and a guide
- [ ] Privacy Policy, Terms, About, Contact pages live and linked in the footer
- [ ] Links added from portfolio, GitHub and LinkedIn
- [ ] First 4 weeks of content planned
