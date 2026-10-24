# Issa Kareem Oyaifo Portfolio

Static portfolio built with Astro and TypeScript.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run check
npm run build
```

Set `SITE_URL` to the real public origin before deployment (for example, through the hosting provider's environment settings). When it is set, Astro emits absolute canonical and Open Graph URLs and generates `sitemap-index.xml`. It is intentionally unset until the portfolio's actual domain is known.

## GitHub Pages deployment

The `papyanalytics/IssaKareem` repository deploys to GitHub Pages at `https://papyanalytics.github.io/IssaKareem/`. Pushes to `main` run the workflow in `.github/workflows/deploy.yml`. The Astro base path is applied only in GitHub Actions builds so local development continues to use root-relative routes.