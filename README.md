# Lewis-26th-HBD
# 🖤 Happy 26th Birthday Lewis

A cinematic, interactive birthday website built as a personal love letter — featuring a live music player, animated photo gallery, encrypted letter archives, and a birthday wish experience.

---

## ✦ Live Demo

> Deploy via GitHub Pages and paste your link here.

---

## 📁 Project Structure

```
├── index.html          # Main HTML — all sections and markup
├── style.css           # All styles, animations, layout, and theming
├── script.js           # All interactivity — player, gallery, typing, countdown
│
├── LEWIS_PIC_2.jpeg
├── LEWIS_PIC_3.jpeg
├── LEWIS_PIC_4.jpeg
├── LEWIS_PIC_5.jpeg
├── LEWIS_PIC_6.jpeg
├── lewis_photo_1.jpeg
├── lewis_photo_2.jpeg
├── lewis_photo_3.jpeg
├── lewis_photo_4.jpeg
├── lewis_photo_5.jpeg
│
├── The_Weeknd_-_After_Hours__Audio___ygTZZpVkmKg_.mp3
├── Disclosure_-_You___Me__Flume_Remix___Official_Video___8x-M7AkTvrQ_.mp3
└── Porter_Robinson_-_Language__Vsy1URDYK88_.mp3
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **Hero Section** | Cinematic full-screen opener with animated title and celebration button |
| **Live Countdown** | Real-time countdown timer to May 29, 2026 |
| **Music Player** | Custom audio player with progress bar, waveform visualizer, and auto-advance |
| **Secret Letters** | Four accordion-style cards that reveal personal messages on tap |
| **Typing Terminal** | Auto-typing love letter rendered character by character |
| **Encrypted Archives** | Four expandable story chapters styled as decrypted files |
| **Photo Gallery** | 10-photo polaroid grid with hover effects and a fullscreen lightbox |
| **Birthday Candles** | Interactive candle-blowing experience with a confetti finale |
| **Custom Cursor** | Gold dot + trailing ring cursor for desktop |
| **Floating Hearts** | Ambient floating particles throughout the page |

---

## 🚀 Deploying to GitHub Pages

1. **Create a new repository** on GitHub (can be private or public)

2. **Upload all files** — make sure every image and `.mp3` is included at the root level alongside `index.html`

3. **Enable GitHub Pages:**
   - Go to your repo → `Settings` → `Pages`
   - Under *Source*, select `Deploy from a branch`
   - Choose `main` branch and `/ (root)` folder
   - Click **Save**

4. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

> ⚠️ GitHub has a **100 MB per file** limit and a **1 GB total repo** soft limit. If your `.mp3` files are large, consider compressing them or hosting audio on a CDN and updating the `src` paths in `script.js`.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#c9a84c` | Primary accent, highlights |
| `--rose` | `#e07a8f` | Secondary accent, waveform |
| `--dark` | `#070709` | Page background |
| `--panel` | `rgba(13,12,16,0.75)` | Card / glass backgrounds |
| `--text` | `#e8e2d4` | Body text |
| `--border` | `rgba(201,168,76,0.18)` | Subtle gold borders |

**Fonts** (loaded from Google Fonts):
- `Cormorant Garamond` — display headings
- `DM Mono` — labels, timestamps, monospace UI
- `Outfit` — body text and UI elements

---

## 🛠️ Customisation

**Change the birthday date** — edit line in `script.js`:
```js
const target = new Date('May 29, 2026 00:00:00').getTime();
```

**Swap photos** — replace the image files and update the `GALLERY_PHOTOS` array in `script.js`:
```js
const GALLERY_PHOTOS = [
  { src: 'your-photo.jpeg', caption: 'Your Caption' },
  ...
];
```

**Update songs** — replace `.mp3` files and edit the `SONGS` array in `script.js`:
```js
const SONGS = [
  { id: 'song1', title: 'Song Title', artist: 'Artist Name', src: 'filename.mp3' },
  ...
];
```

**Edit the typed letter** — update the `letter` template literal in `script.js` starting at:
```js
const letter = `System Input Log: 26 Years of Lewis. ...`;
```

**Edit the archive chapters** — update the text directly inside the `.story-card` divs in `index.html`.

---

## 📦 Dependencies

All loaded via CDN — no build step or package manager needed.

| Library | Version | Purpose |
|---|---|---|
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | `1.6.0` | Confetti burst effects |
| [Google Fonts](https://fonts.google.com) | — | Typography |

---

## 📄 License

Personal project — made with love. Not for redistribution.
