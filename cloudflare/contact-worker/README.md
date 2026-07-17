# WITER contact Worker

Cloudflare Worker that validates the portfolio contact form and delivers it through Cloudflare Email Service. No mail API key is exposed to the browser or stored in the repository.

## First deployment

1. Run `npx wrangler login`.
2. Add and verify `studiowiter@outlook.com` as an Email Routing destination address.
3. Onboard `witerstudio.online` in Cloudflare Email Service.
4. Run `npx wrangler deploy`.

The Worker is attached to the custom domain `contact.witerstudio.online`. Production origins are restricted in `wrangler.toml`; add a localhost origin temporarily when testing locally.
