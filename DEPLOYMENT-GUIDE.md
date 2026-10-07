# Developer Guide: Git, free deployment, sitemap and earning (zero budget)

For: Aqib Ejaz (or any developer taking over this project)
Project: CalcPoint, a Next.js 16 calculator website
Goal: push the code to GitHub, put the site online **for free**, get it indexed by Google, and earn money later.

> Prices, free-plan limits and dashboard menu names change. Everything below was checked against public sources when this guide was written, but confirm limits on the provider's own pricing page before you rely on them. Where I could not test something, this guide says so.

---

## 0. The short version

1. **Do not use Vercel's free (Hobby) plan if you plan to show ads.** Vercel's rules limit Hobby to non-commercial use and count ads such as Google AdSense as commercial.
2. **Deploy on Netlify's free plan instead.** Netlify staff have stated on their community forum that ads are allowed on the free plan, and Netlify says Next.js 16 deploys with zero configuration.
3. **GitHub is free** for the code.
4. **Google Search Console, Bing Webmaster Tools, Google Analytics and PageSpeed Insights are free.**
5. **AdSense needs a domain you own.** Free subdomains such as `yoursite.netlify.app` are normally refused. A domain is the one small cost you cannot avoid for AdSense (usually a few dollars to about 15 dollars a year, check a registrar). Until you can pay for one, earn in the free ways in section 9.
6. **Nobody can promise income.** Money follows traffic, and a new site usually needs months of steady publishing before search traffic appears.

---

## 1. Names: site, domain and repository

### Site name (brand)

People find a site by (a) the search phrase they type and (b) a name they remember. Use both:

- **Brand name:** short, easy to spell and say, no hyphens or numbers, 6 to 12 letters, and a word that suggests calculators ("calc").
- **Keywords go in the page titles and headings**, not only in the name. The site already does this, for example "Percentage Calculator – Increase, Decrease, Percent Of".

The project ships with the name **CalcPoint**. It is a reasonable default, but a common-sounding name may already be taken by another business or have a taken domain. Candidate names to check yourself (I cannot check availability for you):

| Idea | Why it could work |
|---|---|
| CalcPoint | Already in the code, easy to say |
| CalcNest | Short, memorable |
| QuickCalcHub | Describes the site, a bit long |
| CalcDeck | Short, modern |
| SumSpot | Playful, easy to remember |

**Before you commit to a name:**
1. Search it on Google in quotes. If a larger business already uses it, pick another.
2. Check the domain at any registrar's search box.
3. Check that the GitHub, X and Instagram handles are free (nice to have, not required).

To change the name everywhere, edit **one line**: `name` in `lib/siteConfig.ts`. Titles, footer, manifest, schema and legal pages update from it.

### Domain

- Prefer **.com** if available. Short, no hyphens, no numbers.
- If the .com is taken, a cheaper extension such as `.net`, `.org`, `.app` or `.tools` works, but check the renewal price, not just the first-year price.
- Avoid "free domain" services that give you a domain with no ownership guarantee. AdSense requires a domain you actually own.

### GitHub repository name

Repository names are not a major ranking factor. Use one that is clear and keyword-friendly:

| Field | Recommendation |
|---|---|
| Repository name | `calcpoint-online-calculators` (brand plus what it is) |
| Description | `Free online calculators (scientific, percentage, BMI, unit converter, loan EMI, tip) built with Next.js, TypeScript and Tailwind CSS` |
| Website field | Add your live URL once deployed |
| Topics | `nextjs` `react` `typescript` `tailwindcss` `calculator` `scientific-calculator` `seo` |
| Visibility | Public is fine and free. No secrets are stored in this project |

If you rename the site, rename the repository to match.

---

## 2. Your $0 toolbox

| Need | Tool | Cost |
|---|---|---|
| Code storage | GitHub | Free |
| Hosting | Netlify Starter (recommended) | Free |
| Search visibility | Google Search Console | Free |
| Bing and DuckDuckGo-style traffic | Bing Webmaster Tools | Free |
| Visitor stats | Google Analytics 4 | Free |
| Speed test | PageSpeed Insights | Free |
| Structured data test | Rich Results Test | Free |
| Security headers test | securityheaders.com | Free |
| Uptime alerts | UptimeRobot (free tier) | Free |
| Topic research | Google Trends and Search Console queries | Free |
| Domain (needed for AdSense) | Any registrar | Small yearly fee |

---

## 3. Where to deploy for free

| Host | Free plan | Ads allowed on free plan? | Works with this project | Verdict |
|---|---|---|---|---|
| **Netlify** | Yes, no card needed to start | **Yes**, per Netlify staff (ads on your own content are fine; Pro is required only if you bill others for hosting their sites) | Next.js 16 supported with zero configuration, **not tested by me on this project** | **Recommended** |
| **Cloudflare Pages / Workers** | Yes, unlimited bandwidth | Reported yes | Needs extra Next.js adapter setup, more work | Good second choice for advanced users |
| **Vercel Hobby** | Yes | **No**, ads are treated as commercial | Works perfectly (project was built for it) | Fine only before you add ads |
| **GitHub Pages** | Yes | Discouraged for commercial sites | Would need a static export, breaks headers | Not recommended |
| **Free "website builders" with ads** | Yes | They add their own ads | Not applicable | Not suitable |

**Why Netlify:** you can launch and earn on the same free plan without moving later. A plan switch later is possible, but a move after Google has indexed your URLs means redirect work.

Free-plan limits (bandwidth, build minutes, function calls) have changed over time. Read the current numbers at netlify.com/pricing. A static calculator site uses very little.

---

## 4. Prerequisites

- Node.js 20 or newer (`node -v`)
- Git (`git --version`)
- A GitHub account and a Netlify account (sign up with your GitHub login)
- Two-factor authentication on both accounts. Do this now.

---

## 5. Step A: run the project locally

```bash
unzip calculator-app.zip
cd calculator-app
npm install
npm test            # expect all tests to pass
npm run dev         # open http://localhost:3000
```

Try these in the calculator: `0.1+0.2` (0.3), `5/0` (clear error), `sin(30)` in scientific mode (0.5), `200+10%` (220).

---

## 6. Step B: push the code to GitHub

### B1. Create the empty repository

1. github.com, then **New repository**.
2. Name: `calcpoint-online-calculators`.
3. Public. **Do not** add a README, .gitignore or license (the project already has them).
4. Click **Create repository** and copy the URL.

### B2. Push

```bash
cd calculator-app
git init
git add .
git status                      # check: NO .env or .env.local file in the list
git commit -m "Initial commit: CalcPoint online calculators"
git branch -M main
git remote add origin https://github.com/<your-username>/calcpoint-online-calculators.git
git push -u origin main
```

### B3. Sign-in problems

| Message | Fix |
|---|---|
| `Authentication failed` | GitHub no longer accepts account passwords. Use GitHub Desktop, or run `gh auth login` (GitHub CLI), or create a personal access token and use it as the password |
| `remote origin already exists` | `git remote set-url origin <url>` |
| `failed to push some refs` | The remote has files. Create the repo empty, or run `git pull origin main --rebase` first |
| `.env` appears in `git status` | Do not commit it. Run `git rm --cached .env` and keep it in `.gitignore` |

### B4. Daily workflow after that

```bash
git add .
git commit -m "Add guide: how to calculate discounts"
git push
```

Netlify rebuilds and publishes automatically after each push.

---

## 7. Step C: deploy on Netlify (free, ads allowed)

1. Go to app.netlify.com and log in with GitHub.
2. **Add new site**, then **Import an existing project**, then **GitHub**, and choose the repository.
3. Build settings are detected for Next.js. Leave them as detected (build command `npm run build`). If a field is empty, use that command.
4. **Environment variables** (Site configuration, Environment variables). Add these now or later; all are optional:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live URL with `https://` and no trailing slash. Add it after the first deploy shows you the URL, then redeploy |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The email you want on the Contact page |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Code from Search Console (section 8) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Code from Bing Webmaster Tools |
| `NEXT_PUBLIC_GA_ID` | Optional, `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and slot IDs | **Leave empty** until AdSense approves you |

5. Click **Deploy**. The first build takes a few minutes.
6. Open the Netlify URL. Run the test list below.

### First-deploy test list

- [ ] Home page and all 8 calculators open and give correct answers
- [ ] `/sitemap.xml`, `/robots.txt` and `/guides` open
- [ ] Footer shows "Made by Aqib Ejaz" and the link opens your portfolio
- [ ] Dark mode toggle works and stays after a refresh
- [ ] On a real phone: keys are easy to tap and nothing scrolls sideways
- [ ] Open securityheaders.com with your URL (the project sets strong headers; if the grade is low on Netlify, tell me which header is missing)
- [ ] PageSpeed Insights on mobile for the home page

**If a build fails:** open the deploy log, read the first red error. Most common causes are in section 12.

### Alternative: Vercel (only until you add ads)

1. vercel.com, log in with GitHub, **Add New, Project**, import the repository, **Deploy**.
2. Add the same environment variables.
3. Do not enable ads on the Hobby plan. When you want ads, either move to Netlify or pay for Vercel Pro.

---

## 8. Step D: sitemap, indexing and everything you must do by hand

The code already creates `/sitemap.xml`, `/robots.txt`, canonical URLs, page titles and structured data automatically. Google still will not know your site exists until you tell it.

### D1. Google Search Console (the most important step)

1. Go to search.google.com/search-console and click **Add property**.
2. If you have your own domain, choose **Domain** and verify with a DNS record at your registrar.
3. If you only have the free Netlify address, choose **URL prefix**, enter your full URL (for example `https://yourname.netlify.app`) and pick **HTML tag** verification.
4. Copy only the code from `content="..."` in the tag (not the whole tag).
5. In Netlify, add it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then **Trigger deploy**.
6. When the deploy finishes, click **Verify** in Search Console.
7. Left menu, **Sitemaps**, enter `sitemap.xml`, **Submit**. The status should say Success.
8. Left menu, **URL Inspection**, paste your home page URL, click **Request indexing**. Repeat for each calculator page and each guide.

### D2. Bing Webmaster Tools

1. bing.com/webmasters, sign in, then **Import from Google Search Console** (fastest), or add the site and use the meta tag with `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
2. Submit `sitemap.xml` if it was not imported.

### D3. When you buy a domain later

1. Add it in Netlify (Domain management) and follow its DNS instructions at your registrar.
2. Set `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy so canonical URLs, sitemap and social cards update.
3. In Search Console add the new domain as a new property and submit the sitemap again.
4. Set up a **301 redirect** from the old netlify.app address to the new domain (Netlify supports this in domain settings) so you do not lose indexed pages.

### D4. Free tests to run once

- Rich Results Test on one calculator page (FAQ) and one guide (Article)
- PageSpeed Insights (mobile) on the home page and one inner page
- Search Console, **Pages** report: look for "Crawled, currently not indexed" and fix thin pages first

### D5. What to expect

- Google can take days to weeks to index a brand-new site. Requesting indexing helps but does not force it.
- Rankings usually take months. Do not judge the site in week two.

### What is automatic and what is yours

| Task | Automatic (already in code) | Yours to do |
|---|---|---|
| `sitemap.xml` generated and updated with each deploy | Yes | Submit it once in Search Console and Bing |
| `robots.txt`, canonical URLs, titles, descriptions | Yes | Keep titles under 60 characters and descriptions 140 to 160 when you add pages |
| Structured data (FAQ, Breadcrumb, Article, WebApplication) | Yes | Test with Rich Results Test |
| Internal links between tools and guides | Yes | Add 3 or more links to every new page |
| New content | No | Publish on a schedule (section 10) |
| Backlinks | No | Outreach (section 10) |
| AdSense approval | No | Apply after you own a domain and have content |
| Reading Search Console | No | Check weekly |

---

## 9. How to earn money from this site

**Be realistic.** Income depends on visitors, and a new calculator site faces strong competition from established ones. Many new sites earn very little for the first several months. The plan below puts the fastest realistic income first.

### Order of attack for someone with no money

| # | Method | Cost | Needs a domain? | Realistic timing | Notes |
|---|---|---|---|---|---|
| 1 | **Use the site as proof of skill and sell development work** | Free | No | Can start immediately | You are a full-stack developer. A fast, tested, SEO-ready Next.js site is a strong portfolio piece. Link it from your portfolio, GitHub and LinkedIn and offer custom calculators, landing pages or SEO-ready sites to local businesses or on freelance platforms. Joining is free (platforms take a commission) |
| 2 | **Donation link** | Free | No | Small, slow | Add a donate or "buy me a coffee" link to the footer. Only works once people like the tool |
| 3 | **Affiliate links** | Free to join most programs | Sometimes | Months, needs traffic | Join programs relevant to your pages (loan, budgeting, health, education). Many require a live site and some refuse free subdomains. Check each program's rules and whether it accepts your country. The project has a labeled block in `content/affiliates.ts`, empty by default. Always disclose affiliate links |
| 4 | **Google AdSense** | Domain only (small yearly fee) | **Yes** | Months | The main passive option. Apply once you own a domain and have real content |
| 5 | **Sponsored mentions or paid listings** | Free | Better with one | Needs steady traffic | Possible later when you have traffic numbers to show |

### AdSense step by step

1. Be 18 or older (you can sign up with your own Google account).
2. Buy a domain and connect it to Netlify (D3).
3. Make sure these exist and are linked in the footer: About, Contact, Privacy Policy, Terms. (They are already in this project.)
4. Have real, original content live. This project ships 8 tools and 3 guides. Keep adding for a few weeks before applying.
5. Google's own FAQ says that in some regions a site should have been active for about six months. Check the AdSense eligibility rules for your country.
6. Apply at adsense.google.com with your domain.
7. Put your publisher ID in Netlify as `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and redeploy. This adds the ownership meta tag and a generated `/ads.txt`. Open `/ads.txt` on your site afterwards to confirm it shows a line with `google.com, pub-...`.
8. Wait for Google's decision (days to weeks). A refusal is common for new sites. Read the reason, improve content, and reapply.
9. After approval, create 3 ad units (below the tool, inside the article, sidebar), copy their slot IDs into `NEXT_PUBLIC_ADSENSE_SLOT_BELOW`, `_INLINE` and `_SIDEBAR`, and redeploy.
10. Visitors will see ads only after they accept the cookie banner, which keeps you compliant with consent rules.

**Never:** click your own ads, ask others to click, place ads over buttons, or buy traffic. These get accounts banned.

### Ideas for more pages (each page is one more chance to earn traffic)

Check demand first with Google Trends and, later, Search Console. Ideas: GPA and CGPA calculator, date difference calculator, discount calculator, compound interest calculator, fuel cost calculator. Because you are in Pakistan, tools tailored to local users (for example rupee conversions, CGPA, or salary-tax estimates) may face less competition than global tools, but verify that with Trends before building, and make sure any tax or rate figures are correct and dated.

---

## 10. Your weekly routine (this is the part code cannot do)

| When | Task | Time |
|---|---|---|
| Week 1 | Deploy, verify Search Console and Bing, submit sitemap, request indexing, link the site from your portfolio, GitHub and LinkedIn | 2 to 3 hours |
| Every week | Publish 1 to 2 pages (a guide in `content/guides.ts` or a new tool). Follow the quality gate in `SEO-PLAYBOOK.md` | 3 to 5 hours |
| Every week | Search Console: look at Performance (queries and pages) and the Pages report for errors | 15 minutes |
| Every week | Post 2 or 3 genuinely helpful answers in communities where self-promotion is allowed, with a link only when it truly helps | 30 minutes |
| Every month | One link-worthy asset (for example a printable unit conversion chart). Ask one relevant site or teacher to list your free tools | 2 hours |
| Every quarter | Refresh your best pages, fix broken links, run `npm audit --omit=dev` and update dependencies | 1 hour |

Adding a guide: copy an entry in `content/guides.ts`, change the text and date, commit and push. The guide, sitemap entry and structured data appear automatically after the deploy.

---

## 11. Costs: the honest list

| Item | Needed for | Cost |
|---|---|---|
| GitHub, Netlify, Search Console, Bing, Analytics, PageSpeed | Everything except ads | Free |
| Domain name | AdSense, a more trusted brand, better long-term SEO | Small yearly fee (check a registrar) |
| Anything else | Not required | Free |

If you cannot afford the domain yet: launch on the free address, publish steadily, use methods 1 to 3 in section 9, and buy the domain when you have some traffic or income. Remember to redirect the old address when you move (D3).

---

## 12. Common problems and fixes

| Problem | Fix |
|---|---|
| Build fails with a fonts error | The build cannot reach Google Fonts. On Netlify this normally works. If it keeps failing, switch to `next/font/local` |
| Build fails with a TypeScript error | Run `npm run typecheck` locally and fix the file shown |
| Page shows `localhost` in canonical URL | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| `/ads.txt` shows 404 | Normal until `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set |
| Search Console says "Couldn't fetch" for the sitemap | Wait a few minutes and resubmit. Confirm `/sitemap.xml` opens in your browser |
| Verification fails | You must redeploy after adding the verification variable. Paste only the code, not the full tag |
| New pages not in Google after a week | Request indexing for them in URL Inspection and add links to them from existing pages |
| Ads do not show | You must accept the cookie banner, the slot IDs must be set, and AdSense may take time to serve ads on a new site |
| Old content after an edit | Push again. Pages are generated at build time |

---

## 13. Final checklist

- [ ] Name chosen, `lib/siteConfig.ts` updated if you changed it
- [ ] Two-factor authentication on GitHub, Netlify, Google and your registrar
- [ ] Code pushed to GitHub, no `.env` files committed
- [ ] Site live on Netlify, test list in section 7 passed on a real phone
- [ ] Search Console verified, sitemap submitted, key pages requested
- [ ] Bing Webmaster Tools set up
- [ ] Links added from your portfolio, GitHub and LinkedIn
- [ ] Weekly publishing routine on your calendar
- [ ] Ads left off until you own a domain and AdSense approves you
- [ ] Domain bought later, redirects set up, `NEXT_PUBLIC_SITE_URL` updated

## 14. Things I could not verify

- I did not deploy this project to Netlify myself. Netlify states Next.js 16 works with zero configuration, so it should, but if you see an issue, check the deploy log first.
- I could not check whether any name or domain in section 1 is available.
- Free-plan limits and dashboard menu names change. Check the provider's page before relying on a number.
- I could not test the site in a real browser or on a phone. All logic has automated tests and the production build was checked, but please do the phone test yourself.
