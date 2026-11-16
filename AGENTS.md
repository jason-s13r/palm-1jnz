# Working on palm-1jnz

This is a deployment repo, not code. palm itself lives in
`jason-s13r/palm`; changes to behaviour go there.

- `palm.config.ts`: this instance's config. The domain is permanent once
  anything has federated.
- `wrangler.jsonc`: the Worker, its routes and (later) its D1, R2 and Queue
  bindings. Secrets go in with `wrangler secret put`, never in the repo.
- `vendor/palm-worker.tgz` and `vendor/PALM_VERSION`: written only by the
  Release workflow. Don't edit or replace them by hand.
- Commit messages are conventional (`chore(release): palm X.Y.Z` comes from
  the workflow; config changes are `feat(config):` or `fix(config):`).
- Commit messages carry no tool or session trailers.
