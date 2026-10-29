---
name: screenshots
description: Capture before/after screenshots of a view in this app, for a PR's Evidence section or to check a UI change.
---

# Screenshots

Run the dev server on the base branch, then on the PR branch, and screenshot the same URL on each. Next allows one `next dev` per checkout, so take the shots in turn, not side by side.

1. Take the **before** shot from the base branch, checked out in this checkout with `git switch --detach origin/main`. The working tree must be clean. Run `pnpm install` if the lockfile differs between branches.
2. Start the server on a free port in the background with `pnpm exec next dev --port <port>`, and wait until `curl localhost:<port>` responds. If it exits with "Another next dev server is already running", ask the user to stop theirs rather than killing it.
3. Screenshot with `node .claude/skills/screenshots/shot.mjs <url> <out.png>`, writing to the scratchpad, never the repo. Run it from the repo root so `@playwright/test` resolves. It captures the full page.
4. Stop the server with `pkill -f "next dev --port <port>"` and switch back to the PR branch. Repeat steps 2-4 for the **after** shot.
5. Read both PNGs to check they show the intended view, not an error overlay or a half-rendered page.

The app reads live data from the `sean-dev-426404` Firebase project in `.env.local`, so take both shots close together. A fresh browser context is signed out, and `/upload` redirects it to `/login`; to shoot a signed-in view, ask the user for a dev account to sign in with first.
