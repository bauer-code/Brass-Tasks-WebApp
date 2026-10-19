# Verification — updated 19 October 2026

## Automated checks

`npm test`: **15 passing tests** covering:

- Markdown extraction with YAML frontmatter, fenced code, nested tasks, numbered tasks, and sections.
- Checkbox toggles, edits, and removals preserving prose, prefixes, and CRLF line endings.
- Text limits, invalid backup schemas, duplicate IDs, invalid journal entries, and recovery of safe defaults.
- Failed storage writes without changing the last saved revision, plus rejection of stale-tab commits.
- Timer count-up, pause/resume, reset, configurable durations, four-session long-break suggestion, wall-clock restoration, and one-shot completion at the deadline.
- Bulk task parsing, 200-task limit, blank/oversized task rejection, initial unchecked state, and CRLF preservation.
- Completion transitions, including no completion for empty lists or repeated renders.
- Exactly 200 unique sourced quote records, full-cycle rotation, and compatibility with backups created before quotes were added.
- Note storage and backup roundtrips, title/body Markdown export, renamed and empty notes, unchanged legacy-plan exports, and rejection of invalid page types.
- Bulk exports separate notes from task lists, include archived pages and legacy plans, preserve page text, and retain validated note completion timestamps in backups.

`node --check public/app.js` passed. `npm run build` produced the static deployable files successfully.

## Live browser checks

The app was served on `http://127.0.0.1:4173` and checked in the in-app browser with synthetic plans only:

- Empty state and explicit sample-plan creation.
- Completion, focus view, adding a task, and restoring progress after page reload.
- Pasting Markdown containing frontmatter, headings, completed and incomplete tasks; toggling an imported checkbox and triggering a Markdown download.
- Changing the focus duration to one minute, starting it, observing completion, and checking that it generated one focus journal entry.
- Returning timer settings to 25/5/15 minutes.
- Saving an end-of-plan reflection, archiving, and restoring the archived plan.
- Desktop rendering and a 390 × 844 phone viewport. No horizontal page overflow at the phone size.
- No browser console errors or warnings during the core task/reload flow.
- Bulk entry reached from the single-task dialog; a mixed bullet/numbered-checkbox batch created two unchecked tasks. The quote stayed at 1/200 after the first completion, changed to 2/200 after the final task, and stayed at 2/200 after reload.
- The follow-up preview on port 4181 advanced to quote 3/200 after a focus session and retained it after reload. The dots showed 1 of 4 sessions. Settings were restored to 25/5/15 minutes.
- Confirmed the title “A quote to note” and the completion message “A little progress. A lovely feeling. ✓” on desktop and phone layouts.
- Plan controls checked on an isolated preview at port 4182: cancel preserves an unfinished plan; confirmation deletes it and shows the empty state; deleting a completed, unselected plan preserves the current selection and persists after reload; archived plans can be deleted directly while their journal entries remain. The dark brown New plan button and visible Delete controls were checked at desktop and 390-pixel phone widths. No console warnings or errors. Screenshot: [plan controls](plan-controls-preview.jpg).

Screenshots: [desktop](desktop-preview.jpg), [phone](mobile-preview.jpg). These screenshots contain synthetic demonstration content; fresh installations start with an empty workspace.

Note pages were checked on the isolated port 4182 preview: creation from both note buttons, text persistence after reload, rename preserving body headings, Markdown download, archive/restore, and deletion. The downloaded `Afternoon notes.md` was read from disk and contained its title, paragraphs, Markdown headings, list, and accented text. Desktop and 390-pixel mobile layouts had no horizontal overflow or console errors. Screenshot: [note page](notes-preview.jpg).

## Limits

Latest notebook update: checked subtle archive/delete controls, archiving and restoring a task list, finishing a note and retaining its read-only state after reload, reopening it for editing, and the top Notes library. Archived notes remained available for download and restoration. Both bulk Markdown downloads were opened from disk and verified against the synthetic pages. Desktop and 390-pixel mobile layouts had no horizontal overflow; no browser errors or warnings were recorded. Screenshots: [notebook and finished note](notebook-preview.jpg), [Notes library](notes-library-preview.jpg).

- Backup validation and storage failure handling were tested at the model layer; a complete file-picker backup restoration roundtrip was not browser-tested.
- Physical speaker output, Safari, Firefox, installed standalone mode, and Hostinger production behavior were not verified in this environment.
- No Hostinger deployment or domain change was performed. Deployment instructions and a static ZIP are provided for Hermes.
- The app does not provide accounts, cloud sync, automatic offline caching, or direct Obsidian filesystem synchronization.

## Original repository isolation

The source checkout `Typewriter` was inspected at `36099bd84390fc38d116d20cbc5a666f9c50666d`. Its worktree was clean before development. The web project was created in its own sibling directory and initialized independently, with no copied Git metadata. No writes or pushes target the original repository.
