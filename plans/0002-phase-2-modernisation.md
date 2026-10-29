---
created: 2026-10-29
---

# Phase 2 modernisation: Tailwind, shadcn/ui, react-hook-form and guard rails

## Goal

Finish the frontend modernisation that phase 1 (`plans/complete/0001-phase-1-deployable.md`) deliberately deferred: consolidate styling on Tailwind 4 with shadcn/ui components and remove styled-components, replace Formik + yup with react-hook-form + zod, and add the guard rails that keep the repo from drifting again (lint rules back to error, grouped Renovate updates, CI on PRs). The user framed this as "phase 2 of modernisation", starting with the styled-components → Tailwind move and Formik → react-hook-form.

## Context

- **What it is:** a memorial site ("For Sean") where people sign in and share photos, videos and stories. It is live and in active use. Read the Context section of `plans/complete/0001-phase-1-deployable.md` for hosting, Firebase projects, env vars and CLI setup - all still current.
- **Stack after phase 1:** Next 16.4 Pages Router (`src/pages/`: `index`, `login`, `register`, `recover-password`, `upload`, `404`, `_app`), React 19, TypeScript 6, ESLint 9 flat config (`eslint.config.mjs`), pnpm 9.15 (`packageManager` field), Node 24. Client-side Firebase app; no server data fetching or API routes. Icons are `lucide-react`.
- **Commands:** `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm lint:ts`. `functions/` is a separate pnpm package (`pnpm --dir functions run lint|build`), untouched by this plan except for Renovate and CI.
- **Testing environment:** local `pnpm dev` and Vercel previews talk to staging (`sean-dev-426404`). Prod (`sean-68394`) is read-only for checks - never upload, register or sign in as a test on prod.
- **Styling today:** styled-components 6 in 27 files, plus some Tailwind 3 classes in 5 files (`album-display.tsx`, `announcements.tsx`, `memory-card.tsx`, `memory-list.tsx`, `auth-page.tsx`).
  - styled-components files: every file in `src/components/atoms/`; `src/components/molecules/{announcements/*, button-group, hero, input-group, memory-card/memory-card.styles.ts, nav-link}`; `src/components/organisms/{login-form, memory-list/memory-list.styles.ts, upload-form/upload-form.styles.ts}`; `src/components/templates/{auth-page, layout}`; `src/pages/{_app, index, recover-password, upload}`; `src/shared/GlobalStyle.ts`.
  - Theme: `src/styles/theme.ts` (colours `fg #414141`, `bg #fafcff`, `pastelPink #ffebe7`, `pastelGreen #ebfcf6`, `pastelBlue #e0edfd`, `link #3273dc`, `brand #075252`, `error #ff6961`, `accent #7ac5d8`, two accent gradients; fonts Patrick Hand, Taviraj, Inter, Poppins), typed via `styled.d.ts` at the repo root. Fonts load from Google Fonts in `src/styles/imports.css`.
  - Tailwind 3 config: `tailwind.config.js`, `postcss.config.js` (tailwindcss + autoprefixer). `next.config.js` has `compiler.styledComponents: true`.
- **Forms today:** Formik in `src/components/atoms/{form,input}.tsx`, `src/components/organisms/{login-form,register-form,upload-form/upload-form}.tsx`, `src/pages/recover-password.tsx`, `src/utils/helpers.ts`. yup in `login-form.tsx`, `register-form.tsx` and `src/schema/post-validation-schema.ts`.
- **Path aliases** (`tsconfig.json` `paths`): `@atoms/*`, `@molecules/*`, `@organisms/*`, `@templates/*`, `@context/*`, `@hooks/*`, `@pages/*`, `@schema/*`, `@shared/*`, `@styles/*`, `@utils/*`. shadcn's CLI expects a `@/*` alias and a `components.json`.
- **Lint state:** `pnpm lint` reports 13 warnings, from rules phase 1 downgraded to `warn` to avoid new lint failures: `react-hooks/immutability`, `react-hooks/set-state-in-effect`, `@typescript-eslint/no-explicit-any`. Locations: `album-display.tsx:45` and `memory-list.tsx:30` (setState in effect), `memory-card.tsx:41` (immutability), `src/hooks/useScroll.tsx` (any + reassigned `throttleTimeout`), `src/utils/helpers.ts:4-5` (any in `errorIn`). `useScroll` and `errorIn` have **no callers** in `src/`.
- **Renovate:** `renovate.json` disables all updates (`packageRules` with `enabled: false` for `*`) and keeps only vulnerability alerts.
- **CI:** none - `.github/` holds only `CODEOWNERS` and `pull_request_template.md`. Vercel builds previews but never runs lint or typecheck.
- **Reference branch:** draft PR #28 (`upgrade` branch, June 2025, based on March 2025 main) attempted Tailwind 4 + shadcn + react-hook-form + zod on Next 15. It conflicts with main and is not mergeable, but `git show origin/upgrade:<path>` is a useful reference, especially `src/components/ui/*`, `src/styles/globals.css`, `src/lib/utils.ts`, and the rewritten forms (`login-form.tsx`, `register-form.tsx`, `upload-form.tsx`, `src/pages/recover-password.tsx`).
- **PRs:** follow `CLAUDE.md` - before/after screenshots of changed views via the `screenshots` skill (`.claude/skills/screenshots`), attached with `gh pr create --attach`, using `.github/pull_request_template.md`. Ask the user before pushing a branch or commenting on GitHub.

## Decisions

- **shadcn/ui for components** (user, 2026-10-29), over hand-rolled Tailwind atoms. Brings Radix primitives, `class-variance-authority`, `clsx` and `tailwind-merge`. Add only the shadcn components the app actually uses (likely button, input, textarea, label, select, checkbox, card, form) - not the whole library.
- **zod replaces yup** (user, 2026-10-29), wired through `@hookform/resolvers/zod`. Remove `yup` once nothing imports it.
- **Keep the site's current look.** This is a migration, not a redesign: map `theme.ts` colours and fonts to Tailwind 4 `@theme` tokens and shadcn CSS variables, and match each view's appearance. Visual changes beyond what shadcn primitives force need the user's sign-off; before/after screenshots make any drift visible.
- **Styling first, then forms.** Both rewrite the same form components; doing Tailwind first means the react-hook-form step rewrites components once onto shadcn's `Form` wrapper.
- **Delete dead code instead of fixing it.** `src/hooks/useScroll.tsx` and `errorIn` in `src/utils/helpers.ts` have no callers, so they go rather than being typed and fixed.
- **Restore the three relaxed lint rules to `error`** (`react-hooks/immutability`, `react-hooks/set-state-in-effect`, `@typescript-eslint/no-explicit-any`) once their warnings are gone, so they cannot regress.
- **Renovate: grouped and scheduled**, not one PR per package. Keep vulnerability alerts as they are.
- **CI comes first** (user, 2026-10-29): it is good practice and has no blockers, and it then guards every later phase 2 PR.
- **CI runs lint, typecheck and build** for the root and `functions/` on PRs. No tests exist (phase 1 removed the placeholder Jest test); adding tests is out of scope.
- **Move `typescript` to `devDependencies`** - it is build tooling.
- **Out of scope:** App Router migration (seven pages, no server data fetching - it adds nothing, as phase 1 decided); moving hosting to Coolify (a later phase - keep avoiding Vercel-only features); adding tests.
- **PR #28 is closed and the `upgrade` branch deleted only at the end**, as it is the reference for this work.

## Steps

### 1. CI

- [x] On its own branch from `main`, add `.github/workflows/ci.yml` running on `pull_request` and pushes to `main`: checkout, `pnpm/action-setup` (version from `packageManager`), `actions/setup-node` with the Node version from `.nvmrc` and pnpm cache, `pnpm install --frozen-lockfile`, then `pnpm lint`, `pnpm lint:ts`, `pnpm build` at the root and `pnpm --dir functions install --frozen-lockfile`, `run lint`, `run build`. Check whether `pnpm build` needs the `NEXT_PUBLIC_FIREBASE_*` vars at build time; if it does, ask the user how to supply them (staging values as repo variables) before adding them. Lint warnings exit 0, so the 13 existing warnings don't fail CI. Done 2026-10-29 on branch `ci/add-workflow`: `next build` does need the vars (prerendering initialises Firebase Auth, which throws `auth/invalid-api-key` without a key), but any non-empty value works, so the workflow sets them to `ci-placeholder` (user's choice over staging repo variables - CI makes no Firebase calls). Every step passed in a clean worktree with no `.env.local`.
- [x] Open a PR and confirm the workflow runs green on it. Done 2026-10-29: PR #52, with `actions/checkout@v7`, `pnpm/action-setup@v6`, `actions/setup-node@v7` (latest at the time) and Node from `.nvmrc`.

### 2. Small cleanup

- [ ] Branch from `main`.
- [ ] Move `typescript` from `dependencies` to `devDependencies`.
- [ ] Delete `src/hooks/useScroll.tsx` and `errorIn` from `src/utils/helpers.ts` (keep `toDataUrl`). Re-grep to confirm no callers.

### 3. Tailwind 4 + shadcn/ui, remove styled-components

- [ ] Upgrade to Tailwind 4 with the official tool (`npx @tailwindcss/upgrade`), which moves config into CSS and switches PostCSS to `@tailwindcss/postcss`. Fold `src/styles/imports.css` into a single global stylesheet. Drop `autoprefixer` if Tailwind 4 no longer needs it, and delete `tailwind.config.js` if nothing remains in it.
- [ ] Define the `theme.ts` colours and fonts as Tailwind `@theme` tokens, including the two accent gradients (as utilities or CSS variables).
- [ ] Add a `@/*` → `./src/*` path alias and run `npx shadcn@latest init`, mapping shadcn's base colours to the existing palette. Place shadcn components in `src/components/ui/` and the `cn` helper in `src/lib/utils.ts` (as PR #28 did).
- [ ] Convert components from styled-components to Tailwind, one directory at a time (atoms, molecules, organisms, templates, pages), replacing atoms with shadcn components where one exists. Move `GlobalStyle.ts` rules into the global stylesheet and remove `ThemeProvider`/`GlobalStyle` from `_app.tsx`. Check each view in `pnpm dev` against its pre-change screenshot as you go.
- [ ] Fix the setState-in-effect and immutability warnings in `album-display.tsx`, `memory-list.tsx` and `memory-card.tsx` while rewriting them.
- [ ] Remove `styled-components`, `styled.d.ts`, `src/styles/theme.ts`, `src/shared/GlobalStyle.ts`, and `compiler.styledComponents` from `next.config.js`. `grep -rn styled src` returns nothing.
- [ ] Clean up path aliases left pointing at empty or deleted directories.
- [ ] Open a PR with before/after screenshots of every page (home with memories, login, register, recover-password, upload, 404), desktop and mobile width.

### 4. react-hook-form + zod

- [ ] `pnpm add react-hook-form zod @hookform/resolvers`; add the shadcn `form` component if not already present.
- [ ] Rewrite `login-form.tsx`, `register-form.tsx`, `upload-form` and `recover-password.tsx` with `useForm` + `zodResolver`, keeping the same fields, validation rules, error messages and submit behaviour (Firebase calls, toasts, redirects). Port `post-validation-schema.ts` to zod; the five `MemoryCategory` values must stay identical.
- [ ] Remove `formik` and `yup`. `grep -rnE "formik|yup" src` returns nothing.
- [ ] Open a PR with before/after screenshots of each form, including a validation-error state.

### 5. Lint rules to error

- [ ] Confirm `pnpm lint` reports zero warnings, then set `react-hooks/immutability`, `react-hooks/set-state-in-effect` and `@typescript-eslint/no-explicit-any` to `error` in `eslint.config.mjs` (or remove the overrides if the presets already default to error).

### 6. Renovate

- [ ] Rewrite `renovate.json`: extend `config:recommended` (`config:base` is deprecated), remove the disable-all rule, schedule weekly, group all non-major updates into one PR, leave majors as separate PRs, and keep `vulnerabilityAlerts` and `osvVulnerabilityAlerts`. Cover `functions/` too. Respect the pins listed in phase 1's Open questions (`typescript` 6.x, `eslint` 9, `@types/node` 24) with `allowedVersions` or by disabling majors for those packages.
- [ ] Validate with `npx --package renovate renovate-config-validator`.

### 7. Wrap up

- [ ] **[USER]** Confirm, then close draft PR #28 (`gh pr close 28 --delete-branch`).

## Verification

- `pnpm lint` (zero warnings), `pnpm lint:ts` and `pnpm build` pass at the root; `pnpm --dir functions run lint` and `run build` pass.
- `grep -rnE "styled-components|formik|yup" src package.json` returns nothing.
- CI runs green on the phase 2 PRs.
- Locally or on the Vercel preview (both on staging): every page matches its before screenshot apart from agreed changes, at desktop and mobile width. Login with Google and email/password, registration, password recovery and upload all work, and the forms show validation errors for invalid input. The browser console shows no new warnings.
- Renovate's next run opens a grouped weekly PR (or its dependency dashboard shows the grouped schedule) instead of nothing.

## Open questions

Answered: `next build` needs the Firebase env vars in CI; placeholders suffice (see step 1).
