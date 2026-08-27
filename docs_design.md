# StackFolio - Design System & UI Specifications

## 1. Visual Identity & Dual Template Themes

### 1.1 Template 1: Dark Developer Layout
Designed for engineers, open-source contributors, and software developers.
- **Background:** `#0B0F17` (Deep Slate / Obsidian)
- **Surface Cards:** `#161F30` (Muted Indigo-Slate)
- **Border Accents:** `#1E293B` (Subtle 1px border)
- **Primary Accent:** `#38BDF8` (Electric Cyan)
- **Secondary Accent:** `#10B981` (Emerald Green)
- **Primary Text:** `#F8FAFC` (Clean White)
- **Muted Text:** `#94A3B8` (Cool Grey)
- **Typography:** JetBrains Mono for tags/code, Inter for body copy.
- **Key Styling:** Glow badges, monospaced tech tags, terminal-inspired card headers.

### 1.2 Template 2: Light Corporate Layout
Designed for analysts, project leads, product managers, and corporate roles.
- **Background:** `#F8FAFC` (Soft Off-White)
- **Surface Cards:** `#FFFFFF` (Pure White with subtle box-shadow)
- **Border Accents:** `#E2E8F0` (Light Slate Border)
- **Primary Accent:** `#1E3A8A` (Deep Navy Blue)
- **Secondary Accent:** `#2563EB` (Royal Blue)
- **Primary Text:** `#0F172A` (Slate Black)
- **Muted Text:** `#64748B` (Medium Slate)
- **Typography:** Plus Jakarta Sans for headings, Inter for body copy.
- **Key Styling:** Clean rounded pill badges, subtle box shadows (`shadow-sm`), refined serif/sans hierarchy.

---

## 2. Dashboard Workspace Layout (Split-Pane Pattern)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR: [StackFolio Logo]       [Score: 85/100 🟢]      [User Avatar ▾]    │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ LEFT PANEL: FORM EDITOR (50% w)      │ RIGHT PANEL: LIVE PREVIEW (50% w)    │
│                                      │                                      │
│ Tabs: [Basic] [Projects] [Skills]    │ Controls:                            │
│       [Education] [Achievements]     │ [Template: Dark Dev ▾]               │
│                                      │ [💻 Desktop View | 📱 Mobile View]  │
│ ┌──────────────────────────────────┐ │                                      │
│ │ Project 1: CloudIDE              │ │ ┌──────────────────────────────────┐ │
│ │ Description: [Browser code ed..] │ │ │ PREVIEW CANVAS                   │ │
│ │ GitHub: [https://github...     ] │ │ │                                  │ │
│ │ Live URL: [https://cloudide... ] │ │ │ (Renders Dark Dev or Light Corp) │ │
│ └──────────────────────────────────┘ │ │ (Scales to 1280px or 390px frame)│ │
│                                      │ │                                  │ │
│ [+ Add New Project]                  │ └──────────────────────────────────┘ │
│                                      │                                      │
│ [💾 Save Changes]   [🚀 Publish]     │ Stable Link: /p/aarya-shah-r4x9 [📋] │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 3. SVG Device Frame Specifications

### 3.1 Desktop Preview Mode
- **Container Constraint:** `w-full max-w-[1280px]`
- **Scaling:** Fluid aspect ratio, responsive columns.
- **Header Icon:** Laptop SVG icon with active state color highlight.

### 3.2 Mobile Preview Mode
- **Container Constraint:** `w-[390px] h-[700px]`
- **Frame Styling:** `rounded-[40px] border-[10px] border-slate-900 shadow-2xl overflow-y-auto`
- **Simulated Notch:** Top-centered pill notch (`w-28 h-4 bg-slate-900 rounded-b-xl`).
- **Header Icon:** Smartphone SVG icon with active state color highlight.
