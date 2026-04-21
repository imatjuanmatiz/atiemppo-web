# GEO Crawler Notes

Updated: 2026-04-21

This note records the crawler assumptions currently used in the ATIEMPPO site.

## Why this exists

ATIEMPPO wants strong GEO / AEO visibility while keeping the site simple,
public, and compatible with GitHub Pages.

The site therefore prioritizes:

- static HTML
- clean public URLs
- robots.txt at root
- llms.txt at root
- sitemap.xml
- structured data

## Officially reviewed crawler controls

### OpenAI

Official docs reviewed:

- https://developers.openai.com/api/docs/bots
- https://help.openai.com/es-419/articles/12627856-editores-y-desarrolladores-preguntas-frecuentes

Current interpretation:

- `OAI-SearchBot` matters for ChatGPT Search visibility
- `ChatGPT-User` matters for user-directed visits
- `GPTBot` relates to training / model-improvement crawling

### Anthropic

Official docs reviewed:

- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

Current interpretation:

- `Claude-SearchBot` matters for search visibility
- `Claude-User` matters for user-directed retrieval
- `ClaudeBot` relates to training-related crawling

### Google

Official docs reviewed:

- https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers

Current interpretation:

- `Google-Extended` is the robots token for Gemini training / grounding preferences
- it does not affect Google Search inclusion or ranking

## xAI / Grok status

As of 2026-04-21, no first-party xAI crawler-control page was found with the
same clarity as OpenAI, Anthropic, or Google for:

- a public open-web crawler token
- separate search vs training crawler controls
- explicit robots.txt guidance for third-party site owners

Because of that, ATIEMPPO does **not** currently add an explicit Grok / xAI
group to `robots.txt`.

This is intentional.

If xAI later publishes official crawler documentation, update:

- `robots.txt`
- this file
- any GEO checklist used by the project

## Current ATIEMPPO decision

For now, the site is configured to maximize discovery and AI-search visibility.

Assumption in force:

- discovery and citation are the current priority
- no explicit training opt-out is enabled yet for OpenAI or Anthropic

If ATIEMPPO later wants a stricter policy, update these groups in `robots.txt`:

- `GPTBot`
- `ClaudeBot`

## Related files

- [robots.txt](./robots.txt)
- [llms.txt](./llms.txt)
- [index.html](./index.html)
- [_config.yml](./_config.yml)

