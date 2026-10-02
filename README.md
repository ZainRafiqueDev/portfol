# Adil Rafique — Portfolio (Next.js)

Animated portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **GSAP** (ScrollTrigger + SplitText), **Motion** (motion.dev, formerly Framer Motion), **Lenis** smooth scroll, **Ant Design** and React Bits / Aceternity-style components.

## Quick start

```bash
npm install
cp .env.example .env.local   # then paste your Web3Forms key (see below)
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`

## Contact form → email notifications

The contact form sends to **[Web3Forms](https://web3forms.com)**, which emails every submission to you. It's free (250 submissions/month), and you don't need a backend or an SMTP password.

1. Go to https://web3forms.com, enter **the email address where you want to receive messages**, and click *Create Access Key*.
2. Web3Forms emails you the access key. Open that email and copy the key.
3. Create `.env.local` in the project root:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=paste-your-key-here
   ```
4. Restart `npm run dev`. Submit the form, and you'll get an email with the name, email, service, budget and message. Hit *Reply* and the email goes straight to the visitor (the form sets `replyto`).
5. When you deploy (e.g. Vercel → Project → Settings → Environment Variables), add the same `NEXT_PUBLIC_WEB3FORMS_KEY` variable, then redeploy.

To change the receiving email later, create a new key for the new address and swap it in `.env.local` / Vercel.

The form already includes validation (Ant Design Form), a hidden honeypot field for spam, loading state, and success/error toast notifications. If the key is missing it shows a warning and points visitors to your email instead.

## Editing content

Almost all text lives in **`src/data/portfolio.js`**: profile, socials, email, stats, skills (with levels), expertise, services, projects, experience, automation steps and "why work with me" features. Replace `public/Adil-Rafique-CV.pdf` to update the CV.

## Structure

```
src/
  app/            layout.jsx (fonts, theme script), page.jsx, globals.css (theme tokens)
  components/
    providers/    ThemeProvider (light/dark + circular view-transition), SmoothScroll (Lenis+GSAP), Providers (AntD theme)
    ui/           SplitText, RotatingText, CountUp, SpotlightCard, Magnetic, TiltCard, Reveal, CustomCursor, ScrollProgress, ThemeToggle
  sections/       Navbar, Hero, Marquee, About, Skills, Services, Work, Experience, Automation, Features, Contact, Footer
  data/           portfolio.js
_original/        the previous static HTML/CSS/JS version + original CV
```

## Features

- Light/dark theme: follows the system setting, remembers the visitor's choice, has no flash on load, and switches with a circular reveal animation
- GSAP: SplitText headline reveal, scroll-scrubbed bio text, pinned horizontal project gallery, scroll-drawn experience timeline
- Motion: orbiting tech stack with cursor parallax, rotating roles, magnetic buttons, 3D tilt cards, spotlight hover cards, animated skill bars, animated navbar pill, scroll progress bar, custom cursor
- Ant Design: themed contact form, Segmented skill tabs, notifications (theme follows light/dark)
- Respects `prefers-reduced-motion`; fully responsive
