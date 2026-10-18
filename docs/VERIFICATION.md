# Verification — 18 October 2026

## Automated checks

`npm test`: **8 passing tests** covering:

- Markdown extraction with YAML frontmatter, fenced code, nested tasks, numbered tasks, and sections.
- Checkbox toggles, edits, and removals preserving prose, prefixes, and CRLF line endings.
- Text limits, invalid backup schemas, duplicate IDs, invalid journal entries, and recovery of safe defaults.
- Failed storage writes without changing the last saved revision, plus rejection of stale-tab commits.
- Timer count-up, pause/resume, reset, configurable durations, four-session long-break suggestion, wall-clock restoration, and one-shot completion at the deadline.

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

Screenshots: [desktop](desktop-preview.jpg), [phone](mobile-preview.jpg). These screenshots contain synthetic demonstration content; fresh installations start with an empty workspace.

## Limits

- Backup validation and storage failure handling were tested at the model layer; a complete file-picker backup restoration roundtrip was not browser-tested.
- Physical speaker output, Safari, Firefox, installed standalone mode, and Hostinger production behavior were not verified in this environment.
- No Hostinger deployment or domain change was performed. Deployment instructions and a static ZIP are provided for Hermes.
- The app does not provide accounts, cloud sync, automatic offline caching, or direct Obsidian filesystem synchronization.

## Original repository isolation

The source checkout `Typewriter` was inspected at `36099bd84390fc38d116d20cbc5a666f9c50666d`. Its worktree was clean before development. The web project was created in its own sibling directory and initialized independently, with no copied Git metadata. No writes or pushes target the original repository.
