# palm-1jnz

The 1j.nz deployment of [palm](https://github.com/jason-s13r/palm). This repo
holds only what makes the instance ours: `palm.config.ts`, `wrangler.jsonc`
and the release workflow. All the code comes from a pinned
`@jason-s13r/palm-worker` package, vendored in `vendor/`.

## Deploying

Run the **Release** workflow (Actions → Release → Run workflow):

- With no version, it takes the latest palm release.
- With a version, it pins that one, which is also how to roll back.

It vendors the package, checks the Worker still typechecks and bundles,
commits `chore(release): palm X.Y.Z`, and moves the `cloudflare` branch.
Workers Builds deploys the `cloudflare` branch.

To roll back without waiting for a build, use `wrangler rollback` or the
Cloudflare dashboard's Deployments tab, then run Release with that version so
the repo matches.

Check a deploy at `https://palm-1jnz.jason-2ab.workers.dev/_palm/version`.

## One-time setup

1. **Package access.** After palm's first release publishes
   `@jason-s13r/palm-worker`, open the package on GitHub (palm repo →
   Packages → palm-worker → Package settings → Manage Actions access) and add
   this repository with the Read role.
2. **Workers Builds.** In the Cloudflare dashboard, Workers & Pages → Create →
   Import a repository → `palm-1jnz`. Worker name `palm-1jnz`, production
   branch `cloudflare`, build command `pnpm install --frozen-lockfile`, deploy
   command `npx wrangler deploy`. Turn off builds for non-production branches.
3. **Run Release** once.

## Going live (M5)

Swap the `workers_dev` line in `wrangler.jsonc` for the commented routes,
delete the zone's "redirect to jason.schwarzenberger.co.nz" Redirect Rule (palm
does that redirect itself from `browserRedirect`), and add a WAF skip rule for
`application/activity+json` requests.
