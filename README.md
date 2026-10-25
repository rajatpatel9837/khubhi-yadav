# MILES APART, HEART TO HEART — KHUBI × RAJAT

An extraordinary, ultra-premium cinematic romantic storytelling website created for **Khubi Yadav** by **Rajat Patel** (IIIT Bhagalpur to Gurgaon).

---

## 🌟 Visual Identity & Art Direction

* **Midnight Ink**: `#101117`
* **Deep Aubergine**: `#241923`
* **Warm Ivory**: `#F7F1E8`
* **Dusty Rose**: `#C58E98`
* **Muted Blush**: `#E4C8C7`
* **Champagne**: `#D0B58A`
* **Soft Charcoal**: `#29262B`

**Typography**:
* **Cormorant Garamond** for cinematic editorial headlines.
* **DM Sans** for clean, readable body and UI copy.
* **Caveat** for intimate handwritten annotations and signatures.

---

## ✨ Features & Chapters

1. **Cinematic Opening Experience**:
   * Elegant reveals of *Khubi Yadav* and *Rajat Patel*.
   * Animated clip-path reveals, drifting luminous particles, and "Open My Letter" or "Skip Intro" CTAs.
   * Completely mute by default with zero autoplay.

2. **Two Cities Story**:
   * Bhagalpur, Bihar (IIIT Bhagalpur) to Gurgaon, Haryana.
   * Stylized geographic corridor route with an animated traveling dash line and glowing coordinates.
   * Verified approximate route distance (~1,240 km).
   * Mobile-optimized vertical journey timeline.

3. **Original Shayari Collection**:
   * *“Thode Alfaaz, Dil Se”* — 5 original literary journal pages in Roman Hindi/Hinglish.
   * Oversized serif typography, chapter numbers, delicate handwritten annotations, and navigation controls.

4. **The Personal Letter**:
   * *“Khubi, Ek Baat Kehni Thi…”*
   * Warm ivory parchment card texture, gentle reading pacing, and handwritten signature by Rajat.

5. **Memory Exhibition & Lightbox**:
   * *“A Few Frames, A Few Feelings”*
   * Curated atmospheric photography with film grain, editorial captions, aspect ratios, and full keyboard/touch-accessible lightbox (ESC, Arrow keys).

6. **The Little Things**:
   * 5 sincere, non-generic observational cards reflecting admiration without assumptions.

7. **The Proposal (The Heart of the Website)**:
   * *“Khubi, will you be my girlfriend?”*
   * Two clearly visible, equally accessible choices:
     * **"Yes, I’d Like That"**: Triggers soft celebration and unlocks the Stage Two chapters.
     * **"I’m Not Ready / I Don’t Feel the Same"**: Handled with dignity, warmth, and full respect. Does not unlock future chapters.

8. **Long-Distance Chapter (Unlocked upon "Yes")**:
   * Practical, caring perspective on communication, trust, and individual ambitions.
   * *“Read a Little Note”* interactive parchment modal.

9. **The Shared Sky Experience**:
   * Blended night sky canvas connecting Bhagalpur's eastern twilight to Gurgaon's starry horizon.

10. **The Future Chapter & Distant Marriage Chapter**:
    * Grounded reflections on growing as individuals and building a tomorrow freely.
    * An independent, optional *Someday Marriage Chapter* (strictly separated, accessible via `#future` or deliberate button).

11. **The Final Letter & Replay**:
    * *“Until the Next Page”*
    * Replay button resets local interactive state safely and smoothly scrolls to top.

12. **Personalization Dashboard**:
    * Live interactive editor accessible via the top-bar button (`Personalize`).
    * Edit names, poems, letters, proposal wording, and photo links in real time.
    * Export full updated JSON to clipboard.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 How to Customize Content

All text is organized in `src/data/`:
* `src/data/siteConfig.ts`: Names, cities, coordinates, letters, and proposal copy.
* `src/data/poetry.ts`: The 5 shayari cards, titles, and annotations.
* `src/data/memories.ts`: Photos, captions, aspect ratios, and dates.
* `src/data/littleThings.ts`: Observational notes.

You can also click **"Personalize"** in the top navigation bar at any time to edit content directly in the browser and export the JSON!

---

## 🌐 Deployment to Vercel / Netlify

1. Push this folder to a GitHub repository.
2. Link the repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy! Share the private link with Khubi.
# khubhi-yadav
