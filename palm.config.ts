import { defineConfig } from "@jason-s13r/palm-worker";

// The 1j.nz instance. The domain is permanent: every handle (@jason@1j.nz)
// and every ActivityPub ID (https://1j.nz/users/jason) is minted under it.
export default defineConfig({
  domains: [
    {
      domain: "1j.nz",
      hosts: {
        lemmy: "lemmy.1j.nz",
        mastodon: "mastodon.1j.nz",
      },
    },
  ],
  instance: {
    name: "1j.nz",
    description: "A small fediverse home for family and friends.",
  },
  // Where browsers go on pages palm doesn't serve, as the old redirect rule did.
  browserRedirect: "https://jason.schwarzenberger.co.nz",
  registration: "invite",
});
