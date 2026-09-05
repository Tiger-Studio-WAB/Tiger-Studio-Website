---
title: How to format docs
description: Folder and Markdown rules so anyone can add a section without touching the website code.
order: 90
sidebar_label: How to format docs
---

# How to format docs

Copy this file into the public [`docs`](https://github.com/Tiger-Studio-WAB/docs) repository if it is not there yet. The website reads that repo first, then fills any missing pages from the same tree shipped with the hub.

This is the only writing guide you need. You do not edit Next.js files to add a section.

## 1. Add a section (a folder)

```text
docs/
  getting-started/          ← section
    _category.json          ← optional
    index.md                ← landing page
    join.md                 ← another page
  products/
    index.md
    proj-help.md
```

Create the folder on GitHub, add `index.md`, and commit. After the next refresh (about two minutes) it shows in the sidebar.

## 2. Name files so URLs stay clean

| File | URL |
| --- | --- |
| `README.md` at the root | `/docs` |
| `how-to-format.md` | `/docs/how-to-format` |
| `getting-started/index.md` | `/docs/getting-started` |
| `getting-started/join.md` | `/docs/getting-started/join` |
| `01-overview.md` | `/docs/overview` (the `01-` only sorts it) |

Use lowercase, hyphens, and short names. Skip spaces.

## 3. Start every page with a title

```md
# Getting started
```

Optional front matter sits above that heading. Use it when the sidebar label should differ from the heading, or when you care about order.

```md
---
title: Getting started
description: What Tiger Studio is and how to join.
order: 1
sidebar_label: Start here
---

# Getting started
```

`order` is a number. Smaller numbers appear first. Folder order can also be set in `_category.json`.

## 4. Optional section file

Put this in the folder as `_category.json`:

```json
{
  "label": "Getting started",
  "order": 1
}
```

If you skip it, the folder name becomes the label (`getting-started` → “Getting started”).

## 5. Write like other developer docs

Keep pages short. One job per page.

- **Overview / index** — what the topic is, then links down
- **Get started** — steps someone can finish
- **How-to** — one task
- **Reference** — facts, not a story

Use:

- Headings (`##`, `###`) instead of bold paragraphs
- Numbered lists for steps
- Bullet lists for options
- Fenced code for commands, JSON, and Markdown examples
- Tables for mappings (file → URL, field → meaning)
- Links to other pages with site paths: `[Join](/docs/getting-started/join)`

Relative links also work: `[Join](./join.md)`.

## 6. What not to put here

| Goes in docs | Goes in Support |
| --- | --- |
| How a product works | “I cannot sign in” |
| How to add a page | “This page is wrong / down” |
| Club process for shipping | “I need a human” |

Support is a separate site area: [/support](/support). Do not add a `support` folder under docs.

## 7. Checklist for a new section

1. Create a folder in [`Tiger-Studio-WAB/docs`](https://github.com/Tiger-Studio-WAB/docs)
2. Add `index.md` with an `#` title
3. Add more `.md` pages as needed
4. Optional: `_category.json` for label and order
5. Open `/docs` after deploy and check the sidebar

That is the whole format.
