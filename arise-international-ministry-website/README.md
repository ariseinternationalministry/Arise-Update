# Arise International Ministry — website

Static site, ready for **GitHub Pages** (no build step).

```
arise-project/
├── index.html
├── .nojekyll
└── src/
    ├── css/styles.css
    ├── js/
    │   ├── script.js           core: photo paths, map, gallery, stories, quiz, EN/አማ switch
    │   ├── site-ui.js          hero slideshow, counters, copy buttons, router, contact form, city picker
    │   ├── scroll-progress.js  gold reading-progress bar
    │   └── events.js           events list (edit EVENTS) + live announcements feed
    └── assets/images/
        ├── icons/    favicons + bank logos
        ├── team/     profile photos
        ├── general/  hero / background photos
        └── events/   gallery photos, one sub-folder per ministry (max 54 files each;
                      lightbox-size versions live in a `large/` sub-folder)
```

## Deploy — read this first

**Do not use GitHub's "Upload files" web button for this project.** With 350+ images across
20+ subfolders, GitHub's web uploader frequently flattens nested folders or silently drops files,
which is what causes broken images after upload. Use one of these instead:

### Option A — GitHub Desktop (no command line, recommended)
1. Install GitHub Desktop (desktop.github.com) and sign in.
2. Clone your repository into a new empty folder on your computer.
3. Delete everything already in that cloned folder (old/previous site files).
4. Unzip this project and copy everything **inside** this folder — `index.html`, `.nojekyll`,
   `README.md`, and the whole `src/` folder — into the cloned repo folder. `index.html` must sit
   at the very root of the repo, not inside a subfolder.
5. In GitHub Desktop: write a commit message, click **Commit to main**, then **Push origin**.
6. GitHub repo → Settings → Pages → confirm it deploys from the `main` branch / root folder.
7. If you use a custom domain, make sure the `CNAME` file (just your domain name, one line) is
   still present at the repo root — recreate it if it's missing.
8. Wait 1–3 minutes, then hard-refresh your site (Ctrl+Shift+R / Cmd+Shift+R).

### Option B — git command line
```
git clone <your-repo-url> arise-site
cd arise-site
# delete old contents, then copy this project's files in (see step 4 above)
git add .
git commit -m "Deploy full site with correct folder structure"
git push
```

### Why this matters
Every image reference in this project (in `index.html`, `src/js/script.js`, and
`src/js/events.js`) is a **relative path** such as `./src/assets/images/team/eyosias-girma.webp`.
These paths are correct and tested — the only way they break is if the matching folders don't
make it into the repository intact. Preserve the folder structure exactly as it is in this zip,
and the images will work.

## Edit notes
* Add an event: copy the object inside `EVENTS` in `src/js/events.js`. Put its poster in
  `src/assets/images/events/event-posters/` and use a path like `./src/assets/images/events/event-posters/my-event.webp`.
* Events whose `end` date has passed move to "Past events" automatically.
* Replace every `https://YOUR-DOMAIN.com/` in `index.html` (canonical, og:url, og:image, JSON-LD) with your real URL,
  and add a 1200×630 `og-image.png` if you want link previews.
* All scripts are `defer`red and wrapped in `DOMContentLoaded`; each feature is guarded, so one missing element
  can never blank the page (a console warning is printed instead).
