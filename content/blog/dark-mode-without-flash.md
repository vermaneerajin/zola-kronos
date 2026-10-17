+++
title = "Dark mode without the flash"
date = 2026-08-02
description = "A ten-line inline script beats any amount of CSS trickery."
[taxonomies]
tags = ["css", "javascript"]
+++

The flash of the wrong theme happens because the stylesheet is applied before
your JavaScript gets to read the stored preference. The fix is to read it in a
blocking inline script in `<head>`:

```js
var saved = localStorage.getItem("kronos-theme");
document.documentElement.setAttribute("data-theme", saved || "light");
```

Because it is inline and synchronous, it runs before the first paint. Everything
else — the toggle button, swapping the syntax-highlighting stylesheet — can wait
for a deferred script.
