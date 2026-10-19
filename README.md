# Brass-Tasks-WebApp

A quiet, vintage workspace for Markdown tasks and focused work. This is a **new, independent web repository**, adapted from [bauer-code/Brass-Tasks](https://github.com/bauer-code/Brass-Tasks). The desktop repository is not a dependency and has not been modified.

The app is plain HTML, CSS, and JavaScript. It has **no production dependencies, backend, database, API keys, or build service requirements**. Upload the static files to Hostinger and let your existing Hermes setup handle the domain.

## Run locally

Install Node.js 22 or later, then:

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. No dependency installation is needed to run, build, or test the app. Use a local HTTP server rather than opening `index.html` with a `file://` URL.

```sh
npm test
npm run build
npm start
```

`npm run build` copies the deployable application into `dist/`. `npm start` previews that build. The preview server is for local development only, binds to loopback, and uses port 4173 (override with the `PORT` environment variable).

## What works

- Responsive workspace with the original vintage typewriter, brass analog clock, bundled font, and recorded mechanical clock audio.
- Desktop-inspired stepped paper feeds, brief visible-row reveals, moving keycaps, carriage returns while writing notes, checkmark feedback, and a finished-sheet lift. The typewriter arrow stays stationary. Short tasks use the desktop's 77 ms typing rhythm, with punctuation and carriage pauses; longer text uses bounded batches and cached key lookups. Effects never delay editing or storage, cancel on navigation or hidden tabs, and respect reduced motion. Page feeds animate at most eight visible rows; the clock uses a native browser animation only while running and visible, with no perpetual JavaScript frame loop.
- Multiple plans, title search, rename, archive, restore from archive, and recoverable deletion into Bin.
- Finished notes and completed task lists reveal Bin, Archive, and Save file targets above the paper. Drag the paper heading to a target or click its button. Archive and Bin keep both page types available for restoration and individual downloads. Save file offers a Markdown download or, in supporting browsers, a save dialog starting at Desktop. Browser permissions determine the final file location.
- Add note on the typewriter creates a freeform note page. Notes save as you write; Finish note marks a page finished, with Edit note available to continue. The top Notes tab collects drafts, finished notes, and archived notes, with individual Markdown downloads and a combined download of all notes.
- Notes also appear chronologically in the Session journal alongside focus sessions and reflections. Journal downloads include their current text. Binned notes stay in Bin and workspace backups, outside the journal and bulk note downloads.
- The notebook holds task lists, with subtle archive and delete icons and a Download all task lists button. Bulk downloads combine all pages of the selected type, including archived pages, into one `.md` file. Notes and plans support rename, archive/restore, deletion, and workspace backups.
- Create, edit, complete, uncheck, and remove tasks; undo the most recent removal before the plan changes again.
- After submitting a new task, the full page opens and the typewriter prints it letter by letter with synchronized keys and sound. Text saves immediately; bulk entry animates only visible new tasks with bounded work. Switching views or enabling reduced motion reveals the complete text immediately.
- Printing reserves the complete text layout, so words stay on their final lines throughout the reveal. Carriage feedback moves only the roller; starting to write settles any page-entry animation. Loading a page and finishing a page retain their separate paper effects.
- Individual note downloads include the title and original creation timestamp, inspired by the desktop Notes folder. The Notes library shows creation dates; task-list downloads retain their title-based names.
- Bulk add up to 200 tasks at once: one per line, with optional bullets, numbering, or Markdown checkboxes. The entire batch is validated before saving; every added task starts unchecked.
- Full-page and one-task focus views.
- Import `.md`/`.markdown` by file picker, drag and drop, or pasted text; download the current plan as Markdown.
- Preserves Markdown prose, frontmatter, headings, and line endings during checkbox toggles and task edits; ignores tasks inside fenced examples and frontmatter.
- Count-up Pomodoro timer, pause/resume/reset, configurable 1–180 minute durations, short breaks, and a suggested long break after every four focus sessions.
- Timer recovery after reload, with one-shot completion, focus session journal, and optional end-of-plan reflections.
- Independent tick/bell controls, a master sound switch, and optional digital readout. Ticking starts disabled.
- Finishing a nonempty task list plays a synthesized paper-release, platen-ratchet, and paper-pull sound. It respects the master mute switch and does not replay on reload.
- Four labeled progress dots count focus sessions toward the next long break.
- A card with 200 curated highlights from your Readwise PDF. It advances after each completed focus Pomodoro or newly completed task list, saves its position, and visits every quote before repeating. Breaks, pauses, resets, and reloads do not advance it. Full provenance is in [the quote collection](docs/QUOTES.md).
- The quote card's note icon saves the displayed quote to a new editable note, including author, book, PDF page, and reading location.
- Browser persistence, cross-tab refresh, stale revision checks, and JSON workspace backups with validated restoration.
- Keyboard-operable controls, native modal focus handling, visible focus outlines, and reduced-motion support.

## Data and browser behavior

All workspace data is saved under `brass-tasks-webapp.v1` in browser local storage. **There is no cloud sync or user account.** Each browser, device, and origin has its own workspace. Clearing site data or private-browsing data can remove plans. Download regular backups, and use **Restore backup** when changing devices or moving from localhost to your final domain. Restoring replaces the current workspace after confirmation.

Imports never write into the original file or an Obsidian vault. Import an Obsidian Markdown note, work on its tasks, then export the updated Markdown. The desktop app's direct Obsidian sync, filesystem watchers, native window controls, and always-on-top behavior are not included in this browser edition.

Audio requires a user gesture. Background tabs may throttle sound; closed browsers cannot ring. The timer uses elapsed wall time and catches up on reopening. Sound errors do not prevent task editing. The web manifest supplies standalone launch metadata; offline caching is not implemented.

## Deploy and hand off

See [Hostinger / Hermes handoff](docs/HOSTINGER-HERMES.md). Deploy **only the contents of `dist/`**, including `.htaccess`, to the chosen document root. `public/` is also directly deployable. Do not upload the repository's `.git`, test scripts, or documentation to the public web root.

See [verification](docs/VERIFICATION.md) for the test coverage and browser checks, and [credits](docs/CREDITS.md) for the source and asset provenance.

## Project map

```text
public/             Complete static web application
  app.js            UI, persistence integration, audio, and journal
  model.js          Markdown and workspace data operations
  quotes.js         200 selected Readwise highlights and their source metadata
  pomodoro.js       Timer state machine
  sound.js          Typewriter synthesis and recorded clock playback
  assets/           Local icon, font, and audio
scripts/            Dependency-free build and preview commands
test/               Node.js unit tests
docs/               Hosting handoff, verification, and credits
dist/               Generated hosting files (ignored by Git)
release/            Generated upload ZIP (ignored by Git)
```

Source repository: [bauer-code/Brass-Tasks-WebApp](https://github.com/bauer-code/Brass-Tasks-WebApp), created as a separate private repository. Hosting and domain configuration are left to the existing Hermes setup. Do not reuse the original desktop repository's push remote.
