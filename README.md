# CalcPoint: free online calculators (Next.js)

A fast, accessible, SEO-ready calculator site: standard and scientific calculator, percentage, BMI, unit converter, currency estimator, age, loan EMI and tip calculators, plus a Guides section for publishing content on a schedule.

Made by [Aqib Ejaz](https://aqibawan2003.vercel.app).

Companion documents: **[SECURITY.md](./SECURITY.md)** (DDoS and attack protection) and **[SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md)** (the 5 core SEO elements, reusable for every website you build).

---

## 1. What is inside

| Area | Details |
|---|---|
| Calculators | Standard + scientific keypad (deg/rad, memory, history, keyboard), percentage (5 modes), BMI (metric/imperial), unit converter (6 categories), currency estimator (sample rates), age, loan EMI (with chart), tip splitter |
| Content | 600+ words per tool page (what it does, steps, formula, examples, mistakes, FAQ), 3 starter guides |
| Trust pages | About, Contact, Privacy Policy, Terms, Disclaimer |
| SEO | Unique title/description per page, canonical URLs, Open Graph and Twitter cards, JSON-LD (`WebSite`, `Organization`, `WebApplication`, `FAQPage`, `BreadcrumbList`, `Article`), `sitemap.xml`, `robots.txt`, web manifest, dynamic Open Graph image |
| Money | AdSense-ready ad slots with reserved space, consent banner, `ads.txt` generator, optional affiliate block |
| Security | Strict headers and CSP, no backend, no `eval`, consent-gated third parties (see SECURITY.md) |
| Quality | 160 automated tests (logic and real component interaction), TypeScript strict mode, 0 known npm vulnerabilities at packaging time |

**Stack:** Next.js 16 (App Router, all pages statically generated), React 19, TypeScript, Tailwind CSS 4, Framer Motion, lucide-react, Vitest.

## 2. Run it on your computer

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # 160 tests
npm run typecheck
npm run build && npm start
```

## 3. Push to GitHub

```bash
cd calculator-app
git init
git add .
git commit -m "Initial commit: CalcPoint calculators"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Create the empty repository on GitHub first (no README, no .gitignore). Run `git status` before committing and confirm no `.env` file is listed.

> **On a zero budget? Read [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md).** It recommends a free host that allows ads, and explains every manual step.

## 4. Deploy on Vercel

1. Go to vercel.com, then **Add New, Project**, and import the GitHub repository.
2. Framework preset is detected automatically (Next.js). Leave build settings as they are.
3. Add environment variables (all optional, see section 6) and click **Deploy**.
4. Open the live URL and check every page in the list in section 9.

### Hosting and AdSense: read this before you turn ads on

- Vercel's free **Hobby plan is restricted to non-commercial personal use**, and Vercel's fair use guidelines name advertising such as **Google AdSense** as commercial usage. Running ads on Hobby risks suspension.
- **Practical path:** deploy on Hobby now to build traffic and content with **no ads and no affiliate links**, then move the project to a **Vercel Pro** plan (about $20 a month at the time of writing, check current pricing) before you switch ads on. Or choose another host whose terms allow commercial use. Read the terms of whichever host you choose.
- This is why the ad code is dormant until you set the AdSense environment variables.

## 5. Custom domain

A custom domain looks more trustworthy to visitors and is needed for AdSense approval (AdSense does not approve sites on free subdomains in most cases, so check their current requirements). In Vercel: Project, Settings, Domains. Then set `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` (no trailing slash) and redeploy so canonical URLs, the sitemap and social cards use the new domain.

## 6. Environment variables

Copy `.env.example` to `.env.local` for local work. On Vercel add them under Settings, Environment Variables.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your public URL. Falls back to Vercel's production URL if empty |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email on the Contact page (default is set in `lib/siteConfig.ts`, change it if you prefer another) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Codes from Search Console and Bing Webmaster Tools (HTML tag method) |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-XXXXXXXXXXXXXXXX`, adds the verification meta tag, serves `/ads.txt`, enables ad slots |
| `NEXT_PUBLIC_ADSENSE_SLOT_BELOW` / `_INLINE` / `_SIDEBAR` | Ad unit ids created in AdSense, one per placement |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 id (`G-...`), loaded only after consent |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | `true` to enable Vercel Web Analytics (also turn it on in the dashboard) |

Rename the site, change the tagline or the credit link in **one file**: `lib/siteConfig.ts`.

## 7. After the first deploy: SEO setup

1. **Google Search Console:** add the domain (domain property is best), verify it, then submit `https://yourdomain.com/sitemap.xml`. Use **URL Inspection, Request indexing** on the home page and each calculator.
2. **Bing Webmaster Tools:** import the site from Search Console and submit the same sitemap.
3. **PageSpeed Insights:** test home and one inner page on mobile.
4. **Rich Results Test:** test a calculator page (FAQ) and a guide (Article).
5. **Check headers** at securityheaders.com.
6. **Google Analytics 4** (optional): create a property, set `NEXT_PUBLIC_GA_ID`.
7. **Backlinks:** add the site link to your portfolio, GitHub and LinkedIn this week (details in SEO-PLAYBOOK.md).

## 8. Google AdSense and other income

**AdSense checklist**
- [ ] Custom domain live and indexed
- [ ] Hosting plan allows commercial use (section 4)
- [ ] 15 to 30 days of real content live (this project ships 8 tools and 3 guides; keep adding)
- [ ] About, Contact, Privacy Policy, Terms pages live (done)
- [ ] Apply at adsense.google.com with your domain
- [ ] Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and redeploy. The page adds the `google-adsense-account` meta tag that Google can use to verify ownership, and `/ads.txt` is generated for you
- [ ] After approval, create 3 ad units (below tool, inline, sidebar) and set the three slot variables
- [ ] Check ads load only after a visitor accepts the cookie banner

**Rules to protect your account:** never click your own ads, never ask for clicks, keep ads clearly labeled and away from buttons, and watch the Policy center weekly. Expect AdSense approval to take days to weeks and to be refused if content looks thin.

**Other income options (later)**
- Affiliate links: add real links to `content/affiliates.ts`. The block is labeled and uses `rel="sponsored"`. Disclose them as the block does.
- Sponsored guides or tool placements once you have steady traffic.
- Additional niche calculators: each new page is another chance to rank.

**Be realistic:** ad income depends on traffic. A new site typically takes months to earn meaningful search traffic, and nobody can promise a result.

## 9. QA checklist before you share the site

- [ ] All 8 tools and the home page give correct results (try `0.1+0.2`, `5/0`, `sin(30)`, `200+10%`)
- [ ] Keyboard: Tab through the page, focus ring visible everywhere, Enter/Escape work on the calculator
- [ ] Phone: keys are easy to tap, no sideways scrolling, history opens as a bottom sheet
- [ ] Dark mode toggle works and persists after reload
- [ ] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` load
- [ ] Footer shows "Made by Aqib Ejaz" linking to your portfolio
- [ ] Contact email is one you check

## 10. Project structure

```
app/                    pages, layout, sitemap, robots, manifest, OG image, ads.txt
  <tool>/page.tsx       one folder per calculator (thin: metadata + ToolPage)
  guides/               guides index + [slug] article pages
components/
  calculator/           Calculator, Display, Keypad, ScientificPanel, HistoryPanel
  tools/                Percentage, BMI, Unit, Currency, Age, EMI, Tip tools
  ui/                   Button (KeyButton), Toggle, Tabs, Sheet, Field
  seo/                  JsonLd, Breadcrumbs, FaqSection, RelatedTools, RichText
  ads/                  AdSlot, ConsentBanner, ThirdPartyScripts, AffiliateBlock
content/                all written copy, FAQs, guides, affiliate links
lib/                    calculatorLogic (parser), calculatorState (keypad), toolLogic,
                        conversions, seo, siteConfig, tools registry, consent, tests
public/                 icons, .well-known/security.txt
```

## 11. Add things later

**New guide (publishing schedule):** add an object to `content/guides.ts` (title, description, date, tool, sections). Redeploy. It appears on `/guides`, in the sitemap and in structured data. Links inside text use `[anchor](/path)`.

**New calculator:** (1) add logic and tests in `lib/`, (2) add a tool component, (3) add a content file in `content/`, (4) add an entry in `lib/tools.ts` with related tools, (5) add `app/<slug>/page.tsx` (copy any existing one). The sitemap, menus and footer update automatically.

**Live currency rates:** replace `getRates()` in `lib/conversions.ts` with a call to a rates provider through a server route that caches, and keep the returned shape. Keep API keys out of `NEXT_PUBLIC_` variables.

## 12. Five core SEO elements (summary)

Full detail and checklists are in [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md).

1. **Fast hosting:** static pages on Vercel's global CDN.
2. **Lightweight theme:** hand-built, no theme or UI kit, minimal JavaScript, no layout shift.
3. **Internal linking:** related tools, guide-to-tool links, breadcrumbs, header and footer menus, automatic sitemap.
4. **Publishing frequency:** Guides system, 2 pages a week for the first month, then 1 to 2 a week.
5. **Backlinks:** your outreach plan in the playbook. This part needs your time, no code can do it.

### 90-day launch plan

| Weeks | Focus |
|---|---|
| 1 | Deploy, custom domain, Search Console and Bing, links from portfolio/GitHub/LinkedIn |
| 2 to 4 | 2 pages a week: new guides (age in days, discount, compound interest) and tools (GPA, date difference, fuel cost). Share in relevant communities |
| 5 to 8 | 1 to 2 pages a week. Read Search Console queries and expand pages that show impressions. Start outreach and guest posts |
| 9 to 12 | Apply to AdSense if content and traffic are ready (and hosting allows it). Refresh the best pages |

## 13. Differences from the master prompt, and limits you should know

- **Tailwind CSS 4** is used. It has no `tailwind.config.ts`; theme settings live in `app/globals.css`. Config is `next.config.ts`.
- Extra files beyond the prompt: `Field.tsx` (shared input), `Guides` section, `RichText`, `SEO-PLAYBOOK.md`, `SECURITY.md`, `security.txt`, DOM tests.
- **Currency rates are fixed samples**, clearly labeled. They are not live.
- **Written word counts** run about 830 to 1,060 words per tool page including the FAQ, slightly above the 600 to 900 target on a few pages. Trim if you prefer.
- **I could not run a real browser** in my build environment. Calculator and tool behavior was verified with 160 automated tests, including DOM tests that click the real components, and with a production build served and checked over HTTP. Please do the QA checklist on a real phone and desktop browser, and run PageSpeed Insights, after you deploy.
- Google Fonts could not be downloaded in my sandbox, so I built with a mock for local checking only. On Vercel the fonts download normally. If your own build fails on fonts, check your network or switch to `next/font/local`.
- Menu names in third-party dashboards (Vercel, AdSense, Search Console) change. If a label differs, look for the feature name.

## 14. Troubleshooting

| Problem | Fix |
|---|---|
| Build fails on `next/font` | Network blocks Google Fonts. Build on Vercel or use `next/font/local` |
| Canonical URLs show `localhost` | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| `/ads.txt` returns 404 | `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is not set (expected until AdSense approval) |
| Ads do not show | You must accept the cookie banner, set slot ids, and wait for AdSense to serve ads to a new site |
| Old content after an edit | Redeploy. Pages are generated at build time |
| `npm test` fails after an update | Run `npm install`, then check which test changed |
