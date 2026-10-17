# Kronos

A minimal, mobile-first blog theme for [Zola](https://www.getzola.org).

![Kronos](screenshot.png)

- **Eye-catching home page** — a hero with a soft brand-coloured wash and faint
  grid, followed by the latest posts and a tag cloud.
- **Mobile-first and thumb-friendly** — 17px body text on phones, and every
  link, button and menu item is at least 44px tall (52px for the primary ones).
  Post rows are a single large tap target rather than a small title link.
- **Light and dark** — light is the default. The switch is remembered in
  `localStorage` and applied before first paint, so there is no flash of the
  wrong colours. Code highlighting follows the active mode.
- **Primary colour `#369369`**, exposed as CSS custom properties so you can
  restyle without touching Sass.
- No build step, no dependencies, ~1KB of JavaScript.

Requires Zola **0.22.0** or newer.

## Installation

```bash
cd my-site
git submodule add https://github.com/vermaneerajin/zola-kronos.git themes/kronos
git submodule update --init --recursive
```

The submodule directory must be named `kronos`, matching the `theme` value
below — the repository itself is called `zola-kronos`, so pass the path
explicitly as shown. If you would rather not use submodules, clone it instead:

```bash
git clone https://github.com/vermaneerajin/zola-kronos.git themes/kronos
```

Then in `config.toml`:

```toml
theme = "kronos"
compile_sass = true

taxonomies = [
  { name = "tags", feed = true, paginate_by = 10 },
]

[markdown.highlighting]
style = "class"
light_theme = "github-light"
dark_theme = "github-dark"
add_color_scheme = false
```

The `[markdown.highlighting]` block is what makes code blocks follow the
light/dark switch. Zola writes `giallo-light.css` and `giallo-dark.css`, which
the theme links and swaps on toggle. Skip the block if you do not want
highlighted code.

## Content structure

Kronos expects posts in a section, `content/blog/` by default:

```
content/
├── _index.md          # home page (the hero is rendered from config)
├── about.md
└── blog/
    ├── _index.md      # sort_by = "date", paginate_by = 10
    └── my-post.md
```

`content/blog/_index.md`:

```toml
+++
title = "Blog"
description = "Everything published so far, newest first."
sort_by = "date"
paginate_by = 10
template = "section.html"
page_template = "page.html"
+++
```

Point `kronos_home_section` elsewhere if your posts live somewhere else. If the
section does not exist, the home page falls back to the pages in `content/`.

## Options

All options live under `[extra]` and all of them have defaults — the theme
works with an empty `[extra]` table.

| Key | Default | What it does |
| --- | --- | --- |
| `kronos_hero_title` | `config.title` | Big headline on the home page. Inline HTML is allowed; wrap words in `<em>` to paint them in the brand colour. |
| `kronos_eyebrow` | `"Now writing"` | Small pill above the headline. |
| `kronos_tagline` | — | One-line statement under the headline. |
| `kronos_intro` | — | Short paragraph under the tagline. |
| `kronos_cta_text` / `kronos_cta_url` | — | Primary hero button. Omitted if the text is empty. |
| `kronos_cta2_text` / `kronos_cta2_url` | — | Secondary hero button. |
| `kronos_avatar` | — | Path under `static/` to a round avatar in the hero. |
| `kronos_home_section` | `"blog/_index.md"` | Section the home page lists from. |
| `kronos_home_posts` | `5` | How many posts the home page lists. |
| `kronos_home_tags` | `true` | Show the tag cloud on the home page. |
| `kronos_show_reading_time` | `true` | Show "N min read" on posts. |
| `kronos_show_toc` | `false` | Show a collapsible table of contents on posts with headings. |
| `kronos_respect_os_theme` | `false` | When `true`, first-time visitors get dark mode if their OS asks for it. Light stays the default otherwise. |
| `kronos_author` | `config.title` | Name in the footer and in the post metadata. |

### Menu

```toml
[[extra.kronos_menu]]
name = "Blog"
url = "/blog/"
```

### Social links

`icon` is one of `github`, `mastodon`, `bluesky`, `x`, `linkedin`, `email`, `rss`.

```toml
[[extra.kronos_social]]
icon = "github"
url = "https://github.com/vermaneerajin"
```

### Per-post front matter

```toml
+++
title = "Hello, Kronos"
date = 2026-10-15
description = "Shown in the post list and in link previews."
[taxonomies]
tags = ["meta"]

[extra]
author = "Someone Else"   # optional, overrides the byline
+++
```

## Shortcodes

- `{{/* note(title="Heads up") */}} … {{/* end */}}` — a callout box.
- `{{/* figure(src="/images/x.png", alt="…", caption="…") */}}` — image with a caption.

## Customising

Override any template by copying it into your site's own `templates/`
directory — Zola prefers yours over the theme's. For colours, redefine the
custom properties after the theme stylesheet:

```css
:root { --primary: #7c3aed; --primary-hover: #6d28d9; }
:root[data-theme="dark"] { --primary: #a78bfa; }
```

Blocks available in `base.html`: `title`, `head_extra`, `main`, `content`,
`body_extra`.

## Development

```bash
zola serve
```

The repository doubles as a demo site: `config.toml` and `content/` at the root
are the example, and the theme itself is `templates/`, `sass/`, `static/` and
`theme.toml`.

## License

MIT — see [LICENSE](LICENSE).
