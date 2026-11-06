# E Madan Kumar — The Series

A personal portfolio presented as a streaming series: a cinematic title card, a "Who's watching?" profile gate, a billboard hero with an interactive **robotic face-scan portrait**, and the rest of the story told as episodes. The projects come from the public repositories at [github.com/madankumar477](https://github.com/madankumar477).

Built with **React 19 + Vite + TypeScript**. Plain CSS, no UI or animation libraries. Fonts are bundled locally through `@fontsource`, so the site runs fully offline on `localhost`.

## Quick start

Requires **Node.js 18+** (developed on Node 22).

```bash
cd ~/madan-portfolio
npm install        # first time only
npm start          # dev server + opens http://localhost:5173
```

`npm run dev` starts the same server without opening a browser.

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm start`       | Dev server with hot reload, opens the browser  |
| `npm run dev`     | Dev server on http://localhost:5173            |
| `npm run build`   | Type-check and production build into `dist/`   |
| `npm run preview` | Serve the production build on http://localhost:4173 |
| `npm run lint`    | ESLint                                         |

## Editing content

All text lives in `src/data/` and nothing needs changing inside the components:

| File          | Contents |
| ------------- | -------- |
| `profile.ts`  | Name, intro, education, internship, certification, links, email |
| `projects.ts` | The 9 projects: summary, features, tech, repo / demo links, media |
| `skills.ts`   | Skill genres, plus which project each skill appears in |
| `journey.ts`  | "My Journey" seasons and "Top Picks" |
| `viewers.ts`  | The 4 profiles and the section order each one plays first |

To add details to the ATI Motors internship (responsibilities, dates), extend the `experience` entry in `profile.ts`. These were left out on purpose, so nothing is invented.

## Project structure

```
src/
  App.tsx                  stage machine: intro → profiles → browse
  components/
    Intro.tsx              cinematic title card + PLAY
    ProfileGate.tsx        "Who's watching?"
    Browse.tsx             page shell; orders sections per profile
    Navbar.tsx  Hero.tsx  ContinueRow.tsx  Footer.tsx
    RoboticPortrait.tsx    face-scan HUD (hover / tap / keyboard)
    Cursor.tsx             custom ring + red "play" cursor
    ProjectModal.tsx  ProjectVisual.tsx  ProjectArt.tsx
    SectionHeading.tsx
    sections/              FullStory, TopMoments, SkillUniverse, Originals,
                           About, Journey, TopPicks, Contact
  data/                    all content (see above)
  hooks/                   reveal-on-scroll, section progress, media queries
  styles/                  base, intro, browse, sections, portrait
public/assets/
  profile/                 cut-out portrait + original photo (WebP)
  projects/                images copied from the GitHub repositories
```

## Notes

- **Project media** are copied from each repository. Images marked *illustrative* or *synthetic* in a repository keep that label on the site. Projects without a suitable image (Sherpa RP AMR, Weld Detection, TwinArm-AI, Wi-Fi Beacon Lab) use a designed SVG illustration with an "Illustration" tag.
- **Sherpa RP Autonomous Mobile Robot** is a private repository, so it appears without a source link and without any internal files or media.
- **Contact form** opens your mail app with the message pre-filled (`mailto:`). Nothing is sent to a server.
- **Accessibility:** respects `prefers-reduced-motion`; keyboard-operable profile gate, tabs, modal (focus trap, Esc) and portrait scan (Enter / Space); skip link.
- **Download Résumé** prints only the résumé panel (`window.print()` with a print stylesheet). Choose "Save as PDF" in the print dialog.
