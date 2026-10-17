+++
title = "A weekly review that takes twenty minutes"
date = 2026-09-20
description = "The long version is why nobody does it. Here is the short one, plus a script to set it up."
[taxonomies]
tags = ["habits", "systems"]
+++

Every productivity system has a weekly review, and almost nobody runs one,
because the canonical version takes ninety minutes and asks you to process
eleven inboxes. A review you skip is worth nothing, so the only version that
matters is the one short enough that you actually sit down.

Twenty minutes. Four questions. Same time every week.

## The four questions

1. **What shipped?** Write it down, even the small things. This is the only
   honest record of your output, and it is almost always longer than it felt.
2. **What slipped, and why?** Not for guilt — for pattern-spotting. The same
   reason showing up three weeks running is a system problem, not a willpower
   problem.
3. **What is next week's one thing?** Singular. If the week delivered only
   this, would it have been a good week?
4. **What can I delete?** Both from the list and from the calendar.

That is it. No inbox processing, no project audit. Those are separate jobs that
pretend to be part of the review and are the reason it never happens.

## Make the file appear by itself

The friction is almost always "open a new note and set it up". Automate that
part and the habit survives on days you cannot be bothered:

```bash
#!/usr/bin/env bash
# weekly-review.sh — create this week's review file and open it.
set -euo pipefail

dir="$HOME/notes/reviews"
file="$dir/$(date +%Y)-W$(date +%V).md"

mkdir -p "$dir"

if [[ ! -f "$file" ]]; then
  cat > "$file" <<'TEMPLATE'
# Weekly review

## What shipped

## What slipped, and why

## Next week's one thing

## Deleting
TEMPLATE
fi

"${EDITOR:-vi}" "$file"
```

Put it on a Friday afternoon timer and the decision disappears:

```cron
0 16 * * 5 /home/you/bin/weekly-review.sh
```

## Why Friday beats Monday

A Friday review is a closing ritual: the week is fresh, and you start the
weekend with it out of your head. A Monday review is a planning meeting with
yourself before you have any momentum, and it tends to get bumped by whatever
arrived over the weekend.

The specific day matters less than it being *the same day*, though. The habit is
the asset; the questions are just the format.
