+++
title = "Hello, Kronos"
date = 2026-10-15
description = "Why this theme exists, and the three rules it follows."
[taxonomies]
tags = ["meta", "design"]
+++

Most blog themes are designed on a laptop and then squeezed onto a phone. Kronos
goes the other way round. Three rules shaped it.

## One: thumbs are not cursors

A fingertip covers roughly 9mm of screen. Every interactive element here clears
44px, and the important ones clear 52px. Post listings are one big tap target per
row rather than a title link floating next to a date.

## Two: light first, dark on request

Light mode is the default. The switch in the header stores a choice in
`localStorage` and applies it before first paint, so there is no flash of the
wrong colours on the next page load.

## Three: nothing you have to configure

The theme works with an empty `[extra]` table. Every option has a default.

```rust
fn main() {
    let theme = "kronos";
    println!("hello, {theme}");
}
```
