# Security Policy

This document explains how this site is protected, what you must configure yourself, and how to report a problem.

> **Honest note on DDoS:** no website can be made 100% immune to denial-of-service attacks. What you can do is (1) make the site cheap to serve, (2) put it behind a network that absorbs floods, and (3) have rules ready to block abuse. This project does all three as far as code allows. The rest is configuration in your Vercel dashboard, listed below.

## 1. Built-in protections (already in the code)

| Protection | Where | What it does |
|---|---|---|
| **Fully static pages** | all routes are prerendered at build time | Every page is served from Vercel's CDN cache. No server code runs per visit, so a flood of requests cannot exhaust a server or database. This is the single strongest defence. |
| **No backend, no database, no API routes, no forms** | whole project | Nothing to inject into, nothing to brute force, no user accounts to steal. Calculations run in the visitor's browser. |
| **No `eval()` / `new Function()`** | `lib/calculatorLogic.ts` | The calculator uses a hand-written parser, so typed input can never run as code. |
| **Content-Security-Policy** | `next.config.ts` | Only your own files and the Google ad/analytics hosts may load scripts. Blocks injected third-party scripts, `object`/`embed`, and restricts form targets and `<base>`. |
| **`frame-ancestors 'none'` + `X-Frame-Options: DENY`** | `next.config.ts` | Stops other sites from embedding yours in a hidden frame (clickjacking). |
| **HSTS** | `next.config.ts` | Browsers will only use HTTPS for two years after the first visit. |
| **`X-Content-Type-Options: nosniff`** | `next.config.ts` | Stops browsers from guessing file types. |
| **`Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`** | `next.config.ts` | Limits data leaked to other sites and turns off camera, microphone, location and payment APIs you never use. |
| **`poweredByHeader: false`** | `next.config.ts` | Does not announce the framework. |
| **Safe JSON-LD output** | `components/seo/JsonLd.tsx` | Escapes `<` so structured data can never break out of its script tag. |
| **Guarded browser storage** | `lib/useLocalStorage.ts`, `lib/consent.ts` | All `localStorage` reads and writes are wrapped, so corrupted or blocked storage cannot crash the app. Stored history is size-limited to 20 items. |
| **Input validation** | `lib/toolLogic.ts`, tool components | Every field has a range check. Results never show `NaN` or `Infinity`. Very large inputs are rejected. |
| **Consent-gated third parties** | `components/ads/*` | AdSense and Analytics load only after the visitor accepts. |
| **External links use `rel="noopener"`** | footer, affiliate block | Prevents the opened page from controlling yours. |
| **`security.txt`** | `public/.well-known/security.txt` | Tells researchers how to contact you. |

### Why the CSP allows `'unsafe-inline'` for scripts

Next.js and the theme bootstrap script (which prevents a flash of the wrong theme) use inline scripts. A nonce-based policy would force every page to render on demand, which would remove the static CDN caching that protects you from floods. For a site with no logins and no user-generated content, keeping pages static is the better trade. If you later add accounts or user content, move to a nonce-based CSP.

## 2. What you must configure on Vercel (5 minutes, free)

> **Hosting on Netlify instead?** These Vercel dashboard steps do not apply. Everything in section 1 (static pages, headers, no backend) still protects you. Read Netlify's current documentation for its built-in DDoS protection and any rate-limiting options on your plan, and test your headers at securityheaders.com after deploying.


These settings are where real DDoS protection lives. Vercel's current docs state that automatic L3, L4 and L7 DDoS mitigation is on for every plan including Hobby, and that traffic it blocks is not billed. Check [vercel.com/docs/ddos-mitigation](https://vercel.com/docs/ddos-mitigation) for current details.

1. **Do nothing for the baseline.** Always-on DDoS mitigation needs no setup.
2. **Know where Attack Challenge Mode is.** Project, then **Firewall**, then **Bot Management / Attack Challenge Mode**. If you ever see a sudden traffic spike you did not cause, switch it on. It challenges every visitor, so turn it off again after the attack ends.
3. **Add one rate-limit rule.** Project, then **Firewall**, then **Add Rule**. Match all paths, action **Rate Limit**, for example 60 requests per minute per IP, response `429`. On the Hobby plan you get a small number of custom rules and one rate-limit rule per project (check your plan page for current limits). Start in **Log** mode for a day to confirm real visitors are not caught, then switch to enforce.
4. **Block abusive IPs or countries only when you see abuse** in the Firewall traffic view. Do not pre-emptively block regions that may contain real visitors or advertisers.
5. **Turn on deployment protection for preview URLs** (Project Settings, then Deployment Protection) so unfinished builds are not publicly crawlable.
6. **Protect your accounts.** Enable two-factor authentication on GitHub, Vercel, your domain registrar, Google AdSense and Google Analytics. Stolen accounts cause far more damage than DDoS.
7. **Do not stack another CDN or proxy in front of Vercel unless you have a reason.** It is usually unnecessary here, and Vercel's own guidance should be read first because a second proxy can interfere with caching and with how Vercel sees visitor IPs.

> Menu names in the Vercel dashboard change from time to time. If a label differs slightly from the steps above, look for **Firewall** in your project's sidebar.

## 3. Ad fraud and invalid traffic

If you enable AdSense, attackers (or competitors) can send fake clicks to get your account banned. Protect yourself:

- Never click your own ads, and do not ask others to.
- Watch **AdSense, then Policy center, then Invalid traffic** weekly.
- Keep the AdSlot placements as shipped: ads are never placed over buttons or the display.
- Watch for unusual traffic in Analytics (one country or one page suddenly spiking) and use a Vercel Firewall rule to challenge or block it.

## 4. Secrets and environment variables

- Nothing in this project is secret. Every variable starts with `NEXT_PUBLIC_` and is visible in the browser by design (AdSense client id, GA id, contact email).
- **Never** put API keys, passwords or tokens in a `NEXT_PUBLIC_` variable. If you add a live currency API later, call it from a server route and keep its key in a non-public Vercel variable.
- `.env` and `.env.local` are in `.gitignore`. Check `git status` before every push.

## 5. Keeping dependencies safe

```bash
npm audit --omit=dev     # vulnerabilities in what actually ships to visitors
npm outdated             # what is behind
npm update               # apply safe updates, then run npm test && npm run build
```

At the time this project was packaged, `npm audit` reported 0 vulnerabilities. Turn on **GitHub Dependabot alerts** (Repository, then Settings, then Code security) to be told when that changes.

## 6. Pre-launch security checklist

- [ ] Two-factor authentication on GitHub, Vercel, registrar, AdSense, Analytics
- [ ] Vercel Firewall rate-limit rule created (log mode first)
- [ ] Attack Challenge Mode location known
- [ ] Test headers at [securityheaders.com](https://securityheaders.com) after deploy (expect A or A+)
- [ ] `git status` shows no `.env` files tracked
- [ ] Dependabot alerts enabled
- [ ] Contact email in `NEXT_PUBLIC_CONTACT_EMAIL` is one you check

## 7. Reporting a vulnerability

Email the address in `public/.well-known/security.txt` (also on the Contact page) with the page, the steps to reproduce and the impact. Please give a reasonable time to fix the problem before publishing details. Do not run load tests or automated scanners against the live site without permission.
