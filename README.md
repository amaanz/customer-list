# 🧾 Customers List — React + Vite

A high-performance **Customers List** UI built with **React**, **Vite**, and **TypeScript** that can efficiently render and interact with **1,000,000 customer records** in the browser.

The application focuses on **smooth UX** while browsing massive datasets, supporting **infinite scrolling, search, and sorting**, with **zero lag** on modern browsers.

---

## 🚀 Features

| Feature           | Description                                                                |
|------------------|----------------------------------------------------------------------------|
| 🔥 1M Records    | Dataset generated locally on load (no backend required).                  |
| 📜 Infinite Scroll | Loads 30 rows at a time while keeping scroll silky smooth.               |
| 🔍 Search        | Debounced (250ms) search across name, email, or phone with partial matches. |
| ↕ Sorting        | Click column headers to toggle Asc / Desc / Reset.                        |
| 🎛 Filters UI    | Filters dropdown available (UI only — no logic required).                 |
| 📌 Sticky Header | Column header remains visible during scrolling.                           |
| 🖱 Row Hover     | Row hover states improve readability and focus.                           |
| 🎨 Clean UI      | Minimal, modern design with local image assets for branding and icons.   |

---

## 🧱 Tech Stack

| Technology      | Usage                                   |
|-----------------|-----------------------------------------|
| React + TypeScript | Core application & UI components    |
| Vite            | Fast dev server & bundler              |
| shadcn-ui       | Common UI primitives                    |
| Tailwind CSS    | Utility-first styling system           |
| ES Modules      | Import/export everywhere, Node 22+     |

---

## 📂 Folder Structure

```bash
src/
 ├─ assets/         # Logos & icons
 ├─ components/     # UI components (table, header, search, filters, etc.)
 ├─ hooks/          # Custom hooks (debounce, infinite scroll)
 ├─ data/           # Data generator
 ├─ types/          # TypeScript types
 ├─ App.tsx
 └─ main.tsx
```

## 🛠 Running Locally
Prerequisites Node.js >= 18 (Node 22+ recommended)

### **Prerequisites**
- **Node.js ≥ 18** (Node **22+ recommended**)
- **npm**

### **Installation & Setup**
```bash
git clone <REPOSITORY_URL>
cd <PROJECT_NAME>
npm install
npm run dev
