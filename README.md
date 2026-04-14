# LetsCode — Software Development Company

Company website for LetsCode, built with Next.js 15. Each developer on the team has their own portfolio page.

## Structure

```
app/
  layout.js              → Shared layout (Navbar + Footer)
  page.js                → Homepage (company site)
  not-found.js           → 404 page
  globals.css            → Design system
  team/[slug]/page.js    → Individual developer portfolios
components/
  Navbar.js              → Navigation (client component)
  Footer.js              → Footer
  TeamCard.js            → Developer card
  AnimateOnScroll.js     → Scroll animation wrapper
  TypeWriter.js          → Typing effect
  ScrollToTop.js         → Scroll-to-top button
data/
  team.js                → Developer profiles
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Adding a new developer

Add an entry to `data/team.js` with:
- `slug` — URL path (e.g. `"jane-doe"` → `/team/jane-doe`)
- `name`, `role`, `location`, `linkedin`, `bio`
- `expertise` — list of skill areas
- `stack` — technologies used
- `projects` — array of `{ title, description }`
- `image` — path to profile photo in `public/images/profiles/`

## Build for production

```bash
npm run build
npm start
```