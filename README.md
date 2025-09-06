# Africa Markett (Next.js + MUI + Tailwind + Supabase, Pages Router, JS)

Frictionless marketplace scaffold using:
- **Next.js (Pages Router, JavaScript only)**
- **MUI + Emotion** (SSR-ready, Tailwind color-mapped theme)
- **Tailwind CSS** with **CSS Modules** using `@apply` only
- **Supabase** client
- **ESLint + Prettier** (Tailwind class sorting)
- **Husky** pre-commit to run lint and tests
- **Absolute imports** via `jsconfig.json`

---

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Fill in Supabase keys in .env.local
npm run dev
