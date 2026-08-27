# StackFolio - Neo-Brutalist Design System & UI Specifications

## 1. Design Philosophy: Professional Dev-Brutalism
StackFolio uses a bold Neo-Brutalist design language tailored for modern developers, freshers, and tech creators:
- High contrast 2px to 3px solid black borders (`border-black`).
- Hard offset drop shadows with zero blur (`shadow-[4px_4px_0px_0px_#000]`).
- Vibrant retro accents (Electric Yellow, Neon Cyan, Bubblegum Pink, Terminal Green).
- Geometric display typography paired with clean monospaced tags and readable body text.
- Interactive physical click animations (`hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]`).

---

## 2. Color Tokens & Theme Palettes

### 2.1 Neo-Light Theme (Default / Creative-Corporate)
- **Canvas Background:** `#FFFDF8` (Warm retro cream) / `#F4F0EA`
- **Card Surface:** `#FFFFFF` (Pure white with solid black border)
- **Border Outline:** `#000000` (Solid 2px / 3px black)
- **Hard Shadow:** `#000000` (`4px 4px 0px 0px` on cards, `3px 3px 0px 0px` on badges)
- **Primary Accent (CTA / Action):** `#FFE600` (Electric Yellow)
- **Secondary Accents (Badges / Cards):**
  - `#4DEEEA` (Neon Cyan)
  - `#FF70A6` (Bubblegum Punch)
  - `#A8FF78` (Neon Mint)
  - `#FFAA00` (Amber Gold)
- **Text Primary:** `#0F172A` (Rich Slate Black)
- **Text Muted:** `#475569` (Charcoal Slate)

### 2.2 Neo-Dark Theme (Dev-Terminal Persona)
- **Canvas Background:** `#0F1117` (Deep Obsidian)
- **Card Surface:** `#1A1D27` (Muted Dark Slate)
- **Border Outline:** `#38BDF8` (Electric Cyan 2px) or `#FFFFFF`
- **Hard Shadow:** `#38BDF8` (`4px 4px 0px 0px` cyan hard offset)
- **Primary Accent:** `#38BDF8` (Neon Cyan)
- **Secondary Accents:**
  - `#00FFA3` (Terminal Green)
  - `#F43F5E` (Hot Crimson)
  - `#FBBF24` (Cyber Yellow)
- **Text Primary:** `#F8FAFC` (Pure White)
- **Text Muted:** `#94A3B8` (Cool Grey)

---

## 3. Typography Stack
- **Hero & Display Headings:** `Space Grotesk`, sans-serif (Font Weight: 800 / 900, tight tracking).
- **Body Copy, Bio & Descriptions:** `Inter` / `Public Sans`, sans-serif (Font Weight: 500 / 600).
- **Code, Metrics & Tech Badges:** `JetBrains Mono` / `Space Mono`, monospace (Font Weight: 700 Bold).

---

## 4. UI Component Architecture

### 4.1 Neo-Brutalist Buttons
```html
<!-- Primary CTA Button -->
<button class="bg-[#FFE600] text-black font-extrabold px-6 py-3 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
  Publish Live 🚀
</button>
```

### 4.2 Interactive Cards & Containers
```html
<!-- Project / Section Card -->
<div class="bg-white border-3 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
  <!-- Card Content -->
</div>
```

### 4.3 Sticker Tags & Tech Badges
```html
<!-- Tech Badge -->
<span class="inline-flex items-center px-2.5 py-1 text-xs font-mono font-bold bg-[#4DEEEA] text-black border-2 border-black rounded-md shadow-[2px_2px_0px_0px_#000]">
  React.js
</span>

<!-- Angled Sticker Pill -->
<div class="inline-block bg-[#FF70A6] text-black font-extrabold px-3 py-1 border-2 border-black rounded-full text-xs uppercase rotate-[-3deg] shadow-[2px_2px_0px_0px_#000]">
  ★ No-Code Portfolio
</div>
```

---

## 5. Dashboard Workspace Layout (Split-Pane Pattern)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: [⚡ StackFolio]       [Score: 85/100 🟢]          [User Profile ▾] │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ LEFT PANEL: MULTI-TAB EDITOR (50%)   │ RIGHT PANEL: LIVE PREVIEW (50%)      │
│                                      │                                      │
│ Tabs (Folder Style):                 │ Top Controls Bar:                    │
│ [Basic] [Projects] [Skills] [Edu]    │ [Theme: Neo-Light ▾] [💻 PC | 📱 Phone]│
│                                      │                                      │
│ ┌──────────────────────────────────┐ │ ┌──────────────────────────────────┐ │
│ │ Project 1: CloudIDE              │ │ │ LIVE PREVIEW CANVAS              │ │
│ │ Desc: [Browser-based code editor]│ │ │ (Renders Neo-Light or Neo-Dark)  │ │
│ │ GitHub: [https://github...     ] │ │ │ (Scales to 1280px or 390px frame)│ │
│ │ Live Demo: [https://cloudide... ]│ │ │                                  │ │
│ └──────────────────────────────────┘ │ │ • Card with 3px black border     │ │
│                                      │ │ • Hard 4px black drop shadow     │ │
│ [+ Add New Project]                  │ └──────────────────────────────────┘ │
│                                      │                                      │
│ [💾 Save Changes]   [🚀 Publish]     │ Stable Link: /p/aarya-shah-r4x9 [📋] │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 6. SVG Device Preview Frame Specifications

### 6.1 Desktop Preview Mode
- **Container Constraint:** `w-full max-w-[1280px]`
- **Styling:** Fluid aspect ratio with clean brutalist outer frame border.
- **Header Toggle:** Laptop SVG icon with active yellow `#FFE600` background fill.

### 6.2 Mobile Preview Mode
- **Container Constraint:** `w-[390px] h-[720px]`
- **Frame Styling:** `rounded-[36px] border-[6px] border-black bg-white shadow-[8px_8px_0px_0px_#000] overflow-y-auto`
- **Simulated Notch:** Top-centered pill cutout (`w-28 h-4 bg-black rounded-b-xl`).
- **Header Toggle:** Phone SVG icon with active yellow `#FFE600` background fill.
