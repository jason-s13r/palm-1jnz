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

Check a deploy at `https://1j.nz/_palm/version`.

## One-time setup

1. **Release palm** (palm repo → Actions → Release) so
   `@jason-s13r/palm-worker` carries the current code.
2. **Package access.** Open the package on GitHub (palm repo → Packages →
   palm-worker → Package settings → Manage Actions access) and add this
   repository with the Read role.
3. **Workers Builds.** In the Cloudflare dashboard, Workers & Pages → Create →
   Import a repository → `palm-1jnz`. Worker name `palm-1jnz`, production
   branch `cloudflare`, build command `pnpm install --frozen-lockfile`, deploy
   command `npx wrangler deploy`. Turn off builds for non-production branches.
4. **Delete the zone's Redirect Rule** ("redirect to
   jason.schwarzenberger.co.nz"). Redirect Rules run before Workers, so while
   it exists palm never sees a request. palm does that redirect itself from
   `browserRedirect`, for `/` and any page it doesn't serve.
5. **Run Release** here. The first deploy creates the D1 database
   (`palm-1jnz`), the R2 bucket (`palm-1jnz-media`) and the queue
   (`palm-1jnz`) from their names in `wrangler.jsonc`, registers the
   10-minute cron and the streaming Durable Object, and routes `1j.nz/*` to the Worker. palm makes its tables on
   its first request.
6. **Check it** at `https://1j.nz/_palm/version` and
   `https://1j.nz/.well-known/nodeinfo`.
7. If Bot Fight Mode or a WAF rule challenges requests, add a skip rule for
   `application/activity+json` requests, or other servers can't reach palm.

## Managing the instance

The palm package carries its admin CLI, and `package.json` gives it this
instance's domain and database, so after `pnpm install` and
`npx wrangler login`:

```sh
pnpm palm user create jason --admin          # prints the password once
pnpm palm invite create --count 3            # codes for family and friends
pnpm palm community create sandbox --title Sandbox
pnpm palm user keys jason                    # fresh signing keys
```

Sign in to Voyager and the Mastodon app with the server `1j.nz`. Lemmy apps
take an invite code as the sign-up answer; Mastodon apps as the reason.
